import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Container from './common/Container.jsx';
import GlowCard from './common/GlowCard.jsx';
import MotionSection from './common/MotionSection.jsx';
import SectionTitle from './common/SectionTitle.jsx';
import { faqData } from '../data/faqData.js';
import { cn } from '../lib/utils.js';

function FAQItem({ item, isOpen, onToggle }) {
  const answerId = `faq-answer-${item.id}`;

  return (
    <div className={cn('faq-item border-b border-white/10 last:border-b-0', isOpen && 'is-open')}>
      <button
        type="button"
        className="flex w-full items-center justify-between gap-5 py-5 text-left"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={answerId}
      >
        <span className="text-base font-semibold text-lumi-text sm:text-lg">{item.question}</span>
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.035] text-lumi-secondary">
          <ChevronDown className={cn('transition duration-300', isOpen && 'rotate-180 text-lumi-cyan')} size={18} aria-hidden="true" />
        </span>
      </button>
      <div
        id={answerId}
        className={cn('faq-answer grid transition-all duration-300', isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0')}
      >
        <div className="overflow-hidden">
          <div className="pb-6 pr-12">
            <p className="text-sm leading-6 text-lumi-secondary">{item.answer}</p>
            <p className="mt-3 text-sm leading-6 text-lumi-muted">{item.zhAnswer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQ({ className = '' }) {
  const [openId, setOpenId] = useState(faqData[0]?.id);

  return (
    <MotionSection id="faq" data-module="faq" className={cn('section-spacing', className)}>
      <Container>
        <SectionTitle
          eyebrow="QUESTIONS & CLARITY"
          title="Frequently Asked Questions"
          subtitle="关于 LumiDerm AI 的产品定位、模拟分析范围、数据使用和适用场景。"
          align="center"
        />

        <GlowCard className="mx-auto mt-12 max-w-4xl p-5 sm:p-6" hoverable={false}>
          {faqData.map((item) => (
            <FAQItem
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => setOpenId(openId === item.id ? null : item.id)}
            />
          ))}
        </GlowCard>
      </Container>
    </MotionSection>
  );
}
