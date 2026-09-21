import { cn } from '../../lib/utils.js';

const variants = {
  default: 'lumi-card--default',
  glass: 'lumi-card--glass',
  elevated: 'lumi-card--elevated',
  interactive: 'lumi-card--interactive',
};

export default function GlowCard({ children, className = '', hoverable = true, variant = 'default', ...props }) {
  return (
    <div
      className={cn(
        'group lumi-card p-5',
        variants[variant] || variants.default,
        className,
      )}
      data-hoverable={hoverable ? 'true' : 'false'}
      {...props}
    >
      <div className="lumi-card__content">{children}</div>
    </div>
  );
}
