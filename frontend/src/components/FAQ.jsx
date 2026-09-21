import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Container from './common/Container.jsx';
import MotionSection from './common/MotionSection.jsx';
import SectionTitle from './common/SectionTitle.jsx';
import { faqData } from '../data/faqData.js';
import { cn } from '../lib/utils.js';

function FAQItem({ item, isOpen, onToggle }) {
  const answerId = `faq-answer-${item.id}`;
  const questionId = `faq-question-${item.id}`;

  return (
    <div className={cn('faq-item-v2', isOpen && 'is-open')}>
      <h3>
        <button
          id={questionId}
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={answerId}
        >
          <span>{item.question}</span>
          <i aria-hidden="true"><ChevronDown size={18} strokeWidth={1.8} /></i>
        </button>
      </h3>
      <div
        id={answerId}
        className="faq-answer-v2"
        role="region"
        aria-labelledby={questionId}
        aria-hidden={!isOpen}
      >
        <div><p>{item.answer}</p></div>
      </div>
    </div>
  );
}

export default function FAQ({ className = '', items = faqData }) {
  const safeItems = Array.isArray(items) ? items.filter((item) => item?.id && item?.question && item?.answer) : [];
  const [openId, setOpenId] = useState(safeItems[0]?.id || null);

  return (
    <MotionSection id="faq" data-module="faq" className={cn('faq-section-v2 section-spacing', className)}>
      <Container>
        <SectionTitle
          eyebrow="常见问题"
          title="关于分析、照片与护理建议"
          subtitle="了解 LumiDerm AI 当前原型的工作方式、数据处理范围与美容护肤边界。"
          className="faq-title-v2"
        />

        {safeItems.length ? (
          <div className="faq-list-v2">
            {safeItems.map((item) => (
              <FAQItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => setOpenId(openId === item.id ? null : item.id)}
              />
            ))}
          </div>
        ) : <p className="conversion-empty-state">暂未提供常见问题说明</p>}
      </Container>
    </MotionSection>
  );
}
