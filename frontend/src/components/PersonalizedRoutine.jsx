import { motion } from 'framer-motion';
import {
  ArrowRight,
  CalendarDays,
  FlaskConical,
  Moon,
  ShieldCheck,
  Sparkles,
  SunMedium,
} from 'lucide-react';
import Container from './common/Container.jsx';
import GradientButton from './common/GradientButton.jsx';
import GlowCard from './common/GlowCard.jsx';
import MotionSection from './common/MotionSection.jsx';
import SectionTitle from './common/SectionTitle.jsx';
import {
  routineData,
  routineFlow,
  routinePriorities,
  routineSummaryMetrics,
} from '../data/routineData.js';
import { cardReveal, staggerContainer } from '../lib/motion.js';
import { cn } from '../lib/utils.js';

const iconMap = {
  CalendarDays,
  FlaskConical,
  Moon,
  Sparkles,
  SunMedium,
};

const accentMap = {
  rose: {
    rgb: '255, 107, 158',
    text: 'text-lumi-rose',
    border: 'border-lumi-rose/25',
    bg: 'bg-lumi-rose/10',
  },
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

function PriorityPill({ item }) {
  const accent = accentMap[item.accent] || accentMap.cyan;

  return (
    <span
      className={cn(
        'inline-flex flex-col rounded-2xl border bg-white/[0.025] px-3 py-2',
        accent.border,
      )}
    >
      <span className={cn('text-xs font-semibold', accent.text)}>{item.title}</span>
      <span className="mt-1 text-xs text-lumi-muted">{item.zhTitle}</span>
    </span>
  );
}

function RoutineFlow() {
  return (
    <div className="routine-flow mt-7 grid gap-3 sm:grid-cols-4 lg:grid-cols-1">
      {routineFlow.map((item, index) => (
        <div key={item.title} className="routine-flow-step">
          <span className="routine-flow-index">{String(index + 1).padStart(2, '0')}</span>
          <div>
            <p className="text-sm font-semibold text-lumi-text">{item.title}</p>
            <p className="mt-1 text-xs text-lumi-muted">{item.zhTitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function RoutineSummary() {
  return (
    <GlowCard className="routine-summary-panel p-5 sm:p-6" hoverable={false}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-lumi-cyan/80">
            AI Routine Summary
          </p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-lumi-text">
            Care Direction Engine
          </h3>
          <p className="mt-3 text-sm leading-6 text-lumi-secondary">
            基于模拟肌肤指标和面部分区观察生成护理方向。
          </p>
        </div>
        <div className="flex size-11 shrink-0 items-center justify-center rounded-full border border-lumi-cyan/20 bg-lumi-cyan/10 text-lumi-cyan">
          <Sparkles size={20} strokeWidth={1.8} aria-hidden="true" />
        </div>
      </div>

      <div className="mt-7 grid gap-3">
        {routineSummaryMetrics.map((metric) => (
          <div key={metric.label} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-lumi-text">{metric.label}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-lumi-muted">{metric.status}</p>
              </div>
              <p className="font-display text-2xl font-bold tracking-tight text-lumi-text">{metric.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-7">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lumi-cyan/80">
          Care Priorities
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {routinePriorities.map((item) => (
            <PriorityPill key={item.title} item={item} />
          ))}
        </div>
      </div>

      <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
        <p className="text-sm leading-6 text-lumi-secondary">
          Zone insights suggest focusing on cheek hydration, T-zone balance and under-eye brightness.
        </p>
        <p className="mt-3 text-sm leading-6 text-lumi-muted">
          区域观察提示可重点关注脸颊补水、T 区水油平衡和眼周暗沉管理。
        </p>
      </div>

      <RoutineFlow />
    </GlowCard>
  );
}

function RoutineCard({ routine }) {
  const Icon = iconMap[routine.iconName] || Sparkles;
  const accent = accentMap[routine.accent] || accentMap.cyan;

  return (
    <GlowCard
      className="routine-card flex min-h-full flex-col p-5 sm:p-6"
      style={{ '--routine-accent': accent.rgb }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className={cn('flex size-11 shrink-0 items-center justify-center rounded-full border', accent.border, accent.bg, accent.text)}>
          <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
        </div>
        <span
          className={cn(
            'rounded-full border bg-white/[0.035] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em]',
            accent.border,
            accent.text,
          )}
        >
          {routine.priority}
        </span>
      </div>

      <div className="mt-6">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-lumi-muted">{routine.zhTitle}</p>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-lumi-text">{routine.title}</h3>
        <p className="mt-4 text-sm leading-6 text-lumi-secondary">{routine.description}</p>
      </div>

      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lumi-cyan/80">Routine Steps</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {routine.steps.map((step) => (
            <span
              key={step}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-lumi-secondary"
            >
              {step}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 flex-1 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <p className="text-sm leading-6 text-lumi-secondary">{routine.reason}</p>
        <p className="mt-3 text-sm leading-6 text-lumi-muted">{routine.zhReason}</p>
      </div>

      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lumi-muted">Focus Metrics</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {routine.focus.map((focus) => (
            <span
              key={focus}
              className={cn(
                'rounded-full border px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em]',
                accent.border,
                accent.text,
              )}
            >
              {focus}
            </span>
          ))}
        </div>
      </div>
    </GlowCard>
  );
}

function RoutineCTA() {
  return (
    <GlowCard className="routine-cta mt-8 p-6 md:p-7" hoverable={false}>
      <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <div className="mb-4 flex size-11 items-center justify-center rounded-full border border-lumi-cyan/20 bg-lumi-cyan/10 text-lumi-cyan">
            <ShieldCheck size={20} strokeWidth={1.8} aria-hidden="true" />
          </div>
          <h3 className="text-2xl font-semibold tracking-tight text-lumi-text">
            Ready to understand the science behind your routine?
          </h3>
          <p className="mt-3 text-sm leading-6 text-lumi-secondary md:text-base">
            接下来了解 LumiDerm AI 如何通过视觉智能和推荐引擎生成护理方向。
          </p>
        </div>
        <GradientButton href="#technology" variant="secondary" size="lg" icon={ArrowRight}>
          Explore Technology
        </GradientButton>
      </div>
    </GlowCard>
  );
}

export default function PersonalizedRoutine({ className = '' }) {
  return (
    <MotionSection id="personalization" data-module="personalized-routine" className={cn('section-spacing', className)}>
      <Container>
        <SectionTitle
          eyebrow="PERSONALIZED BEAUTY ROUTINE"
          title="Personalized Routine, Generated By AI"
          subtitle="根据模拟肌肤评分、区域观察和护理优先级，LumiDerm AI 生成更适合你的晨间、夜间和每周护理方向。"
          align="center"
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <motion.div variants={cardReveal}>
            <RoutineSummary />
          </motion.div>
          <motion.div className="grid gap-4 md:grid-cols-2" variants={staggerContainer}>
            {routineData.map((routine) => (
              <motion.div key={routine.id} variants={cardReveal} className="min-h-full">
                <RoutineCard routine={routine} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <RoutineCTA />
      </Container>
    </MotionSection>
  );
}
