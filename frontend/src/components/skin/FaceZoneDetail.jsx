import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Info, Sparkles } from 'lucide-react';
import GradientButton from '../common/GradientButton.jsx';
import { isMetricValueAvailable, normalizeMetricValue } from '../../lib/metrics.js';
import { motionDuration, motionEase } from '../../lib/motion.js';

export default function FaceZoneDetail({ zone, disclaimer }) {
  const shouldReduceMotion = useReducedMotion();
  const hasValue = isMetricValueAvailable(zone?.value);
  const value = hasValue ? normalizeMetricValue(zone.value) : null;

  return (
    <aside className="face-zone-detail" aria-live="polite" aria-atomic="true">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={zone?.id || 'empty'}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: shouldReduceMotion ? 0 : motionDuration.fast, ease: motionEase }}
        >
          <p className="face-zone-detail-kicker">当前分析区域</p>
          <div className="face-zone-detail-heading">
            <div>
              <h3>{zone?.label || '区域详情'}</h3>
              <p>{zone?.metricLabel || '局部肌肤指标'}</p>
            </div>
            <span className="face-zone-status">{zone?.status || '状态已生成'}</span>
          </div>

          <div className="face-zone-value-block">
            <div className="face-zone-value-copy">
              <span>当前指标值</span>
              {hasValue ? <strong>{value}<small>{zone?.unit || '%'}</small></strong> : <strong className="is-missing">暂无数据</strong>}
              {zone?.supportingMetric ? <small>{zone.supportingMetric}</small> : null}
            </div>
            {hasValue ? (
              <div
                className="face-zone-value-bar"
                role="progressbar"
                aria-label={`${zone.label}${zone.metricLabel} ${value}${zone.unit || '%'}`}
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={value}
              >
                <motion.span
                  style={{ '--zone-value': `${value}%` }}
                  initial={shouldReduceMotion ? false : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: shouldReduceMotion ? 0 : motionDuration.normal, ease: motionEase }}
                />
              </div>
            ) : null}
          </div>

          <div className="face-zone-detail-section">
            <span>关注重点</span>
            <div className="face-zone-focus-list">
              {(zone?.focus?.length ? zone.focus : ['局部肌肤状态']).map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>

          <div className="face-zone-detail-section">
            <span>AI 分析说明</span>
            <p>{zone?.description || '该区域已完成模拟分析，暂未生成更详细的局部说明。'}</p>
          </div>

          <div className="face-zone-recommendation">
            <Sparkles size={17} aria-hidden="true" />
            <div>
              <span>护理建议</span>
              <p>{zone?.recommendation || '建议结合日常肤感，以温和、稳定的方式持续护理。'}</p>
            </div>
          </div>

          <GradientButton href="#personalization" icon={ArrowRight} className="face-zone-cta">
            查看个性化护理方案
          </GradientButton>

          <p className="face-zone-disclaimer"><Info size={14} aria-hidden="true" />{disclaimer}</p>
        </motion.div>
      </AnimatePresence>
    </aside>
  );
}
