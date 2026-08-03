import { cn } from '../../lib/utils.js';

export default function Container({ children, className = '' }) {
  return (
    <div className={cn('mx-auto w-full max-w-[1280px] px-5 sm:px-6 lg:px-8 2xl:max-w-[1360px]', className)}>
      {children}
    </div>
  );
}
