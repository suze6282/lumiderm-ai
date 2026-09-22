import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  ClampToEdgeWrapping,
  Color,
  DataTexture,
  FloatType,
  HalfFloatType,
  LinearFilter,
  Mesh,
  NearestFilter,
  OrthographicCamera,
  PlaneGeometry,
  Points,
  RGBAFormat,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderTarget,
} from 'three';

const FULLSCREEN_VERTEX = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const ADVECTION_FRAGMENT = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uVelocity;
  uniform sampler2D uSource;
  uniform float uDt;
  uniform float uDissipation;
  void main() {
    vec2 velocity = texture2D(uVelocity, vUv).xy;
    vec2 coord = clamp(vUv - velocity * uDt, 0.002, 0.998);
    gl_FragColor = texture2D(uSource, coord) * uDissipation;
  }
`;

const CURL_FRAGMENT = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uVelocity;
  uniform vec2 uTexel;
  void main() {
    float left = texture2D(uVelocity, vUv - vec2(uTexel.x, 0.0)).y;
    float right = texture2D(uVelocity, vUv + vec2(uTexel.x, 0.0)).y;
    float bottom = texture2D(uVelocity, vUv - vec2(0.0, uTexel.y)).x;
    float top = texture2D(uVelocity, vUv + vec2(0.0, uTexel.y)).x;
    gl_FragColor = vec4(0.5 * (right - left - top + bottom), 0.0, 0.0, 1.0);
  }
`;

const VORTICITY_FRAGMENT = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uVelocity;
  uniform sampler2D uCurl;
  uniform vec2 uTexel;
  uniform float uDt;
  uniform float uStrength;
  void main() {
    float left = abs(texture2D(uCurl, vUv - vec2(uTexel.x, 0.0)).x);
    float right = abs(texture2D(uCurl, vUv + vec2(uTexel.x, 0.0)).x);
    float bottom = abs(texture2D(uCurl, vUv - vec2(0.0, uTexel.y)).x);
    float top = abs(texture2D(uCurl, vUv + vec2(0.0, uTexel.y)).x);
    float center = texture2D(uCurl, vUv).x;
    vec2 force = 0.5 * vec2(top - bottom, right - left);
    force /= length(force) + 0.0001;
    force *= uStrength * center;
    force.y *= -1.0;
    vec2 velocity = texture2D(uVelocity, vUv).xy + force * uDt;
    gl_FragColor = vec4(clamp(velocity, -1.25, 1.25), 0.0, 1.0);
  }
`;

const DIVERGENCE_FRAGMENT = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uVelocity;
  uniform vec2 uTexel;
  void main() {
    float left = texture2D(uVelocity, vUv - vec2(uTexel.x, 0.0)).x;
    float right = texture2D(uVelocity, vUv + vec2(uTexel.x, 0.0)).x;
    float bottom = texture2D(uVelocity, vUv - vec2(0.0, uTexel.y)).y;
    float top = texture2D(uVelocity, vUv + vec2(0.0, uTexel.y)).y;
    gl_FragColor = vec4(0.5 * (right - left + top - bottom), 0.0, 0.0, 1.0);
  }
`;

const PRESSURE_FRAGMENT = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uPressure;
  uniform sampler2D uDivergence;
  uniform vec2 uTexel;
  void main() {
    float left = texture2D(uPressure, vUv - vec2(uTexel.x, 0.0)).x;
    float right = texture2D(uPressure, vUv + vec2(uTexel.x, 0.0)).x;
    float bottom = texture2D(uPressure, vUv - vec2(0.0, uTexel.y)).x;
    float top = texture2D(uPressure, vUv + vec2(0.0, uTexel.y)).x;
    float divergence = texture2D(uDivergence, vUv).x;
    gl_FragColor = vec4((left + right + bottom + top - divergence) * 0.25, 0.0, 0.0, 1.0);
  }
`;

const GRADIENT_FRAGMENT = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uPressure;
  uniform sampler2D uVelocity;
  uniform vec2 uTexel;
  void main() {
    float left = texture2D(uPressure, vUv - vec2(uTexel.x, 0.0)).x;
    float right = texture2D(uPressure, vUv + vec2(uTexel.x, 0.0)).x;
    float bottom = texture2D(uPressure, vUv - vec2(0.0, uTexel.y)).x;
    float top = texture2D(uPressure, vUv + vec2(0.0, uTexel.y)).x;
    vec2 velocity = texture2D(uVelocity, vUv).xy - 0.5 * vec2(right - left, top - bottom);
    gl_FragColor = vec4(velocity, 0.0, 1.0);
  }
`;

