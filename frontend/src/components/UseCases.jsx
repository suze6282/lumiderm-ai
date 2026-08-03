import { motion } from 'framer-motion';
import { BadgeCheck, Gem, LineChart, MessageCircle, ShoppingBag, Sparkles } from 'lucide-react';
import Container from './common/Container.jsx';
import GlowCard from './common/GlowCard.jsx';
import MotionSection from './common/MotionSection.jsx';
import SectionTitle from './common/SectionTitle.jsx';
import { useCases } from '../data/useCases.js';
import { cardReveal, staggerContainer } from '../lib/motion.js';
import { cn } from '../lib/utils.js';

const iconMap = {
  BadgeCheck,
  Gem,
  LineChart,
  MessageCircle,
  ShoppingBag,
  Sparkles,
};

const accentMap = {
  violet: {
    rgb: '155, 92, 255',
    text: 'text-lumi-violet',
    border: 'border-lumi-violet/25',
    bg: 'bg-lumi-violet/10',
  },
  rose: {
    rgb: '255, 107, 158',
    text: 'text-lumi-rose',
    border: 'border-lumi-rose/25',
    bg: 'bg-lumi-rose/10',
  },
  cyan: {
    rgb: '95, 255, 224',
    text: 'text-lumi-cyan',
    border: 'border-lumi-cyan/25',
    bg: 'bg-lumi-cyan/10',
  },
  blue: {
    rgb: '76, 201, 240',
    text: 'text-lumi-blue',
    border: 'border-lumi-blue/25',
    bg: 'bg-lumi-blue/10',
  },
  magenta: {
    rgb: '255, 79, 216',
    text: 'text-lumi-magenta',
    border: 'border-lumi-magenta/25',
    bg: 'bg-lumi-magenta/10',
  },
};

function UseCaseCard({ item }) {
  const Icon = iconMap[item.iconName] || Sparkles;
  const accent = accentMap[item.accent] || accentMap.cyan;

  return (
    <GlowCard
      className="use-case-card flex min-h-full flex-col p-5 sm:p-6"
      style={{ '--use-case-accent': accent.rgb }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className={cn('flex size-12 shrink-0 items-center justify-center rounded-full border', accent.border, accent.bg, accent.text)}>
          <Icon size={21} strokeWidth={1.8} aria-hidden="true" />
        </div>
        <span
          className={cn(
            'rounded-full border bg-white/[0.035] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em]',
            accent.border,
            accent.text,
          )}
        >
          {item.tag}
        </span>
      </div>
      <div className="mt-7 flex-1">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-lumi-muted">{item.zhTitle}</p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-lumi-text">{item.title}</h3>
        <p className="mt-4 text-sm leading-6 text-lumi-secondary">{item.description}</p>
      </div>
    </GlowCard>
  );
}

export default function UseCases({ className = '' }) {
  return (
    <MotionSection id="use-cases" data-module="use-cases" className={cn('section-spacing', className)}>
      <Container>
        <SectionTitle
          eyebrow="BUILT FOR BEAUTY ECOSYSTEMS"
          title="Built For Every Beauty Journey"
          subtitle="从个人护肤到品牌数字化体验，LumiDerm AI 可以适配多种美容科技场景，帮助用户更清晰地理解肌肤状态和护理方向。"
          align="center"
        />

        <motion.div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" variants={staggerContainer}>
          {useCases.map((item) => (
            <motion.div key={item.id} variants={cardReveal} className="min-h-full">
              <UseCaseCard item={item} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </MotionSection>
  );
}
