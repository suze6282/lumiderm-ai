import { cn } from '../../lib/utils.js';

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className = '',
  titleClassName = '',
}) {
  const isCenter = align === 'center';

  return (
    <div className={cn(isCenter ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl', className)}>
      {eyebrow ? (
        <p className="mb-4 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-lumi-cyan/85">
          {eyebrow}
        </p>
      ) : null}
      <h2 className={cn('font-display text-[2rem] font-bold leading-[1.04] tracking-display text-lumi-text sm:text-4xl lg:text-[3.4rem]', titleClassName)}>
        {title}
      </h2>
      {subtitle ? (
        <p className={cn('body-copy mt-5 max-w-2xl text-base sm:text-lg', isCenter && 'mx-auto')}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