const SPLAT_FRAGMENT = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uTarget;
  uniform vec2 uPoint;
  uniform vec3 uValue;
  uniform float uRadius;
  uniform float uAspect;
  void main() {
    vec2 delta = vUv - uPoint;
    delta.x *= uAspect;
    float influence = exp(-dot(delta, delta) / max(uRadius, 0.00001));
    vec4 base = texture2D(uTarget, vUv);
    gl_FragColor = vec4(base.rgb + uValue * influence, 1.0);
  }
`;

const PARTICLE_UPDATE_FRAGMENT = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uPositions;
  uniform sampler2D uVelocity;
  uniform float uDt;
  uniform float uTime;
  float hash(float value) { return fract(sin(value * 91.3458) * 47453.5453); }
  void main() {
    vec4 state = texture2D(uPositions, vUv);
    vec2 position = state.xy;
    float age = state.z + uDt * (0.065 + state.w * 0.035);
    vec2 velocity = texture2D(uVelocity, clamp(position, 0.001, 0.999)).xy;
    vec2 drift = vec2(sin((state.w + uTime * 0.018) * 31.0), cos((state.w - uTime * 0.014) * 27.0)) * 0.0022;
    position += velocity * uDt * 0.72 + drift * uDt;
    bool escaped = position.x < -0.03 || position.x > 1.03 || position.y < -0.03 || position.y > 1.03;
    if (age > 1.0 || escaped) {
      float cycle = floor(uTime * 0.35);
      float seedA = hash(state.w * 147.0 + cycle);
      float seedB = hash(state.w * 263.0 + cycle + 4.7);
      float emitter = step(0.5, seedA);
      vec2 temple = vec2(0.76 + (seedA - 0.5) * 0.14, 0.76 + (seedB - 0.5) * 0.16);
      vec2 jaw = vec2(0.73 + (seedA - 0.5) * 0.24, 0.29 + (seedB - 0.5) * 0.15);
      position = mix(temple, jaw, emitter);
      age = 0.02 + seedB * 0.08;
    }
    gl_FragColor = vec4(position, age, state.w);
  }
`;

const DISPLAY_VERTEX = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const DISPLAY_FRAGMENT = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uDye;
  uniform float uOpacity;
  void main() {
    vec3 dye = max(texture2D(uDye, vUv).rgb, 0.0);
    float energy = max(dye.r, max(dye.g, dye.b));
    vec2 faceUv = (vUv - vec2(0.735, 0.515)) / vec2(0.16, 0.35);
    float faceMask = 1.0 - smoothstep(0.74, 1.16, length(faceUv));
    float edgeLift = smoothstep(0.45, 0.95, abs(faceUv.x));
    float visibility = mix(1.0, 0.12 + edgeLift * 0.3, faceMask);
    vec3 color = 1.0 - exp(-dye * 1.18);
    float alpha = smoothstep(0.012, 0.34, energy) * visibility * uOpacity;
    gl_FragColor = vec4(color, alpha);
  }
`;

const PARTICLE_VERTEX = `
  precision highp float;
  attribute vec2 aParticleUv;
  uniform sampler2D uPositions;
  uniform sampler2D uVelocity;
  uniform float uPointScale;
  varying float vLife;
  varying float vSpeed;
  varying vec2 vDirection;
  void main() {
    vec4 state = texture2D(uPositions, aParticleUv);
    vec2 velocity = texture2D(uVelocity, clamp(state.xy, 0.001, 0.999)).xy;
    vec3 world = vec3((state.x - 0.5) * 11.8 + 0.55, (state.y - 0.5) * 6.7, -0.35);
    vec4 viewPosition = modelViewMatrix * vec4(world, 1.0);
    gl_Position = projectionMatrix * viewPosition;
    vLife = smoothstep(0.0, 0.1, state.z) * (1.0 - smoothstep(0.72, 1.0, state.z));
    vSpeed = clamp(length(velocity) * 5.5, 0.0, 1.0);
    vDirection = normalize(velocity + vec2(0.0001, 0.0));
    gl_PointSize = (1.35 + vSpeed * 2.4) * uPointScale * (7.0 / max(2.0, -viewPosition.z));
  }
