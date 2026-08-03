import {
  motion,
} from 'framer-motion';
import {
  CircleDot,
  Droplets,
  Eye,
  Gauge,
  Palette,
  ScanSearch,
  Sparkles,
  Waves,
} from 'lucide-react';
import Container from './common/Container.jsx';
import GlowCard from './common/GlowCard.jsx';
import MotionSection from './common/MotionSection.jsx';
import SectionTitle from './common/SectionTitle.jsx';
import { skinMetrics } from '../data/skinMetrics.js';
import { cardReveal, staggerContainer } from '../lib/motion.js';
import { cn } from '../lib/utils.js';

const iconMap = {
  CircleDot,
  Droplets,
  Eye,
  Gauge,
  Palette,
  ScanSearch,
  Sparkles,
  Waves,
};

const accentMap = {
  cyan: {
    rgb: '95, 255, 224',
    icon: 'text-lumi-cyan',
    pill: 'border-lumi-cyan/25 bg-lumi-cyan/10 text-lumi-cyan',
  },
  violet: {
    rgb: '155, 92, 255',
    icon: 'text-lumi-violet',
    pill: 'border-lumi-violet/25 bg-lumi-violet/10 text-lumi-violet',
  },
  magenta: {
    rgb: '255, 79, 216',
    icon: 'text-lumi-magenta',
    pill: 'border-lumi-magenta/25 bg-lumi-magenta/10 text-lumi-magenta',
  },
  rose: {
    rgb: '255, 107, 158',
    icon: 'text-lumi-rose',
    pill: 'border-lumi-rose/25 bg-lumi-rose/10 text-lumi-rose',
  },
  blue: {
    rgb: '76, 201, 240',
    icon: 'text-lumi-blue',
    pill: 'border-lumi-blue/25 bg-lumi-blue/10 text-lumi-blue',
  },
  green: {
    rgb: '95, 255, 224',
    icon: 'text-lumi-cyan',
    pill: 'border-lumi-cyan/25 bg-lumi-cyan/10 text-lumi-cyan',
  },
};

const summaryItems = [
  {
    title: 'Visual Skin Report',
    zhTitle: '可视化肌肤状态报告',
    iconName: 'ScanSearch',
  },
  {
    title: 'Care Priority',
    zhTitle: '自动识别护理优先级',
    iconName: 'Gauge',
  },
  {
    title: 'Routine Direction',
    zhTitle: '生成个性化护理方向',
    iconName: 'Sparkles',
  },
];

function MetricProgress({ value }) {
  return (
    <div className="metric-progress-track" aria-hidden="true">
      <span className="metric-progress-fill" style={{ '--metric-value': `${value}%` }} />
    </div>
  );
}

function MetricCard({ metric }) {
  const Icon = iconMap[metric.iconName] || Sparkles;
  const accent = accentMap[metric.accent] || accentMap.cyan;

  return (
    <GlowCard
      className="metric-card flex min-h-full flex-col p-5 sm:p-6"
      style={{ '--metric-accent': accent.rgb }}
    >
      <div className="flex items-start justify-between gap-4">
        <div
          className={cn(
            'metric-icon flex size-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.045]',
            accent.icon,
          )}
        >
          <Icon size={21} strokeWidth={1.8} aria-hidden="true" />
        </div>
        <div className="min-w-0 text-right">
          <p className="font-display text-3xl font-bold leading-none tracking-tight text-lumi-text">
            {metric.value}
            <span className="ml-1 text-base font-semibold text-lumi-secondary">{metric.unit}</span>
          </p>
          <span
            className={cn(
              'mt-3 inline-flex max-w-full items-center rounded-full border px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em]',
              accent.pill,
            )}
          >
            {metric.status}
          </span>
        </div>
      </div>

      <div className="mt-7 flex-1">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-lumi-muted">{metric.zhTitle}</p>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-lumi-text">{metric.title}</h3>
        <p className="mt-4 text-sm leading-6 text-lumi-secondary">{metric.description}</p>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between gap-4 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-lumi-muted">
          <span>Simulated score</span>
          <span className="text-lumi-secondary">
            {metric.value}
            {metric.unit}
          </span>
        </div>
        <MetricProgress value={metric.value} />
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-lumi-cyan/80">
          Care Hint
        </p>
        <p className="mt-2 text-sm leading-6 text-lumi-secondary">{metric.insight}</p>
      </div>
    </GlowCard>
  );
}

function MetricsSummary() {
  return (
    <GlowCard className="metrics-summary mt-8 p-6 md:p-7" hoverable={false}>
      <div className="grid gap-7 lg:grid-cols-[1.05fr_1.45fr] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-lumi-cyan/80">
            Next layer
          </p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-lumi-text md:text-3xl">
            From Metrics To Personalized Care
          </h3>
          <p className="mt-4 text-sm leading-7 text-lumi-secondary md:text-base">
            这些模拟指标会作为后续护肤方案生成的参考，帮助用户理解不同肌肤状态对应的护理方向。
            不同维度也可以继续映射到额头、脸颊、鼻翼、眼周和下巴等区域。
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {summaryItems.map((item) => {
            const Icon = iconMap[item.iconName] || Sparkles;
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"
              >
                <div className="flex size-10 items-center justify-center rounded-full border border-lumi-cyan/20 bg-lumi-cyan/10 text-lumi-cyan">
                  <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
                </div>
                <p className="mt-4 text-sm font-semibold text-lumi-text">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-lumi-secondary">{item.zhTitle}</p>
              </div>
            );
          })}
        </div>
      </div>
    </GlowCard>
  );
}

export default function AnalysisMetrics({ className = '' }) {
  return (
    <MotionSection id="skin-metrics" data-module="analysis-metrics" className={cn('section-spacing', className)}>
      <Container>
        <SectionTitle
          eyebrow="SKIN ANALYSIS METRICS"
          title="8-Dimensional Skin Intelligence"
          subtitle="从肤质纹理、水油状态到肤色均匀度，LumiDerm AI 以多维指标模拟理解你的肌肤状态。"
          align="center"
        />

        <motion.div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" variants={staggerContainer}>
          {skinMetrics.map((metric) => (
            <motion.div key={metric.id} variants={cardReveal} className="min-h-full">
              <MetricCard metric={metric} />
            </motion.div>
          ))}
        </motion.div>

        <MetricsSummary />
      </Container>
    </MotionSection>
  );
}
