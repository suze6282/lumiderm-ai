import { motion } from 'framer-motion';
import { Radar, ScanFace, Sparkles } from 'lucide-react';
import Container from './common/Container.jsx';
import GlowCard from './common/GlowCard.jsx';
import MotionSection from './common/MotionSection.jsx';
import SectionTitle from './common/SectionTitle.jsx';
import { productSteps } from '../data/productSteps.js';
import { cardReveal, staggerContainer } from '../lib/motion.js';
import { cn } from '../lib/utils.js';

const iconMap = {
  Radar,
  ScanFace,
  Sparkles,
};

export default function ProductIntro({ className = '' }) {
  return (
    <MotionSection id="product" data-module="product-intro" className={cn('product-intro-section section-spacing', className)}>
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionTitle
            eyebrow="产品流程"
            title="从肌肤检测，到个性化护理"
            subtitle="LumiDerm AI 将照片输入、模拟分析与护理建议整理成清晰易懂的三步体验。"
          />
          <p className="body-copy text-lg">
            从一张清晰的正面照片开始，了解整体肌肤状态与局部护理重点，再查看适合日常执行的个性化护理方案。
          </p>
        </div>

        <motion.div className="mt-10 grid gap-4 md:grid-cols-3" variants={staggerContainer}>
          {productSteps.map((step) => {
            const Icon = iconMap[step.iconName] || Sparkles;
            return (
              <motion.div key={step.id} variants={cardReveal} className="h-full">
                <GlowCard className="h-full">
                  <div className="flex size-11 items-center justify-center rounded-full border border-lumi-line bg-white/[0.04] text-lumi-cyan">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <h3 className="mt-7 text-2xl font-semibold">{step.title}</h3>
                  <p className="mt-1 text-sm text-lumi-secondary">{step.summary}</p>
                  <p className="mt-4 text-sm leading-6 text-lumi-secondary">{step.description}</p>
                </GlowCard>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </MotionSection>
  );
}
