import { useEffect, useRef } from 'react';
import { animate, m as motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { motionDuration, motionEase } from '../../lib/motion.js';
import { normalizeMetricValue } from '../../lib/metrics.js';

function AnimatedScore({ value }) {
  const target = normalizeMetricValue(value);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const shouldReduceMotion = useReducedMotion();
  const motionValue = useMotionValue(shouldReduceMotion ? target : 0);
  const roundedValue = useTransform(motionValue, (latest) => Math.round(latest));

  useEffect(() => {
    if (shouldReduceMotion) {
      motionValue.set(target);
      return undefined;
    }

    if (!isInView) return undefined;

    const controls = animate(motionValue, target, {
      duration: 0.8,
      ease: motionEase,
    });

    return () => controls.stop();
  }, [isInView, motionValue, shouldReduceMotion, target]);

  return <motion.strong ref={ref}>{roundedValue}</motion.strong>;
}

export default function SkinScoreCard({ score, insight }) {
  const value = normalizeMetricValue(score?.value);
  const ringLength = 289;
  const ringOffset = ringLength - (value / 100) * ringLength;
  const shouldReduceMotion = useReducedMotion();

  return (
    <article className="intelligence-score-card" aria-labelledby="intelligence-score-title">
      <div className="intelligence-score-heading">
        <span className="intelligence-complete-badge"><Check size={14} aria-hidden="true" />AI 模拟分析已完成</span>
        <h3 id="intelligence-score-title">综合肌肤评分</h3>
      </div>

      <div className="intelligence-score-main">
        <div className="intelligence-score-ring" role="img" aria-label={`综合肌肤评分 ${value} 分，${score?.status || '状态已生成'}`}>
          <svg viewBox="0 0 112 112" aria-hidden="true">
            <defs>
              <linearGradient id="intelligence-score-gradient" x1="18" x2="94" y1="18" y2="94">
                <stop stopColor="#b59cff" />
                <stop offset="1" stopColor="#84d4ff" />
              </linearGradient>
            </defs>
            <circle cx="56" cy="56" r="46" className="intelligence-score-ring-track" />
            <motion.circle
              cx="56"
              cy="56"
              r="46"
              className="intelligence-score-ring-value"
              strokeDasharray={ringLength}
              initial={shouldReduceMotion ? false : { strokeDashoffset: ringLength }}
              whileInView={{ strokeDashoffset: ringOffset }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: shouldReduceMotion ? 0 : motionDuration.slow, ease: motionEase }}
            />
          </svg>
          <span><AnimatedScore value={value} /><small>/100</small></span>
        </div>

        <div className="intelligence-score-copy">
          <span className="intelligence-status-badge">{score?.status || '状态已生成'}</span>
          <p>{score?.summary}</p>
        </div>
      </div>

      <div className="intelligence-score-insight">
        <Sparkles size={18} aria-hidden="true" />
        <div>
          <h4>{insight?.title || 'AI 肌肤状态总结'}</h4>
          <p>{insight?.content}</p>
        </div>
      </div>
    </article>
  );
}
