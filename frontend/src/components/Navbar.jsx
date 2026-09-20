import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import Container from './common/Container.jsx';
import GradientButton from './common/GradientButton.jsx';
import { motionDuration, motionEase } from '../lib/motion.js';
import { cn } from '../lib/utils.js';

const navItems = [
  { label: '核心技术', href: '#technology' },
  { label: '肌肤分析', href: '#analysis' },
  { label: '个性化护理', href: '#personalization' },
  { label: '方案价格', href: '#pricing' },
  { label: '联系我们', href: '#contact' },
];

function NavLink({ item, active, onClick, mobile = false }) {
  return (
    <a
      className={cn('navbar-link', mobile && 'navbar-link--mobile', active && 'is-active')}
      href={item.href}
      aria-current={active ? 'location' : undefined}
      onClick={onClick}
    >
      {item.label}
    </a>
  );
}

export default function Navbar({ className = '' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const updateScrolledState = () => setIsScrolled(window.scrollY > 32);

    updateScrolledState();
    window.addEventListener('scroll', updateScrolledState, { passive: true });
    return () => window.removeEventListener('scroll', updateScrolledState);
  }, []);

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 1280px)');
    const closeAtDesktop = (event) => {
      if (event.matches) setMenuOpen(false);
    };

    desktopQuery.addEventListener('change', closeAtDesktop);
    return () => desktopQuery.removeEventListener('change', closeAtDesktop);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map(({ href }) => document.querySelector(href))
      .filter(Boolean);

    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) setActiveSection(visibleEntry.target.id);
      },
      { rootMargin: '-24% 0px -62%', threshold: [0, 0.05, 0.2] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const menuMotion = shouldReduceMotion
    ? { initial: false, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 }, transition: { duration: 0 } }
    : {
        initial: { opacity: 0, y: -12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
        transition: { duration: motionDuration.normal, ease: motionEase },
      };

  return (
    <header
      data-module="navbar"
      data-scrolled={isScrolled ? 'true' : 'false'}
      data-menu-open={menuOpen ? 'true' : 'false'}
      className={cn('navbar-shell fixed inset-x-0 top-0 z-50', className)}
    >
      <Container className="navbar-container relative z-20 flex items-center justify-between gap-5">
        <a href="#home" className="navbar-brand" aria-label="LumiDerm AI 首页" onClick={closeMenu}>
          <span className="navbar-brand-mark" aria-hidden="true">LD</span>
          <span className="font-display text-[1.08rem] font-semibold tracking-[-0.025em] sm:text-lg">
            LumiDerm <span className="navbar-brand-ai">AI</span>
          </span>
        </a>

        <nav className="hidden items-center gap-5 text-sm xl:flex 2xl:gap-7" aria-label="主导航">
          {navItems.map((item) => (
            <NavLink key={item.href} item={item} active={activeSection === item.href.slice(1)} />
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 xl:flex">
          <button className="navbar-login" type="button">登录</button>
          <GradientButton href="#analysis" size="sm" icon={ArrowRight}>开始检测</GradientButton>
        </div>

        <button
          className="navbar-menu-trigger xl:hidden"
          type="button"
          aria-label={menuOpen ? '关闭导航菜单' : '打开导航菜单'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span>菜单</span>
          {menuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
        </button>
      </Container>

      <AnimatePresence>
        {menuOpen ? (
          <>
            <motion.button
              className="navbar-overlay fixed inset-0 top-[var(--navbar-height)] z-0 xl:hidden"
              type="button"
              aria-label="关闭导航菜单"
              tabIndex={-1}
              onClick={closeMenu}
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : motionDuration.fast }}
            />
            <motion.div
              id="mobile-navigation"
              className="mobile-nav-panel absolute left-4 right-4 top-[calc(100%+0.65rem)] z-10 mx-auto max-w-2xl rounded-[1.35rem] border border-lumi-line p-3 shadow-floating backdrop-blur-2xl xl:hidden"
              {...menuMotion}
            >
              <div className="flex items-center justify-between border-b border-white/[0.07] px-3 pb-3 pt-1">
                <p className="text-sm font-semibold text-lumi-text">LumiDerm AI</p>
                <button className="navbar-close" type="button" aria-label="关闭导航菜单" onClick={closeMenu}>
                  <X size={18} aria-hidden="true" />
                </button>
              </div>

              <nav className="flex flex-col py-2" aria-label="移动端主导航">
                {navItems.map((item) => (
                  <NavLink
                    key={item.href}
                    item={item}
                    active={activeSection === item.href.slice(1)}
                    mobile
                    onClick={closeMenu}
                  />
                ))}
              </nav>

              <div className="grid gap-2 border-t border-white/[0.07] px-1 pb-1 pt-3 sm:grid-cols-[auto_1fr]">
                <button className="navbar-login min-h-11 justify-center px-5" type="button">登录</button>
                <GradientButton href="#analysis" size="md" icon={ArrowRight} className="w-full" onClick={closeMenu}>
                  开始检测
                </GradientButton>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
