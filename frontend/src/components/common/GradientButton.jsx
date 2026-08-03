import { cn } from '../../lib/utils.js';

const variants = {
  primary:
    'button-surface-primary border-white/10 text-white shadow-violet hover:border-white/20 hover:shadow-[0_0_40px_rgba(255,79,216,0.24)] focus-visible:outline-lumi-blue',
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
  ...props
}) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-full border font-semibold',
    'transition duration-300 motion-safe:hover:-translate-y-1 active:translate-y-0 active:scale-[0.98]',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4',
    'disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50',
    variants[variant] || variants.primary,
    sizes[size] || sizes.md,
    className,
  );
  const content = (
    <>
      <span>{children}</span>
      {Icon ? <Icon size={16} aria-hidden="true" /> : null}
    </>
  );

  if (href) {
    return (
      <a className={classes} href={href} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} type={type} {...props}>
      {content}
    </button>
  );
}
