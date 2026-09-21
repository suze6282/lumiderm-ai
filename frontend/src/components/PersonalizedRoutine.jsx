import { motion } from 'framer-motion';
import { ArrowRight, CalendarDays, Info } from 'lucide-react';
import Container from './common/Container.jsx';
import GradientButton from './common/GradientButton.jsx';
import GlowCard from './common/GlowCard.jsx';
import MotionSection from './common/MotionSection.jsx';
import SectionTitle from './common/SectionTitle.jsx';
import IngredientFocus from './skin/IngredientFocus.jsx';
import RoutineOverview from './skin/RoutineOverview.jsx';
import RoutineTimeline from './skin/RoutineTimeline.jsx';
import {
  routineData,
  routineDisclaimer,
  routineIngredients,
  routineOverview,
  routinePriorities,
  weeklyRoutine,
} from '../data/routineData.js';
import { cardReveal, staggerContainer } from '../lib/motion.js';
import { cn } from '../lib/utils.js';

function WeeklyCare({ routine }) {
  const steps = Array.isArray(routine?.steps)
    ? routine.steps.filter((step, index, all) => step?.title && all.findIndex((item) => item?.title?.trim() === step.title.trim()) === index)
    : [];

  return (
    <GlowCard className="routine-weekly" variant="default" hoverable={false}>
      <div className="routine-support-heading">
        <span aria-hidden="true"><CalendarDays size={19} /></span>
        <div>
          <h3>{routine?.title || '每周加护'}</h3>
          <p>{routine?.timing || '根据肤感低频安排'}</p>
        </div>
      </div>
      {routine?.description ? <p className="routine-weekly-description">{routine.description}</p> : null}
      {steps.length ? (
        <ol className="routine-weekly-list">
          {steps.map((step, index) => (
            <li key={step.id || step.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div><strong>{step.title}</strong>{step.description ? <p>{step.description}</p> : null}</div>
            </li>
          ))}
        </ol>
      ) : <p className="routine-support-empty">暂无每周加护建议</p>}
    </GlowCard>
  );
}

export default function PersonalizedRoutine({
  className = '',
  routines = routineData,
  overview = routineOverview,
  priorities = routinePriorities,
  ingredients = routineIngredients,
  weekly = weeklyRoutine,
}) {
  const safeRoutines = Array.isArray(routines) ? routines.filter(Boolean) : [];
  const morningRoutine = safeRoutines.find((routine) => routine?.id === 'morning');
  const eveningRoutine = safeRoutines.find((routine) => routine?.id === 'evening');

  return (
    <MotionSection id="personalization" data-module="personalized-routine" className={cn('personalized-routine-section section-spacing', className)}>
      <Container>
        <SectionTitle
          eyebrow="AI 个性化护理方案"
          title="为你的肌肤生成专属护理方案"
          subtitle="根据当前肌肤状态与重点关注区域，LumiDerm AI 为你整理更清晰的早晚护理路径。"
          className="personalized-routine-title"
        />

        <div className="personalized-routine-shell">
          <RoutineOverview overview={overview} priorities={priorities} />

          <motion.div className="routine-path-grid" variants={staggerContainer}>
            <motion.div variants={cardReveal}><RoutineTimeline routine={morningRoutine} type="morning" /></motion.div>
            <motion.div variants={cardReveal}><RoutineTimeline routine={eveningRoutine} type="evening" /></motion.div>
          </motion.div>

          <div className="routine-support-grid">
            <WeeklyCare routine={weekly} />
            <IngredientFocus ingredients={ingredients} />
          </div>

          <div className="routine-footer">
            <p><Info size={15} aria-hidden="true" />{routineDisclaimer}</p>
            <GradientButton href="#analysis" variant="secondary" icon={ArrowRight}>重新进行肌肤检测</GradientButton>
          </div>
        </div>
      </Container>
    </MotionSection>
  );
}
