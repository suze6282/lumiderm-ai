import { ArrowRight, Sparkles } from 'lucide-react';
import Container from './common/Container.jsx';
import GradientButton from './common/GradientButton.jsx';
import GlowCard from './common/GlowCard.jsx';
import MotionSection from './common/MotionSection.jsx';
import { cn } from '../lib/utils.js';

const trustPoints = [
  'Simulated cosmetic analysis',
  'Personalized routine direction',
  'Beauty intelligence concept',
];

export default function FinalCTA({ className = '' }) {
  return (
    <MotionSection id="contact" data-module="final-cta" className={cn('section-spacing pt-0', className)}>
      <Container>
        <GlowCard className="final-cta-panel overflow-hidden p-6 sm:p-8 lg:p-10" hoverable={false}>
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="mb-6 flex size-12 items-center justify-center rounded-full border border-lumi-cyan/20 bg-lumi-cyan/10 text-lumi-cyan">
                <Sparkles size={22} strokeWidth={1.8} aria-hidden="true" />
              </div>
              <h2 className="font-display text-4xl font-bold leading-[1.04] tracking-display text-lumi-text sm:text-5xl lg:text-6xl">
                Discover What Your Skin Is Trying To Tell You.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-lumi-secondary sm:text-lg">
                开启你的 AI 肌肤分析体验，用数据理解肌肤，用科学定制护理方向。
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {trustPoints.map((point) => (
                  <span
                    key={point}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-lumi-secondary"
                  >
                    {point}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <GradientButton href="#analysis" size="lg" icon={ArrowRight}>
                Try LumiDerm AI
              </GradientButton>
              <GradientButton href="#pricing" variant="secondary" size="lg">
                View Plans
              </GradientButton>
            </div>
          </div>
        </GlowCard>
      </Container>
    </MotionSection>
  );
}