`;

const PARTICLE_FRAGMENT = `
  precision highp float;
  varying float vLife;
  varying float vSpeed;
  varying vec2 vDirection;
  void main() {
    vec2 point = gl_PointCoord - 0.5;
    vec2 perpendicular = vec2(-vDirection.y, vDirection.x);
    vec2 stretched = vec2(dot(point, vDirection) * 0.58, dot(point, perpendicular) * 1.85);
    float core = 1.0 - smoothstep(0.08, 0.5, length(stretched));
    vec3 lavender = vec3(0.57, 0.49, 0.93);
    vec3 ice = vec3(0.48, 0.78, 1.0);
    vec3 color = mix(lavender, ice, vSpeed);
    gl_FragColor = vec4(color, core * vLife * (0.28 + vSpeed * 0.45));
  }
`;

const STATIC_FRAGMENT = `
  precision highp float;
  varying vec2 vUv;
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p); f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
  }
  void main() {
    vec2 q = (vUv - vec2(0.72, 0.52)) / vec2(0.34, 0.52);
    float ribbon = exp(-abs(length(q) - 0.88) * 7.5);
    float textureValue = noise(vUv * 7.0) * 0.45 + noise(vUv * 15.0) * 0.2;
    vec3 color = mix(vec3(0.36, 0.30, 0.72), vec3(0.45, 0.77, 0.96), vUv.y + textureValue);
    gl_FragColor = vec4(color, ribbon * (0.12 + textureValue * 0.19));
  }
