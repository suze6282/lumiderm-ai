import { ArrowRight, Focus, ShieldCheck, Sparkles } from 'lucide-react';
import GradientButton from '../common/GradientButton.jsx';

function MetricNames({ metrics }) {
  return (
    <div className="intelligence-highlight-names">
      {metrics.map((metric) => <span key={metric.id}>{metric.label}</span>)}
    </div>
  );
}

export default function SkinInsightSummary({ focusMetrics, strengthMetrics, careDirections }) {
  const directions = careDirections.map((label) => ({ id: label, label }));

  return (
    <div className="intelligence-summary-panel">
      <div className="intelligence-summary-grid">
        <section aria-labelledby="focus-metrics-title">
          <span className="intelligence-summary-icon is-focus"><Focus size={19} aria-hidden="true" /></span>
          <p>护理重点</p>
          <h3 id="focus-metrics-title">建议优先关注</h3>
          <MetricNames metrics={focusMetrics} />
          <small>根据护理表现值相对较低的项目生成，仅用于美容护理参考。</small>
        </section>

        <section aria-labelledby="strength-metrics-title">
          <span className="intelligence-summary-icon"><Sparkles size={19} aria-hidden="true" /></span>
          <p>当前优势</p>
          <h3 id="strength-metrics-title">值得继续保持</h3>
          <MetricNames metrics={strengthMetrics} />
          <small>根据护理表现值相对较高的项目生成，帮助理解当前稳定维度。</small>
        </section>

        <section aria-labelledby="care-direction-title">
          <span className="intelligence-summary-icon"><ShieldCheck size={19} aria-hidden="true" /></span>
          <p>AI 护理方向</p>
          <h3 id="care-direction-title">温和、稳定、持续</h3>
          <MetricNames metrics={directions} />
          <small>护理建议不替代专业医疗意见，请根据实际肤感合理调整。</small>
        </section>
      </div>

      <div className="intelligence-summary-actions">
        <GradientButton href="#face-mapping" variant="secondary" icon={ArrowRight}>查看面部区域分析</GradientButton>
        <GradientButton href="#personalization" icon={ArrowRight}>查看个性化护理方案</GradientButton>
      </div>
    </div>
  );
}
