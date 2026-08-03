import { cn } from '../../lib/utils.js';

export default function GlowCard({ children, className = '', hoverable = true, ...props }) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-lumi border border-lumi-line bg-lumi-panel p-5 shadow-soft',
        'backdrop-blur-[18px] before:pointer-events-none before:absolute before:inset-0 before:bg-lumi-card before:opacity-80',
        'after:pointer-events-none after:absolute after:inset-px after:rounded-[calc(1.25rem-1px)] after:border after:border-white/[0.045]',
        hoverable && 'transition duration-500 motion-safe:hover:-translate-y-1 hover:border-lumi-lineActive hover:bg-lumi-panelStrong hover:shadow-glow active:translate-y-0',
        className,
      )}
      {...props}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}
