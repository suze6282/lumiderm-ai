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
    <MotionSection id="product" data-module="product-intro" className={cn('section-spacing', className)}>
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionTitle
            title="Your Skin, Reimagined By AI"
            subtitle="LumiDerm AI 通过图像智能分析肌肤状态，生成可视化评分报告和个性化护肤建议。"
          />
          <p className="body-copy text-lg">
            The platform turns visible skin signals into a guided cosmetic analysis flow: scan the face, read the report, then translate insights into a practical beauty routine.
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
                  <p className="mt-1 text-sm text-lumi-secondary">{step.zhTitle}</p>
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
