import { useId, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, Moon, SunMedium } from 'lucide-react';
import GlowCard from '../common/GlowCard.jsx';
import { motionDuration, motionEase } from '../../lib/motion.js';
import { cn } from '../../lib/utils.js';

const pathIcons = {
  morning: SunMedium,
  evening: Moon,
};

function getUniqueSteps(steps) {
  if (!Array.isArray(steps)) return [];
  const seen = new Set();
  return steps.filter((step) => {
    if (!step?.title) return false;
    const key = step.title.trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function toDomId(value) {
  return String(value).replace(/[^a-zA-Z0-9_-]/g, '-');
}

export default function RoutineTimeline({ routine, type }) {
  const shouldReduceMotion = useReducedMotion();
  const instanceId = useId().replace(/:/g, '');
  const [expandedStepId, setExpandedStepId] = useState(null);
  const steps = getUniqueSteps(routine?.steps);
  const Icon = pathIcons[type] || SunMedium;
  const title = routine?.title || (type === 'evening' ? '晚间护理' : '早间护理');
  const headingId = `routine-${type}-${instanceId}`;

  return (
    <GlowCard className={cn('routine-path', `routine-path--${type}`)} variant="default" hoverable={false}>
      <div className="routine-path-heading">
        <span className="routine-path-icon" aria-hidden="true"><Icon size={20} /></span>
        <div>
          <h3 id={headingId}>{title}</h3>
          <p>{routine?.timing || '暂无具体时间建议'}</p>
        </div>
      </div>
      {routine?.description ? <p className="routine-path-description">{routine.description}</p> : null}

      {steps.length ? (
        <ol className="routine-timeline" aria-labelledby={headingId}>
          {steps.map((step, index) => {
            const stepKey = step.id || step.title;
            const isExpanded = expandedStepId === stepKey;
            const panelId = `routine-step-${instanceId}-${toDomId(stepKey)}`;
            return (
              <li key={stepKey} className="routine-timeline-item">
                <span className="routine-step-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <div className="routine-step-content">
                  <button
                    type="button"
                    className="routine-step-trigger"
                    aria-expanded={isExpanded}
                    aria-controls={panelId}
                    onClick={() => setExpandedStepId(isExpanded ? null : stepKey)}
                  >
                    <span>
                      <strong>{step.title}</strong>
                      {step.summary ? <small>{step.summary}</small> : null}
                    </span>
                    <ChevronDown size={17} aria-hidden="true" />
                  </button>
                  <AnimatePresence initial={false}>
                    {isExpanded ? (
                      <motion.div
                        id={panelId}
                        className="routine-step-detail"
                        initial={shouldReduceMotion ? false : { opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={shouldReduceMotion ? undefined : { opacity: 0, height: 0 }}
                        transition={{ duration: shouldReduceMotion ? 0 : motionDuration.fast, ease: motionEase }}
                      >
                        {step.detail ? <p>{step.detail}</p> : <p>暂无更多使用提示。</p>}
                        {step.ingredient ? <span>建议关注：{step.ingredient}</span> : null}
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </li>
            );
          })}
        </ol>
      ) : (
        <div className="routine-path-empty">暂无{type === 'evening' ? '晚间' : '早间'}护理方案</div>
      )}
    </GlowCard>
  );
}
