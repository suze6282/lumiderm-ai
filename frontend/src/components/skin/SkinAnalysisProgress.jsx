import { Check, ScanFace } from 'lucide-react';
import GradientButton from '../common/GradientButton.jsx';
import { scanFlowSteps, scanProgressStages } from '../../data/skinScanDemo.js';
import { cn } from '../../lib/utils.js';

const flowStateIndex = {
  idle: 0,
  selected: 1,
  loading: 2,
  error: 2,
  success: 3,
};

export function SkinScanFlow({ state }) {
  const activeIndex = flowStateIndex[state] ?? 0;

  return (
    <ol className="skin-flow-rail" aria-label="肌肤检测流程">
      {scanFlowSteps.map((step, index) => {
        const status = index < activeIndex ? 'complete' : index === activeIndex ? 'current' : 'pending';
        return (
          <li key={step.id} className="skin-flow-step" data-status={status} aria-current={status === 'current' ? 'step' : undefined}>
            <span className="skin-flow-number">{status === 'complete' ? <Check size={14} aria-hidden="true" /> : step.number}</span>
            <span>{step.label}</span>
          </li>
        );
      })}
    </ol>
  );
}

function getActiveStageIndex(progress) {
  if (progress >= 82) return 5;
  if (progress >= 67) return 4;
  if (progress >= 48) return 3;
  if (progress >= 32) return 2;
  if (progress >= 15) return 1;
  return 0;
}

export default function SkinAnalysisProgress({ progress }) {
  const activeStageIndex = getActiveStageIndex(progress);

  return (
    <div className="skin-analysis-progress" aria-live="polite">
      <div className="skin-progress-heading">
        <span className="skin-progress-icon" aria-hidden="true"><ScanFace size={20} /></span>
        <div>
          <p className="skin-progress-kicker">AI 分析进行中</p>
          <h3>正在分析你的肌肤状态</h3>
        </div>
        <strong>{progress}%</strong>
      </div>

      <div
        className="skin-progress-track"
        role="progressbar"
        aria-label="AI 肌肤分析进度"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={progress}
      >
        <span style={{ '--scan-progress': `${progress}%` }} />
      </div>

      <ol className="skin-progress-stages">
        {scanProgressStages.map((stage, index) => {
          const status = index < activeStageIndex ? 'complete' : index === activeStageIndex ? 'current' : 'pending';
          return (
            <li key={stage.id} className={cn('skin-progress-stage', `is-${status}`)}>
              <span className="skin-progress-stage-icon" aria-hidden="true">
                {status === 'complete' ? <Check size={13} /> : null}
              </span>
              <span>{stage.label}</span>
              <span className="skin-progress-stage-status">
                {status === 'complete' ? '已完成' : status === 'current' ? '分析中' : '等待中'}
              </span>
            </li>
          );
        })}
      </ol>

      <p className="skin-progress-note">报告将在分析服务完成后生成，界面进度不会提前代表分析成功。</p>
      <GradientButton type="button" size="lg" loading className="mt-5 w-full">
        正在分析
      </GradientButton>
    </div>
  );
}
