import { m as motion } from 'framer-motion';
import { ArrowRight, Info } from 'lucide-react';
import Container from './common/Container.jsx';
import GradientButton from './common/GradientButton.jsx';
import MotionSection from './common/MotionSection.jsx';
import SectionTitle from './common/SectionTitle.jsx';
import SkinInsightSummary from './skin/SkinInsightSummary.jsx';
import SkinMetricCard, { getMetricPerformance } from './skin/SkinMetricCard.jsx';
import SkinScoreCard from './skin/SkinScoreCard.jsx';
import {
  dashboardDisclaimer,
  dashboardInsight,
  dashboardScore,
  skinMetrics,
} from '../data/skinMetrics.js';
import { cardReveal, staggerContainer } from '../lib/motion.js';
import { cn } from '../lib/utils.js';

function getMetricHighlights(metrics) {
  const ranked = metrics
    .map((metric) => ({ ...metric, performance: getMetricPerformance(metric) }))
    .sort((left, right) => left.performance - right.performance);

  return {
    focusMetrics: ranked.slice(0, 2),
    strengthMetrics: ranked.slice(-2).reverse(),
  };
}

function EmptyDashboard() {
  return (
    <div className="intelligence-empty-state">
      <span aria-hidden="true"><Info size={22} /></span>
      <h3>暂未生成肌肤分析结果</h3>
      <p>完成一次肌肤检测后，这里将展示详细指标与护理方向。</p>
      <GradientButton href="#analysis" icon={ArrowRight}>开始肌肤检测</GradientButton>
    </div>
  );
}

export default function AnalysisMetrics({
  className = '',
  metrics = skinMetrics,
  score = dashboardScore,
  insight = dashboardInsight,
}) {
  const safeMetrics = Array.isArray(metrics) ? metrics.filter(Boolean) : [];
  const displayMetrics = [
    ...safeMetrics.filter((metric) => metric.featured),
    ...safeMetrics.filter((metric) => !metric.featured),
  ];
  const { focusMetrics, strengthMetrics } = getMetricHighlights(safeMetrics);

  return (
    <MotionSection
      id="skin-metrics"
      data-module="analysis-metrics"
      className={cn('intelligence-dashboard-section section-spacing', className)}
    >
      <Container>
        <SectionTitle
          eyebrow="肌肤智能分析"
          title="看见肌肤状态的每一个细节"
          subtitle="LumiDerm AI 从多个维度呈现模拟肌肤状态，帮助你更直观地理解当前护理重点。"
          className="intelligence-dashboard-title"
        />

        {safeMetrics.length ? (
          <>
            <div className="intelligence-dashboard-shell">
              <SkinScoreCard score={score} insight={insight} />

              <motion.div className="intelligence-metrics-grid" variants={staggerContainer}>
                {displayMetrics.map((metric) => (
                  <motion.div key={metric.id} variants={cardReveal} className={cn('intelligence-metric-slot', metric.featured && 'is-featured')}>
                    <SkinMetricCard metric={metric} />
                  </motion.div>
                ))}
              </motion.div>

              <SkinInsightSummary
                focusMetrics={focusMetrics}
                strengthMetrics={strengthMetrics}
                careDirections={insight?.careDirections || []}
              />
            </div>

            <p className="intelligence-disclaimer"><Info size={15} aria-hidden="true" />{dashboardDisclaimer}</p>
          </>
        ) : <EmptyDashboard />}
      </Container>
    </MotionSection>
  );
}
