import { ShieldCheck, Sparkles } from 'lucide-react';
import GlowCard from '../common/GlowCard.jsx';

export default function RoutineOverview({ overview, priorities = [] }) {
  const safePriorities = Array.isArray(priorities) ? priorities.filter((item) => item?.id && item?.title) : [];

  return (
    <GlowCard className="routine-overview" variant="glass" hoverable={false}>
      <div className="routine-overview-heading">
        <div>
          <span className="routine-complete-status"><ShieldCheck size={15} aria-hidden="true" />{overview?.status || '护理方案已生成'}</span>
          <h3>{overview?.title || '个性化护理方案'}</h3>
          <p>{overview?.basis || '根据当前肌肤状态与护理重点生成。'}</p>
        </div>
        <span className="routine-overview-icon" aria-hidden="true"><Sparkles size={22} /></span>
      </div>

      {safePriorities.length ? (
        <div className="routine-priority-list" aria-label="当前护理重点">
          {safePriorities.slice(0, 3).map((item) => (
            <article key={item.id} className="routine-priority-item">
              <span>{item.order || '护理重点'}</span>
              <h4>{item.title}</h4>
              {item.description ? <p>{item.description}</p> : null}
            </article>
          ))}
        </div>
      ) : null}

      <div className="routine-ai-recommendation">
        <Sparkles size={18} aria-hidden="true" />
        <div>
          <h4>{overview?.recommendationTitle || 'AI 护理建议'}</h4>
          <p>{overview?.recommendation || '建议优先保持温和、稳定且可持续的基础护理。'}</p>
        </div>
      </div>
    </GlowCard>
  );
}
