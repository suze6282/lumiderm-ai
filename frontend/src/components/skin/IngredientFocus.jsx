import { FlaskConical } from 'lucide-react';
import GlowCard from '../common/GlowCard.jsx';

function getUniqueIngredients(ingredients) {
  if (!Array.isArray(ingredients)) return [];
  const seen = new Set();
  return ingredients.filter((ingredient) => {
    if (!ingredient?.name) return false;
    const key = ingredient.name.trim();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export default function IngredientFocus({ ingredients = [] }) {
  const safeIngredients = getUniqueIngredients(ingredients);
  if (!safeIngredients.length) return null;

  return (
    <GlowCard className="routine-ingredients" variant="default" hoverable={false}>
      <div className="routine-support-heading">
        <span aria-hidden="true"><FlaskConical size={19} /></span>
        <div>
          <h3>建议关注成分</h3>
          <p>基于当前护理重点整理，不代表具体商品推荐。</p>
        </div>
      </div>
      <div className="routine-ingredient-grid">
        {safeIngredients.map((ingredient) => (
          <article key={ingredient.id || ingredient.name} className="routine-ingredient-item">
            <h4>{ingredient.name}</h4>
            <p>{ingredient.direction || '用于支持当前美容护理方向。'}</p>
            {ingredient.caution ? <span>建议循序使用</span> : null}
          </article>
        ))}
      </div>
    </GlowCard>
  );
}
