import { motion } from 'framer-motion';
import { ListChecks, ScanFace, SlidersHorizontal, Sparkles } from 'lucide-react';
import Container from './common/Container.jsx';
import MotionSection from './common/MotionSection.jsx';
import SectionTitle from './common/SectionTitle.jsx';
import { useCases } from '../data/useCases.js';
import { cardReveal, staggerContainer } from '../lib/motion.js';
import { cn } from '../lib/utils.js';

const iconMap = {
  ListChecks,
  ScanFace,
  SlidersHorizontal,
  Sparkles,
};

function UseCaseCard({ item }) {
  const Icon = iconMap[item.iconName] || Sparkles;
  return (
    <article className={cn('use-case-card-v2', item.featured && 'is-featured', item.wide && 'is-wide')}>
      <div className="use-case-card-heading">
        <span aria-hidden="true"><Icon size={21} strokeWidth={1.7} /></span>
        <h3>{item.title}</h3>
      </div>
      {item.question ? <p className="use-case-question">“{item.question}”</p> : null}
      <div className="use-case-value">
        <span>LumiDerm AI 提供</span>
        <p>{item.value || '将肌肤信息整理成更容易理解的美容护理参考。'}</p>
      </div>
      {Array.isArray(item.signals) && item.signals.length ? (
        <ul className="use-case-signals" aria-label="相关观察维度">
          {item.signals.map((signal) => <li key={signal}>{signal}</li>)}
        </ul>
      ) : null}
    </article>
  );
}

export default function UseCases({ className = '', items = useCases }) {
  const safeItems = Array.isArray(items) ? items.filter((item) => item?.id && item?.title).slice(0, 4) : [];

  return (
    <MotionSection id="use-cases" data-module="use-cases" className={cn('use-cases-section-v2 section-spacing', className)}>
      <Container>
        <SectionTitle
          eyebrow="应用场景"
          title="让肌肤分析进入日常护理"
          subtitle="从一次肌肤状态了解，到持续优化护理方向，LumiDerm AI 将复杂信息转化为更容易行动的建议。"
          className="use-cases-title-v2"
        />

        {safeItems.length ? (
          <motion.div className="use-cases-grid-v2" variants={staggerContainer}>
            {safeItems.map((item) => (
              <motion.div key={item.id} variants={cardReveal} className={cn('use-case-slot', item.featured && 'is-featured', item.wide && 'is-wide')}>
                <UseCaseCard item={item} />
              </motion.div>
            ))}
          </motion.div>
        ) : <p className="use-cases-empty-state">暂未生成应用场景说明</p>}
      </Container>
    </MotionSection>
  );
}
