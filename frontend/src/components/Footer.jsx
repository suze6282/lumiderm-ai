import Container from './common/Container.jsx';
import { cn } from '../lib/utils.js';

const footerLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Analysis', href: '#analysis' },
  { label: 'Technology', href: '#technology' },
  { label: 'Personalization', href: '#personalization' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = ['Instagram', 'LinkedIn', 'X'];

export default function Footer({ className = '' }) {
  return (
    <footer data-module="footer" className={cn('border-t border-white/10 py-12', className)}>
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr_0.7fr]">
          <div>
            <a href="#home" className="font-display text-2xl font-semibold tracking-display text-lumi-text">
              LumiDerm AI
            </a>
            <p className="mt-4 max-w-md text-sm leading-6 text-lumi-secondary">
              AI-powered cosmetic skin analysis and personalized beauty intelligence.
            </p>
            <p className="mt-3 max-w-md text-sm leading-6 text-lumi-muted">
              AI 肌肤分析与个性化美容智能体验概念。
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lumi-cyan/80">Navigation</p>
            <nav className="mt-4 grid grid-cols-2 gap-3 text-sm text-lumi-secondary" aria-label="Footer navigation">
              {footerLinks.map((link) => (
                <a key={link.href} className="transition hover:text-lumi-text" href={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lumi-cyan/80">Social</p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm text-lumi-secondary lg:flex-col">
              {socialLinks.map((item) => (
                <a key={item} className="transition hover:text-lumi-text" href="#contact">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-lumi-muted md:flex-row md:items-center md:justify-between">
          <p>© 2026 LumiDerm AI. All rights reserved.</p>
          <p>Cosmetic analysis demo only. Not for medical diagnosis.</p>
        </div>
      </Container>
    </footer>
  );
}
