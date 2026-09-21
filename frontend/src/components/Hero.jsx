import { Component, lazy, Suspense } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ScanFace } from 'lucide-react';
import Container from './common/Container.jsx';
import GradientButton from './common/GradientButton.jsx';
import HeroPortraitLayer from './HeroPortraitLayer.jsx';
import { heroInsightCards, heroStats } from '../data/heroData.js';
import { motionDuration, motionEase } from '../lib/motion.js';
import { cn } from '../lib/utils.js';

const HeroNebulaCanvas = lazy(() => import('./three/HeroNebulaCanvas.jsx'));

class NebulaErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function HeroContent({ reduceMotion }) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: motionDuration.slow, ease: motionEase }}
      className="hero-copy relative z-20"
    >
      <p className="hero-eyebrow text-gradient-lumi">AI 肌肤智能 · 2026</p>

      <h1 className="hero-title display-title">
        <span>AI 驱动的</span>
        <span className="text-gradient-lumi">肌肤智能</span>
        <span>重塑未来之美</span>
      </h1>

      <p className="hero-subtitle body-copy">
        用人工智能重新理解你的肌肤状态，生成个性化肌肤洞察与护理方案。
      </p>

      <div className="hero-actions">
        <GradientButton href="#analysis" size="lg" icon={ArrowRight}>
          开始肌肤检测
        </GradientButton>
        <GradientButton href="#technology" variant="secondary" size="lg">
          了解核心技术
        </GradientButton>
      </div>

      <HeroStats />
    </motion.div>
  );
}

function HeroStats() {
  return (
    <dl className="hero-stats hidden sm:grid">
      {heroStats.map((stat) => (
        <div key={stat.id} className="hero-stat">
          <dt className="sr-only">{stat.label}</dt>
          <dd className="font-display text-[1.45rem] font-semibold tracking-tight text-lumi-text">{stat.value}</dd>
          <dd className="mt-1 text-xs text-lumi-secondary">{stat.label}</dd>
        </div>
      ))}
    </dl>
  );
}

function HudGraphic({ type }) {
  if (type === 'score') {
    return (
      <svg className="hero-hud-graphic" viewBox="0 0 74 24" aria-hidden="true">
        <path d="M2 18C12 17 14 9 24 11C34 13 37 5 47 7C58 9 61 3 72 4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === 'hydration') {
    return (
      <span className="hero-hud-bars" aria-hidden="true">
        {[0.42, 0.58, 0.74, 0.9].map((scale, index) => (
          <i key={scale} style={{ '--bar-scale': scale, '--bar-index': index }} />
        ))}
      </span>
    );
  }

  if (type === 'pores') {
    return (
      <span className="hero-hud-dots" aria-hidden="true">
        {Array.from({ length: 9 }, (_, index) => <i key={index} />)}
      </span>
    );
  }

  return (
    <svg className="hero-hud-ring" viewBox="0 0 36 36" aria-hidden="true">
      <circle cx="18" cy="18" r="13.5" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="2.5" />
      <circle cx="18" cy="18" r="13.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="78 85" transform="rotate(-90 18 18)" />
    </svg>
  );
}

function FloatingHudCard({ card }) {
  return (
    <div className={cn('hero-hud-card', card.placement, card.visibility)}>
      <div>
        <p className="hero-hud-label">{card.label}</p>
        <p className="hero-hud-value">{card.value}</p>
        <p className="hero-hud-detail">{card.detail}</p>
      </div>
      <HudGraphic type={card.graphic} />
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="hero-intelligence-visual relative z-20" aria-label="AI 肌肤分析视觉">
      <div className="hero-visual-frame" aria-hidden="true" />
      <div className="hero-intelligence-label">
        <ScanFace size={15} aria-hidden="true" />
        <span>AI 肌肤智能</span>
      </div>
      <HeroPortraitLayer />
      {heroInsightCards.map((card) => <FloatingHudCard key={card.id} card={card} />)}
    </div>
  );
}

export default function Hero({ className = '' }) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      data-module="hero"
      className={cn('hero-section relative isolate overflow-hidden', className)}
    >
      <div className="hero-nebula-fallback" aria-hidden="true" />
      <div className="hero-nebula-layer" aria-hidden="true">
        <NebulaErrorBoundary>
          <Suspense fallback={null}>
            <HeroNebulaCanvas reduceMotion={Boolean(reduceMotion)} />
          </Suspense>
        </NebulaErrorBoundary>
      </div>
      <div className="hero-depth-scrim" aria-hidden="true" />

      <Container className="hero-container relative z-10">
        <div className="hero-layout">
          <HeroContent reduceMotion={reduceMotion} />
          <HeroVisual />
        </div>
      </Container>

      <p className="hero-brand-word display-title" aria-hidden="true">LumiDerm AI</p>
    </section>
  );
}
