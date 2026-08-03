import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Container from './common/Container.jsx';
import GlowCard from './common/GlowCard.jsx';
import GradientButton from './common/GradientButton.jsx';
import MotionSection from './common/MotionSection.jsx';
import SectionTitle from './common/SectionTitle.jsx';
import { pricingPlans } from '../data/pricingPlans.js';
import { cardReveal, staggerContainer } from '../lib/motion.js';
import { cn } from '../lib/utils.js';

const accentMap = {
  violet: {
    rgb: '155, 92, 255',
    text: 'text-lumi-violet',
    border: 'border-lumi-violet/25',
    bg: 'bg-lumi-violet/10',
  },
  cyan: {
    rgb: '95, 255, 224',
    text: 'text-lumi-cyan',
    border: 'border-lumi-cyan/25',
    bg: 'bg-lumi-cyan/10',
  },
  magenta: {
    rgb: '255, 79, 216',
    text: 'text-lumi-magenta',
    border: 'border-lumi-magenta/25',
    bg: 'bg-lumi-magenta/10',
  },
};

function FeatureList({ features, accent }) {
  return (
    <ul className="mt-7 flex-1 space-y-3 text-sm text-lumi-secondary">
      {features.map((feature) => (
        <li key={feature} className="flex gap-3">
          <span
            className={cn(
              'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border',
              accent.border,
              accent.bg,
              accent.text,
            )}
          >
            <Check size={13} strokeWidth={2.2} aria-hidden="true" />
          </span>
          <span className="leading-6">{feature}</span>
        </li>
      ))}
    </ul>
  );
}

function PricingCard({ plan }) {
  const accent = accentMap[plan.accent] || accentMap.cyan;

  return (
    <GlowCard
      className={cn(
        'pricing-card flex min-h-full flex-col p-5 sm:p-6',
        plan.highlighted && 'pricing-card-highlight',
      )}
      style={{ '--pricing-accent': accent.rgb }}
    >
      <div className="flex min-h-8 items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lumi-muted">{plan.zhAudience}</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-lumi-text">{plan.name}</h3>
        </div>
        {plan.badge ? (
          <span className="pricing-badge rounded-full border border-lumi-cyan/30 bg-lumi-cyan/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-lumi-cyan">
            {plan.badge}
          </span>
        ) : null}
      </div>

      <div className="mt-7">
        <p className="flex items-end gap-2 font-display text-5xl font-bold tracking-tight text-lumi-text">
          {plan.price}
          {plan.period ? <span className="pb-1 text-base font-semibold text-lumi-secondary">{plan.period}</span> : null}
        </p>
        <p className={cn('mt-3 inline-flex rounded-full border px-3 py-1 text-xs font-semibold', accent.border, accent.bg, accent.text)}>
          {plan.audience}
        </p>
      </div>

      <p className="mt-6 text-sm leading-6 text-lumi-secondary">{plan.description}</p>
      <p className="mt-3 text-sm leading-6 text-lumi-muted">{plan.zhDescription}</p>

      <FeatureList features={plan.features} accent={accent} />

      <GradientButton className="mt-8" href={plan.ctaHref} variant={plan.highlighted ? 'primary' : 'secondary'}>
        {plan.cta}
      </GradientButton>
    </GlowCard>
  );
}

export default function Pricing({ className = '' }) {
  return (
    <MotionSection id="pricing" data-module="pricing" className={cn('section-spacing', className)}>
      <Container>
        <SectionTitle
          align="center"
          eyebrow="PRICING PLANS"
          title="Choose Your Skin Intelligence Plan"
          subtitle="从免费体验到品牌级解决方案，选择适合你的 AI 肌肤分析能力。"
        />

        <motion.div className="mt-12 grid gap-4 lg:grid-cols-3 lg:items-stretch" variants={staggerContainer}>
          {pricingPlans.map((plan) => (
            <motion.div key={plan.id} variants={cardReveal} className="min-h-full">
              <div className={cn('h-full', plan.highlighted && 'lg:-translate-y-4')}>
                <PricingCard plan={plan} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-6 text-lumi-muted">
          All plans are designed for cosmetic skin analysis experiences. LumiDerm AI is not a medical diagnosis tool.
          <br />
          所有方案均用于美容护肤分析体验展示，不构成医疗诊断或治疗建议。
        </p>
      </Container>
    </MotionSection>
  );
}
