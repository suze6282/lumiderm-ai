import { m as motion } from 'framer-motion';
import { Check, Info } from 'lucide-react';
import Container from './common/Container.jsx';
import GlowCard from './common/GlowCard.jsx';
import GradientButton from './common/GradientButton.jsx';
import MotionSection from './common/MotionSection.jsx';
import SectionTitle from './common/SectionTitle.jsx';
import { pricingPlans } from '../data/pricingPlans.js';
import { cardReveal, staggerContainer } from '../lib/motion.js';
import { cn } from '../lib/utils.js';

function FeatureList({ features = [] }) {
  return (
    <ul className="pricing-feature-list">
      {features.slice(0, 6).map((feature) => (
        <li key={feature}>
          <span aria-hidden="true"><Check size={13} strokeWidth={2.2} /></span>
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
}

function PricingCard({ plan }) {
  return (
    <GlowCard
      className={cn('pricing-card-v2', plan.highlighted && 'is-recommended')}
      variant={plan.highlighted ? 'elevated' : 'default'}
      data-accent={plan.accent || 'lavender'}
    >
      <div className="pricing-card-header">
        <div>
          <p>{plan.audience}</p>
          <h3>{plan.name}</h3>
        </div>
        {plan.badge ? <span className="pricing-recommendation">{plan.badge}</span> : null}
      </div>

      <div className="pricing-availability">
        <strong>{plan.availability}</strong>
        <span>产品原型展示</span>
      </div>

      <p className="pricing-description">{plan.description}</p>
      <FeatureList features={plan.features} />

      <div className="pricing-card-footer">
        <p>{plan.note}</p>
        <GradientButton
          className="pricing-cta"
          href={plan.ctaHref || '#analysis'}
          variant={plan.highlighted ? 'primary' : 'secondary'}
        >
          {plan.cta || '开始肌肤检测'}
        </GradientButton>
      </div>
    </GlowCard>
  );
}

export default function Pricing({ className = '', plans = pricingPlans }) {
  const safePlans = Array.isArray(plans) ? plans.filter((plan) => plan?.id && plan?.name).slice(0, 3) : [];

  return (
    <MotionSection id="pricing" data-module="pricing" className={cn('pricing-section-v2 section-spacing', className)}>
      <Container>
        <SectionTitle
          align="center"
          eyebrow="体验方案"
          title="选择适合你的 LumiDerm AI 体验方式"
          subtitle="从基础肌肤分析到更完整的个性化护理流程，以下方案用于产品原型体验展示，不代表已上线的商业订阅。"
          className="pricing-title-v2"
        />

        {safePlans.length ? (
          <motion.div className="pricing-grid-v2" variants={staggerContainer}>
            {safePlans.map((plan) => (
              <motion.article key={plan.id} variants={cardReveal} className="pricing-card-slot">
                <PricingCard plan={plan} />
              </motion.article>
            ))}
          </motion.div>
        ) : <p className="conversion-empty-state">暂未提供体验方案说明</p>}

        <p className="pricing-truth-note">
          <Info size={16} aria-hidden="true" />
          当前项目没有支付、订阅或会员权限系统；所有按钮均进入同一肌肤检测体验。
        </p>
      </Container>
    </MotionSection>
  );
}
