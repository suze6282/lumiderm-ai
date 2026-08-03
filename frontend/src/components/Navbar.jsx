import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Container from './common/Container.jsx';
import { cn } from '../lib/utils.js';

const navItems = [
  { label: 'Technology', href: '#technology' },
  { label: 'Analysis', href: '#analysis' },
  { label: 'Personalization', href: '#personalization' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ className = '' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!menuOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  return (
    <header
      data-module="navbar"
      className={cn(
        'sticky top-0 z-50 border-b border-lumi-line bg-lumi-black/70 backdrop-blur-xl',
        className,
      )}
    >
      <Container className="flex min-h-16 items-center justify-between">
        <a href="#home" className="flex items-center gap-3 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lumi-blue" aria-label="LumiDerm AI home" onClick={() => setMenuOpen(false)}>
          <span className="grid size-9 place-items-center rounded-full border border-lumi-blue/40 bg-lumi-blue/5 text-xs font-semibold text-lumi-cyan shadow-[inset_0_0_20px_rgba(76,201,240,0.12)]">
            LD
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">LumiDerm AI</span>
        </a>

        <nav className="hidden items-center gap-8 text-sm text-lumi-secondary md:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.href} className="transition-colors hover:text-lumi-text focus-visible:text-lumi-text" href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <button
          className="inline-flex size-10 items-center justify-center rounded-full border border-lumi-line bg-white/[0.035] text-lumi-text transition duration-300 hover:border-lumi-lineActive hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lumi-blue md:hidden"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
        </button>
      </Container>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-navigation"
            className="mobile-nav-panel absolute left-4 right-4 top-[calc(100%+0.75rem)] z-50 rounded-[1.35rem] border border-lumi-line p-2 shadow-soft backdrop-blur-xl md:hidden"
            initial={shouldReduceMotion ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -10 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="mx-auto flex max-w-7xl flex-col gap-2 text-base text-lumi-secondary" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  className="rounded-2xl px-4 py-3 transition-colors hover:bg-white/[0.055] hover:text-lumi-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lumi-blue"
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
