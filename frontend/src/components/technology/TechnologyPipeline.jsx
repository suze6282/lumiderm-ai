import { motion } from 'framer-motion';
import {
  ImagePlus,
  Info,
  PanelsTopLeft,
  ScanFace,
  ScanSearch,
  Sparkles,
} from 'lucide-react';
import GlowCard from '../common/GlowCard.jsx';
import { cardReveal, staggerContainer } from '../../lib/motion.js';

const iconMap = {
  ImagePlus,
  PanelsTopLeft,
  ScanFace,
  ScanSearch,
  Sparkles,
};

export default function TechnologyPipeline({ steps = [], boundary = '' }) {
  const safeSteps = Array.isArray(steps) ? steps.filter((step) => step?.id && step?.title) : [];

  return (
    <GlowCard className="technology-pipeline-panel" variant="glass" hoverable={false}>
      <div className="technology-pipeline-heading">
        <div>
          <span>模拟分析流程</span>
          <h3>让每一步都有清晰解释</h3>
        </div>
        <p>从图像输入到护理方向，信息按顺序逐步整理，不依赖难懂的工程术语。</p>
      </div>

      {safeSteps.length ? (
        <motion.ol className="technology-pipeline" variants={staggerContainer} aria-label="LumiDerm AI 模拟分析流程">
          {safeSteps.map((step, index) => {
            const Icon = iconMap[step.iconName] || Sparkles;
            return (
              <motion.li key={step.id} className="technology-pipeline-step" variants={cardReveal}>
                <div className="technology-step-meta">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <i aria-hidden="true"><Icon size={20} strokeWidth={1.7} /></i>
                </div>
                <h4>{step.title}</h4>
                {step.description ? <p>{step.description}</p> : null}
              </motion.li>
            );
          })}
        </motion.ol>
      ) : <p className="technology-empty-state">暂未生成分析流程说明</p>}

      {boundary ? <p className="technology-boundary"><Info size={15} aria-hidden="true" />{boundary}</p> : null}
    </GlowCard>
  );
}
