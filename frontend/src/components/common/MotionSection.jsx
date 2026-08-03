import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp, viewportOnce } from '../../lib/motion.js';
import { cn } from '../../lib/utils.js';

export default function MotionSection({
  children,
  className = '',
  variants = fadeUp,
  viewport = viewportOnce,
  as = 'section',
  ...props
}) {
  const shouldReduceMotion = useReducedMotion();
  const Component = motion[as] || motion.section;

  return (
    <Component
      className={cn(className)}
      variants={shouldReduceMotion ? undefined : variants}
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView={shouldReduceMotion ? undefined : 'visible'}
      viewport={shouldReduceMotion ? undefined : viewport}
      {...props}
    >
      {children}
    </Component>
  );
}
