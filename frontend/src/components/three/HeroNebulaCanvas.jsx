import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { SRGBColorSpace } from 'three';
import NebulaScene from './NebulaScene.jsx';

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!context) return false;
    context.getExtension('WEBGL_lose_context')?.loseContext();
    return true;
  } catch {
    return false;
  }
}

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, [query]);

  return matches;
}

export default function HeroNebulaCanvas({ reduceMotion = false }) {
  const mobile = useMediaQuery('(max-width: 767px)');
  const tablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const [visible, setVisible] = useState(true);
  const [documentVisible, setDocumentVisible] = useState(!document.hidden);
  const [canRender] = useState(supportsWebGL);

  useEffect(() => {
    const hero = document.querySelector('[data-module="hero"]');
    if (!hero) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: '160px 0px', threshold: 0.01 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleVisibility = () => setDocumentVisible(!document.hidden);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  if (!canRender) return null;

  const paused = reduceMotion || !visible || !documentVisible;
  const tier = mobile ? 'mobile' : tablet ? 'tablet' : 'desktop';

  return (
    <Canvas
      aria-hidden="true"
      className="hero-nebula-canvas"
      camera={{ position: [0, 0, 7], fov: mobile ? 54 : 47, near: 0.1, far: 30 }}
      dpr={mobile ? 1 : tablet ? [1, 1.25] : [1, 1.5]}
      frameloop={paused ? 'demand' : 'always'}
      gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x05050a, 0);
        gl.outputColorSpace = SRGBColorSpace;
      }}
    >
      <NebulaScene tier={tier} paused={paused} />
    </Canvas>
  );
}