`;

const QUALITY = {
  desktop: { simulation: 256, dye: 512, pressure: 10, particleSize: 112, fps: 60, pointScale: 1 },
  tablet: { simulation: 160, dye: 320, pressure: 6, particleSize: 64, fps: 45, pointScale: 0.92 },
  mobile: { simulation: 96, dye: 192, pressure: 4, particleSize: 43, fps: 30, pointScale: 0.82 },
};

function createTarget(size, type = HalfFloatType, filter = LinearFilter) {
  const target = new WebGLRenderTarget(size, size, {
    type, format: RGBAFormat, minFilter: filter, magFilter: filter,
    wrapS: ClampToEdgeWrapping, wrapT: ClampToEdgeWrapping,
    depthBuffer: false, stencilBuffer: false,
  });
  target.texture.generateMipmaps = false;
  return target;
}

function createMaterial(fragmentShader, uniforms = {}) {
  return new ShaderMaterial({ vertexShader: FULLSCREEN_VERTEX, fragmentShader, uniforms, depthWrite: false, depthTest: false });
}

function createPair(size, type, filter) {
  const pair = { read: createTarget(size, type, filter), write: createTarget(size, type, filter) };
  pair.swap = () => { const current = pair.read; pair.read = pair.write; pair.write = current; };
  pair.dispose = () => { pair.read.dispose(); pair.write.dispose(); };
  return pair;
}

function buildParticleSeed(size) {
  const data = new Float32Array(size * size * 4);
  for (let index = 0; index < size * size; index += 1) {
    const cursor = index * 4;
    const seed = (index + 0.5) / (size * size);
    const angle = seed * Math.PI * 29;
    const band = (index % 2) * 2 - 1;
    data[cursor] = 0.75 + Math.cos(angle) * (0.12 + (index % 17) * 0.003);
    data[cursor + 1] = 0.52 + Math.sin(angle) * (0.28 + band * 0.03);
    data[cursor + 2] = (index % 101) / 101;
    data[cursor + 3] = seed;
  }
  const texture = new DataTexture(data, size, size, RGBAFormat, FloatType);
  texture.needsUpdate = true;
  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;
  texture.wrapS = ClampToEdgeWrapping;
  texture.wrapT = ClampToEdgeWrapping;
  return texture;
}

class FluidEngine {
  constructor(renderer, quality) {
    this.renderer = renderer;
    this.quality = quality;
    this.scene = new Scene();
    this.camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.geometry = new PlaneGeometry(2, 2);
    this.mesh = new Mesh(this.geometry);
    this.scene.add(this.mesh);
    this.velocity = createPair(quality.simulation, HalfFloatType, LinearFilter);
    this.dye = createPair(quality.dye, HalfFloatType, LinearFilter);
    this.pressure = createPair(quality.simulation, HalfFloatType, NearestFilter);
    this.curl = createTarget(quality.simulation, HalfFloatType, NearestFilter);
    this.divergence = createTarget(quality.simulation, HalfFloatType, NearestFilter);
    this.particles = createPair(quality.particleSize, HalfFloatType, NearestFilter);
    this.particleSeed = buildParticleSeed(quality.particleSize);
    this.simTexel = new Vector2(1 / quality.simulation, 1 / quality.simulation);
    this.materials = this.createMaterials();
    this.elapsed = 0;
    this.clearTargets();
    this.seedTargets();
  }

  createMaterials() {
    return {
      advection: createMaterial(ADVECTION_FRAGMENT, { uVelocity: { value: null }, uSource: { value: null }, uDt: { value: 0.016 }, uDissipation: { value: 0.99 } }),
      curl: createMaterial(CURL_FRAGMENT, { uVelocity: { value: null }, uTexel: { value: this.simTexel } }),
      vorticity: createMaterial(VORTICITY_FRAGMENT, { uVelocity: { value: null }, uCurl: { value: null }, uTexel: { value: this.simTexel }, uDt: { value: 0.016 }, uStrength: { value: 18 } }),
      divergence: createMaterial(DIVERGENCE_FRAGMENT, { uVelocity: { value: null }, uTexel: { value: this.simTexel } }),
      pressure: createMaterial(PRESSURE_FRAGMENT, { uPressure: { value: null }, uDivergence: { value: null }, uTexel: { value: this.simTexel } }),
      gradient: createMaterial(GRADIENT_FRAGMENT, { uPressure: { value: null }, uVelocity: { value: null }, uTexel: { value: this.simTexel } }),
      splat: createMaterial(SPLAT_FRAGMENT, { uTarget: { value: null }, uPoint: { value: new Vector2() }, uValue: { value: new Color() }, uRadius: { value: 0.0018 }, uAspect: { value: 1.7 } }),
      particle: createMaterial(PARTICLE_UPDATE_FRAGMENT, { uPositions: { value: this.particleSeed }, uVelocity: { value: null }, uDt: { value: 0.016 }, uTime: { value: 0 } }),
    };
  }

  render(material, target) {
    const previousTarget = this.renderer.getRenderTarget();
    const previousAutoClear = this.renderer.autoClear;
    this.mesh.material = material;
    this.renderer.autoClear = true;
    this.renderer.setRenderTarget(target);
    this.renderer.clear();
    this.renderer.render(this.scene, this.camera);
    this.renderer.setRenderTarget(previousTarget);
    this.renderer.autoClear = previousAutoClear;
  }

  clearTargets() {
    const previousTarget = this.renderer.getRenderTarget();
    const targets = [
      this.velocity.read, this.velocity.write, this.dye.read, this.dye.write,
      this.pressure.read, this.pressure.write, this.curl, this.divergence,
      this.particles.read, this.particles.write,
    ];
    targets.forEach((target) => {
      this.renderer.setRenderTarget(target);
      this.renderer.clear();
    });
    this.renderer.setRenderTarget(previousTarget);
  }

  seedTargets() {
    this.splat(new Vector2(0.78, 0.74), new Vector2(-0.08, -0.12), new Color(0.3, 0.12, 0.7), 0.0045);
    this.splat(new Vector2(0.8, 0.34), new Vector2(0.05, 0.14), new Color(0.12, 0.45, 0.72), 0.0048);
    const material = this.materials.particle;
    material.uniforms.uPositions.value = this.particleSeed;
    material.uniforms.uVelocity.value = this.velocity.read.texture;
    material.uniforms.uDt.value = 0;
    this.render(material, this.particles.read);
  }

  splat(point, force, color, radius = 0.0018) {
    const material = this.materials.splat;
    material.uniforms.uPoint.value.copy(point);
    material.uniforms.uRadius.value = radius;
    material.uniforms.uTarget.value = this.velocity.read.texture;
    material.uniforms.uValue.value.setRGB(force.x, force.y, 0);
    this.render(material, this.velocity.write);
    this.velocity.swap();
    material.uniforms.uTarget.value = this.dye.read.texture;
    material.uniforms.uValue.value.copy(color);
    this.render(material, this.dye.write);
    this.dye.swap();
  }

  step(delta, pointerSplat) {
    const dt = Math.min(delta, 0.026);
    this.elapsed += dt;
    const { advection, curl, vorticity, divergence, pressure, gradient, particle } = this.materials;
    advection.uniforms.uVelocity.value = this.velocity.read.texture;
    advection.uniforms.uSource.value = this.velocity.read.texture;
    advection.uniforms.uDt.value = dt;
    advection.uniforms.uDissipation.value = 0.992;
    this.render(advection, this.velocity.write);
    this.velocity.swap();
    curl.uniforms.uVelocity.value = this.velocity.read.texture;
    this.render(curl, this.curl);
    vorticity.uniforms.uVelocity.value = this.velocity.read.texture;
    vorticity.uniforms.uCurl.value = this.curl.texture;
    vorticity.uniforms.uDt.value = dt;
    this.render(vorticity, this.velocity.write);
    this.velocity.swap();
    divergence.uniforms.uVelocity.value = this.velocity.read.texture;
    this.render(divergence, this.divergence);
    for (let index = 0; index < this.quality.pressure; index += 1) {
      pressure.uniforms.uPressure.value = this.pressure.read.texture;
      pressure.uniforms.uDivergence.value = this.divergence.texture;
      this.render(pressure, this.pressure.write);
      this.pressure.swap();
    }
    gradient.uniforms.uPressure.value = this.pressure.read.texture;
    gradient.uniforms.uVelocity.value = this.velocity.read.texture;
    this.render(gradient, this.velocity.write);
    this.velocity.swap();
    const phase = this.elapsed * 0.42;
    const idlePoint = new Vector2(0.78 + Math.sin(phase) * 0.07, 0.7 + Math.cos(phase * 0.73) * 0.12);
    const idleForce = new Vector2(-0.075 + Math.cos(phase) * 0.035, -0.045 + Math.sin(phase * 1.3) * 0.055);
    const idleColor = new Color(0.075, 0.035, 0.17).lerp(new Color(0.03, 0.13, 0.22), (Math.sin(phase) + 1) * 0.5);
    this.splat(idlePoint, idleForce, idleColor, 0.00185);
    const jawPoint = new Vector2(0.7 + Math.cos(phase * 0.81) * 0.08, 0.28 + Math.sin(phase * 0.62) * 0.055);
    const jawForce = new Vector2(0.06 + Math.sin(phase) * 0.035, 0.065 + Math.cos(phase * 1.17) * 0.045);
    const jawColor = new Color(0.085, 0.04, 0.19).lerp(new Color(0.035, 0.115, 0.18), (Math.cos(phase * 0.77) + 1) * 0.5);
    this.splat(jawPoint, jawForce, jawColor, 0.0017);
    if (pointerSplat) this.splat(pointerSplat.point, pointerSplat.force, pointerSplat.color, 0.0014);
    advection.uniforms.uVelocity.value = this.velocity.read.texture;
    advection.uniforms.uSource.value = this.dye.read.texture;
    advection.uniforms.uDt.value = dt;
    advection.uniforms.uDissipation.value = 0.9965;
    this.render(advection, this.dye.write);
    this.dye.swap();
    particle.uniforms.uPositions.value = this.particles.read.texture;
    particle.uniforms.uVelocity.value = this.velocity.read.texture;
    particle.uniforms.uDt.value = dt;
    particle.uniforms.uTime.value = this.elapsed;
    this.render(particle, this.particles.write);
    this.particles.swap();
  }

  dispose() {
    this.geometry.dispose();
    this.velocity.dispose(); this.dye.dispose(); this.pressure.dispose(); this.particles.dispose();
    this.curl.dispose(); this.divergence.dispose(); this.particleSeed.dispose();
    Object.values(this.materials).forEach((material) => material.dispose());
  }
}

function StaticFluidVeil() {
  const material = useMemo(() => new ShaderMaterial({
    vertexShader: DISPLAY_VERTEX, fragmentShader: STATIC_FRAGMENT,
    transparent: true, depthWrite: false, blending: AdditiveBlending,
  }), []);
  useEffect(() => () => material.dispose(), [material]);
  return <mesh position={[0.35, 0, -1.6]}><planeGeometry args={[12.5, 7.4]} /><primitive object={material} attach="material" /></mesh>;
}

function buildParticleGeometry(size) {
  const count = size * size;
  const geometry = new BufferGeometry();
  const particleUvs = new Float32Array(count * 2);
  for (let index = 0; index < count; index += 1) {
    particleUvs[index * 2] = ((index % size) + 0.5) / size;
    particleUvs[index * 2 + 1] = (Math.floor(index / size) + 0.5) / size;
  }
  geometry.setAttribute('position', new BufferAttribute(new Float32Array(count * 3), 3));
  geometry.setAttribute('aParticleUv', new BufferAttribute(particleUvs, 2));
  return geometry;
}

export default function FluidSimulation({ tier = 'desktop', paused = false }) {
  const { gl } = useThree();
  const quality = QUALITY[tier] ?? QUALITY.desktop;
  const supportsSimulation = gl.capabilities.isWebGL2 || (gl.extensions.has('OES_texture_half_float') && gl.extensions.has('WEBGL_color_buffer_float'));
  const engine = useMemo(() => (supportsSimulation && !paused ? new FluidEngine(gl, quality) : null), [gl, paused, quality, supportsSimulation]);
  const accumulator = useRef(0);
  const pointer = useRef({ active: false, x: 0.5, y: 0.5, lastX: 0.5, lastY: 0.5, lastTime: 0 });
  const particleGeometry = useMemo(() => buildParticleGeometry(quality.particleSize), [quality.particleSize]);
  const displayMaterial = useMemo(() => new ShaderMaterial({
    vertexShader: DISPLAY_VERTEX, fragmentShader: DISPLAY_FRAGMENT,
    uniforms: { uDye: { value: null }, uOpacity: { value: tier === 'mobile' ? 0.72 : 0.9 } },
    transparent: true, depthWrite: false, blending: AdditiveBlending,
  }), [tier]);
  const particleMaterial = useMemo(() => new ShaderMaterial({
    vertexShader: PARTICLE_VERTEX, fragmentShader: PARTICLE_FRAGMENT,
    uniforms: { uPositions: { value: null }, uVelocity: { value: null }, uPointScale: { value: quality.pointScale * Math.min(window.devicePixelRatio || 1, 1.5) } },
    transparent: true, depthWrite: false, blending: AdditiveBlending,
  }), [quality.pointScale]);
  const particlePoints = useMemo(() => new Points(particleGeometry, particleMaterial), [particleGeometry, particleMaterial]);

  useEffect(() => {
    const handlePointer = (event) => {
      const hero = document.querySelector('[data-module="hero"]');
      if (!hero) return;
      const bounds = hero.getBoundingClientRect();
      if (event.clientY < bounds.top || event.clientY > bounds.bottom) { pointer.current.active = false; return; }
      const now = performance.now();
      if (now - pointer.current.lastTime < 32) return;
      const x = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
      const y = Math.min(1, Math.max(0, 1 - ((event.clientY - bounds.top) / bounds.height)));
      pointer.current = { active: true, x, y, lastX: pointer.current.x, lastY: pointer.current.y, lastTime: now };
    };
    window.addEventListener('pointermove', handlePointer, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointer);
  }, []);

  useEffect(() => () => {
    engine?.dispose(); particleGeometry.dispose(); displayMaterial.dispose(); particleMaterial.dispose();
  }, [displayMaterial, engine, particleGeometry, particleMaterial]);

  useFrame((_, delta) => {
    if (!engine || paused) return;
    accumulator.current += delta;
    const interval = 1 / quality.fps;
    if (accumulator.current < interval) return;
    const step = Math.min(accumulator.current, 0.034);
    accumulator.current = 0;
    let pointerSplat = null;
    if (pointer.current.active) {
      pointerSplat = {
        point: new Vector2(pointer.current.x, pointer.current.y),
        force: new Vector2(Math.max(-0.36, Math.min(0.36, (pointer.current.x - pointer.current.lastX) * 7.5)), Math.max(-0.36, Math.min(0.36, (pointer.current.y - pointer.current.lastY) * 7.5))),
        color: new Color(0.12, 0.3, 0.52),
      };
      pointer.current.active = false;
    }
    engine.step(step, pointerSplat);
    displayMaterial.uniforms.uDye.value = engine.dye.read.texture;
    particleMaterial.uniforms.uPositions.value = engine.particles.read.texture;
    particleMaterial.uniforms.uVelocity.value = engine.velocity.read.texture;
  }, -1);

  if (!engine || paused) return <StaticFluidVeil />;
  return (
    <group>
      <mesh position={[0.35, 0, -1.55]}><planeGeometry args={[12.5, 7.4]} /><primitive object={displayMaterial} attach="material" /></mesh>
      <primitive object={particlePoints} />
    </group>
  );
}
