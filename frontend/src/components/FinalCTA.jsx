import { ArrowRight, ArrowUp } from 'lucide-react';
import Container from './common/Container.jsx';
import GradientButton from './common/GradientButton.jsx';
import MotionSection from './common/MotionSection.jsx';
import { cn } from '../lib/utils.js';

export default function FinalCTA({ className = '' }) {
  return (
    <MotionSection id="final-cta" data-module="final-cta" className={cn('final-cta-section-v2 section-spacing', className)}>
      <Container>
        <div className="final-cta-panel-v2">
          <div className="final-cta-copy">
            <p className="final-cta-eyebrow">从了解肌肤开始</p>
            <h2>现在，看看你的肌肤正在告诉你什么</h2>
            <p>上传一张清晰的正面照片，体验 LumiDerm AI 的模拟肌肤分析与个性化护理流程。</p>
          </div>

          <div className="final-cta-actions">
            <GradientButton href="#analysis" size="lg" icon={ArrowRight}>开始肌肤检测</GradientButton>
            <GradientButton href="#home" variant="secondary" size="lg" icon={ArrowUp}>返回顶部</GradientButton>
          </div>
        </div>
      </Container>
    </MotionSection>
  );
}
