import { cn } from '../../lib/utils.js';

const variants = {
  primary:
    'button-surface-primary border-white/10 text-white shadow-violet hover:border-white/20 hover:shadow-[0_0_40px_rgba(155,140,255,0.20)] focus-visible:outline-lumi-blue',
  secondary:
    'button-surface-secondary border-white/[0.14] text-lumi-text hover:border-lumi-lineActive hover:bg-white/[0.075] focus-visible:outline-white/60',
  ghost:
    'border-transparent bg-transparent text-lumi-secondary hover:text-lumi-text hover:underline hover:decoration-lumi-cyan/50 hover:underline-offset-8 focus-visible:outline-lumi-blue',
};

const sizes = {
  sm: 'min-h-9 px-4 text-xs',
  md: 'min-h-11 px-5 text-sm',
  lg: 'min-h-12 px-6 text-sm sm:min-h-14 sm:px-7',
};

export default function GradientButton({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  className = '',
  href,
  type = 'button',
  loading = false,
  disabled = false,
  onClick,
  tabIndex,
  ...props
}) {
  const isDisabled = disabled || loading;
  const classes = cn(
    'relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border font-semibold',
    'transition [transition-duration:var(--lumi-motion-normal)] [transition-timing-function:var(--lumi-motion-ease)] motion-safe:hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.985]',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4',
    'disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50',
    variants[variant] || variants.primary,
    sizes[size] || sizes.md,
    className,
  );
  const content = (
    <>
      <span className={cn('inline-flex items-center justify-center gap-2', loading && 'opacity-0')}>
        <span>{children}</span>
        {Icon ? <Icon size={16} aria-hidden="true" /> : null}
      </span>
      {loading ? (
        <>
          <span className="lumi-button__spinner" aria-hidden="true" />
          <span className="sr-only" role="status">加载中</span>
        </>
      ) : null}
    </>
  );

  if (href) {
    const handleLinkClick = (event) => {
      if (isDisabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      onClick?.(event);
    };

    return (
      <a
        className={classes}
        href={href}
        {...props}
        aria-busy={loading || undefined}
        aria-disabled={isDisabled || undefined}
        tabIndex={isDisabled ? -1 : tabIndex}
        onClick={handleLinkClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={classes}
      type={type}
      {...props}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      onClick={onClick}
      tabIndex={tabIndex}
    >
      {content}
    </button>
  );
}
