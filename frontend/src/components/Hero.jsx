import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ScanFace, Sparkles } from 'lucide-react';
import Container from './common/Container.jsx';
import GradientButton from './common/GradientButton.jsx';
import GlowCard from './common/GlowCard.jsx';
import { heroDetectionPoints, heroInsightCards, heroStats } from '../data/heroData.js';
import { cn } from '../lib/utils.js';

function HeroContent({ reduceMotion }) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="relative z-20 max-w-3xl"
    >
      <div className="mb-5 inline-flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-lumi-secondary">
        <span className="hero-eyebrow-dot" aria-hidden="true" />
        <span className="text-gradient-lumi">AI BEAUTY INTELLIGENCE · 2026</span>
      </div>

      <h1 className="display-title text-[clamp(2.8rem,5.45vw,5.2rem)] text-lumi-text">
        AI-Powered
        <br />
        <span className="text-gradient-lumi lg:whitespace-nowrap">Skin Intelligence</span>
        <br />
        <span className="text-lumi-text/95 lg:whitespace-nowrap">For Future Beauty</span>
      </h1>

      <p className="body-copy mt-5 max-w-[34rem] text-base sm:text-lg">
        用人工智能重新理解你的肌肤状态，生成可视化评分报告与专属护肤方案。
      </p>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <GradientButton href="#analysis" size="lg" icon={ArrowRight}>
          Start Skin Scan
        </GradientButton>
        <GradientButton href="#technology" variant="secondary" size="lg">
          View Technology
        </GradientButton>
      </div>

      <HeroStats />
    </motion.div>
  );
}

function HeroStats() {
  return (
    <div className="mt-7 grid max-w-2xl gap-3 sm:grid-cols-3">
      {heroStats.map((stat) => (
        <div key={stat.id} className="rounded-2xl border border-lumi-line bg-white/[0.035] px-4 py-4 backdrop-blur">
          <div className="flex items-baseline gap-2">
            <strong className="font-display text-2xl font-semibold tracking-tight text-lumi-text">{stat.value}</strong>
            <span className="text-sm font-semibold text-lumi-secondary">{stat.label}</span>
          </div>
          <p className="mt-2 text-xs leading-5 text-lumi-muted">{stat.description}</p>
        </div>
      ))}
    </div>
  );
}

function FloatingInsightCard({ card }) {
  return (
    <div className={cn('absolute z-30', card.placement, card.visibility)}>
      <GlowCard
        hoverable={false}
        className="hero-float-card p-3 shadow-glow"
        style={{ '--float-delay': card.delay, '--float-duration': card.duration }}
      >
        <p className="text-[0.68rem] uppercase tracking-[0.18em] text-lumi-cyan/80">{card.label}</p>
        <p className="mt-2 text-base font-semibold leading-tight text-lumi-text">{card.value}</p>
        <p className="mt-1 text-[0.72rem] leading-5 text-lumi-muted">{card.detail}</p>
      </GlowCard>
    </div>
  );
}

function FaceScanVisual() {
  return (
    <div className="hero-face-shell relative mx-auto h-[23rem] w-[16.5rem] sm:h-[28rem] sm:w-[20rem] lg:h-[31rem] lg:w-[22rem]">
      <div className="hero-face-halo" aria-hidden="true" />
      <div className="hero-face relative h-full overflow-hidden rounded-[48%_52%_46%_54%/38%_40%_60%_62%] border border-lumi-cyan/20">
        <div className="hero-face-grain" aria-hidden="true" />
        <div className="hero-scan-line" aria-hidden="true" />
        <svg className="absolute inset-[12%] z-10 h-auto w-auto text-white/70" viewBox="0 0 240 330" aria-hidden="true">
          <path d="M82 116 C104 100 136 100 158 116" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M86 143 C100 136 114 136 128 143" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M144 143 C157 136 171 136 184 143" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M126 136 C118 170 115 190 137 193" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M91 235 C112 252 145 252 166 235" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M104 249 C121 258 137 258 153 249" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        </svg>
        <svg className="absolute inset-0 z-20 h-full w-full text-lumi-cyan/22" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M50 23 L38 43 L31 58 L51 76 L70 58 L61 43 Z" fill="none" stroke="currentColor" strokeWidth="0.28" />
          <path d="M38 43 L61 43 M31 58 L70 58 M50 23 L51 76" fill="none" stroke="currentColor" strokeWidth="0.22" />
        </svg>
        {heroDetectionPoints.map((point) => (
          <span
            key={point.id}
            className="hero-detection-point"
            style={{ left: point.x, top: point.y }}
            aria-label={point.label}
          />
        ))}
      </div>
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="relative z-20 min-h-[29rem] lg:min-h-[34rem]" aria-label="AI cosmetic skin analysis visual">
      <div className="hero-visual-grid absolute inset-0 rounded-[2rem]" aria-hidden="true" />
      <div className="absolute left-1/2 top-1/2 h-[17rem] w-[17rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lumi-magenta/10 blur-3xl sm:h-[30rem] sm:w-[30rem] lg:h-[34rem] lg:w-[34rem]" aria-hidden="true" />
      <div className="absolute right-6 top-8 z-20 hidden items-center gap-2 rounded-full border border-lumi-line bg-lumi-black/50 px-4 py-2 text-xs text-lumi-secondary backdrop-blur sm:flex">
        <ScanFace size={15} className="text-lumi-cyan" aria-hidden="true" />
        Simulated skin intelligence
      </div>
      <FaceScanVisual />
      {heroInsightCards.map((card) => (
        <FloatingInsightCard key={card.id} card={card} />
      ))}
    </div>
  );
}

export default function Hero({ className = '' }) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      data-module="hero"
      className={cn(
        'hero-section relative isolate min-h-[calc(100dvh-4rem)] overflow-hidden py-10 sm:py-12 lg:py-14',
        className,
      )}
    >
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-side-mark hidden xl:block" aria-hidden="true">
        2026 / SKIN DATA / AI ANALYSIS / BEAUTY FUTURE
      </div>
      <Container className="relative z-10">
        <div className="grid w-full items-start gap-12 lg:grid-cols-[0.92fr_1.08fr] xl:gap-16">
          <HeroContent reduceMotion={reduceMotion} />
          <HeroVisual />
        </div>
      </Container>
      <p className="hero-brand-word display-title pointer-events-none absolute inset-x-0 bottom-[-0.2em] z-[1] mx-auto text-center text-[clamp(4.8rem,17vw,14rem)] font-black leading-none">
        LumiDerm
      </p>
      <Sparkles className="absolute bottom-24 left-[6%] z-[2] hidden text-lumi-cyan/25 sm:block" size={22} aria-hidden="true" />
    </section>
  );
}
