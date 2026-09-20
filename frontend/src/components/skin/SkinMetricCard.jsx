import { motion, useReducedMotion } from 'framer-motion';
import { CircleDot, Droplets, Eye, Gauge, Palette, ScanSearch, Sparkles, Waves } from 'lucide-react';
import { metricStatusMap } from '../../data/skinMetrics.js';
import { motionDuration, motionEase } from '../../lib/motion.js';
import { cn } from '../../lib/utils.js';
import { normalizeMetricValue } from './SkinScoreCard.jsx';

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

export function getMetricPerformance(metric) {
  const value = normalizeMetricValue(metric?.value);
  return metric?.direction === 'lower-better' ? 100 - value : value;
}

function MetricBar({ label, value }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className="intelligence-metric-bar"
      role="progressbar"
      aria-label={`${label} ${value}%`}
      aria-valuemin="0"
      aria-valuemax="100"
      aria-valuenow={value}
    >
      <motion.span
        style={{ '--metric-value': `${value}%` }}
        initial={shouldReduceMotion ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.55 }}
        transition={{ duration: shouldReduceMotion ? 0 : motionDuration.slow, ease: motionEase }}
      />
    </div>
  );
}

function MetricRing({ label, value }) {
  return (
    <div
      className="intelligence-metric-ring"
      style={{ '--metric-value': `${value * 3.6}deg` }}
      role="img"
      aria-label={`${label} ${value}%`}
    >
      <span>{value}<small>%</small></span>
    </div>
  );
}

export default function SkinMetricCard({ metric }) {
  const value = normalizeMetricValue(metric?.value);
  const Icon = iconMap[metric?.iconName] || Sparkles;
  const status = metricStatusMap[metric?.status] || '状态已生成';
  const isFeatured = Boolean(metric?.featured);

  return (
    <article className={cn('intelligence-metric-card', isFeatured && 'is-featured')}>
      <div className="intelligence-metric-card-head">
        <span className="intelligence-metric-icon"><Icon size={19} strokeWidth={1.7} aria-hidden="true" /></span>
        <span className="intelligence-metric-status">{status}</span>
      </div>

      <div className="intelligence-metric-content">
        <div>
          <h3>{metric?.label || '肌肤指标'}</h3>
          <p className="intelligence-metric-description">{metric?.description || '该项指标已完成模拟分析。'}</p>
        </div>
        {isFeatured ? <MetricRing label={metric?.label} value={value} /> : (
          <strong className="intelligence-metric-value">{value}<small>{metric?.unit || '%'}</small></strong>
        )}
      </div>

      {!isFeatured ? <MetricBar label={metric?.label} value={value} /> : null}
      <p className="intelligence-metric-insight">{metric?.insight || '建议结合日常肤感持续观察护理效果。'}</p>
    </article>
  );
}
