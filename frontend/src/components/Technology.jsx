import { m as motion } from 'framer-motion';
import {
  ChartNoAxesCombined,
  Eye,
  ListChecks,
  ScanFace,
  Sparkles,
} from 'lucide-react';
import Container from './common/Container.jsx';
import MotionSection from './common/MotionSection.jsx';
import SectionTitle from './common/SectionTitle.jsx';
import TechnologyPipeline from './technology/TechnologyPipeline.jsx';
import {
  technologyBoundary,
  technologyFeatures,
  technologyFlow,
} from '../data/technologyFeatures.js';
import { cardReveal, staggerContainer } from '../lib/motion.js';
import { cn } from '../lib/utils.js';

const iconMap = {
  ChartNoAxesCombined,
  Eye,
  ListChecks,
  ScanFace,
  Sparkles,
};

function TechnologyFeature({ item }) {
  const Icon = iconMap[item.iconName] || Sparkles;
  return (
    <article className="technology-capability">
      <span aria-hidden="true"><Icon size={20} strokeWidth={1.7} /></span>
      <div>
        <h3>{item.title}</h3>
        {item.description ? <p>{item.description}</p> : null}
      </div>
    </article>
  );
}

export default function Technology({
  className = '',
  flow = technologyFlow,
  features = technologyFeatures,
}) {
  const safeFeatures = Array.isArray(features) ? features.filter((item) => item?.id && item?.title) : [];

  return (
    <MotionSection id="technology" data-module="technology" className={cn('technology-section-v2 section-spacing', className)}>
      <Container>
        <SectionTitle
          eyebrow="核心技术"
          title="从一张照片，到一套可理解的肌肤洞察"
          subtitle="LumiDerm AI 将图像输入、面部分区和多维肌肤指标组织为更直观的美容护理信息。"
          className="technology-title-v2"
        />

        <div className="technology-shell-v2">
          <TechnologyPipeline steps={flow} boundary={technologyBoundary} />

          <div className="technology-capabilities-heading">
            <div>
              <span>核心能力</span>
              <h3>技术服务于理解，而不是制造复杂感</h3>
            </div>
            <p>所有能力都围绕模拟分析、信息解释和美容护理方向展开。</p>
          </div>

          {safeFeatures.length ? (
            <motion.div className="technology-capabilities" variants={staggerContainer}>
              {safeFeatures.slice(0, 4).map((item) => (
                <motion.div key={item.id} variants={cardReveal}><TechnologyFeature item={item} /></motion.div>
              ))}
            </motion.div>
          ) : null}
        </div>
      </Container>
    </MotionSection>
  );
}
