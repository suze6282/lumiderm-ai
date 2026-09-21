import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { AdditiveBlending, Color, DoubleSide, MathUtils } from 'three';

const vertexShader = `
  uniform float uTime;
  uniform float uPhase;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 transformed = position;
    transformed.z += sin((position.x + uPhase) * 0.72 + uTime * 0.06) * 0.12;
    transformed.z += cos((position.y - uPhase) * 0.86 - uTime * 0.045) * 0.08;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform float uPhase;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(p);
      p = p * 2.03 + 17.2;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 centered = vUv - 0.5;
    centered.x *= 1.34;
    float radius = length(centered);
    float angle = atan(centered.y, centered.x);
    vec2 flow = vec2(angle * 0.9 + uPhase, radius * 7.4 - uTime * 0.018);
    float structure = fbm(flow + centered * 3.2);
    float detail = fbm(centered * 8.0 + vec2(uTime * 0.012, -uTime * 0.009));
    float veil = smoothstep(0.72, 0.08, radius) * smoothstep(0.24, 0.82, structure + detail * 0.32);
    float core = smoothstep(0.34, 0.0, radius) * 0.28;
    vec3 color = mix(uColorA, uColorB, clamp(structure + centered.y * 0.32, 0.0, 1.0));
    gl_FragColor = vec4(color, (veil * 0.26) + core);
  }
`;

function seededRandom(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function createParticleField(count, seed) {
  const random = seededRandom(seed);
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const violet = new Color('#9b8cff');
  const blue = new Color('#84d4ff');
  const pale = new Color('#d9e8ff');

  for (let index = 0; index < count; index += 1) {
    const angle = random() * Math.PI * 5.5;
    const radius = 0.7 + Math.pow(random(), 0.7) * 4.2;
    const depth = (random() - 0.5) * 4.8;
    const cursor = index * 3;
    positions[cursor] = Math.cos(angle) * radius + 1.35 + depth * 0.08;
    positions[cursor + 1] = Math.sin(angle) * radius * 0.46 + (random() - 0.5) * 0.55;
    positions[cursor + 2] = depth;

    const color = violet.clone().lerp(blue, random());
    if (random() > 0.88) color.lerp(pale, 0.58);
    colors[cursor] = color.r;
    colors[cursor + 1] = color.g;
    colors[cursor + 2] = color.b;
  }

  return { positions, colors };
}

function NebulaCloud({ colorA, colorB, phase, position, rotation, scale, paused, mobile }) {
  const materialRef = useRef(null);

  useFrame((_, delta) => {
    if (!paused && materialRef.current) {
      materialRef.current.uniforms.uTime.value += Math.min(delta, 0.05);
    }
  });

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uPhase: { value: phase },
    uColorA: { value: new Color(colorA) },
    uColorB: { value: new Color(colorB) },
  }), [colorA, colorB, phase]);

  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <planeGeometry args={mobile ? [8, 6, 28, 22] : [8, 6, 48, 36]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
        side={DoubleSide}
      />
    </mesh>
  );
}

function NebulaParticles({ count, paused, interactive }) {
  const groupRef = useRef(null);
  const field = useMemo(() => createParticleField(count, 6282), [count]);

  useFrame((state, delta) => {
    if (paused || !groupRef.current) return;
    const step = Math.min(delta, 0.05);
    groupRef.current.rotation.z += step * 0.006;
    groupRef.current.rotation.y += step * 0.003;
    if (interactive) {
      groupRef.current.position.x = MathUtils.lerp(groupRef.current.position.x, state.pointer.x * 0.16, 0.018);
      groupRef.current.position.y = MathUtils.lerp(groupRef.current.position.y, state.pointer.y * 0.08, 0.018);
    }
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[field.positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[field.colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.032}
          sizeAttenuation
          transparent
          opacity={0.64}
          vertexColors
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </points>
    </group>
  );
}

export default function NebulaScene({ mobile = false, paused = false }) {
  const sceneRef = useRef(null);

  useFrame((state) => {
    if (paused || mobile || !sceneRef.current) return;
    const targetX = state.pointer.x * 0.08;
    const targetY = state.pointer.y * 0.045;
    sceneRef.current.rotation.y = MathUtils.lerp(sceneRef.current.rotation.y, targetX, 0.012);
    sceneRef.current.rotation.x = MathUtils.lerp(sceneRef.current.rotation.x, -targetY, 0.012);
  });

  return (
    <group ref={sceneRef} position={[mobile ? 0.2 : 0.8, 0, 0]}>
      <NebulaCloud
        colorA="#7060c8"
        colorB="#5da7d9"
        phase={0.4}
        position={[0.7, 0.35, -1.8]}
        rotation={[0.04, -0.08, -0.12]}
        scale={[1.15, 0.92, 1]}
        paused={paused}
        mobile={mobile}
      />
      {!mobile ? (
        <NebulaCloud
          colorA="#44347e"
          colorB="#86c9e8"
          phase={2.1}
          position={[1.9, -0.55, -2.4]}
          rotation={[-0.04, 0.12, 0.2]}
          scale={[0.84, 0.7, 1]}
          paused={paused}
          mobile={mobile}
        />
      ) : null}
      <NebulaParticles count={mobile ? 320 : 1650} paused={paused} interactive={!mobile} />
    </group>
  );
}
