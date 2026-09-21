import Container from './common/Container.jsx';
import { cn } from '../lib/utils.js';

const footerGroups = [
  {
    title: '产品',
    links: [
      { label: '肌肤分析', href: '#analysis' },
      { label: '面部分区分析', href: '#face-mapping' },
      { label: '个性化护理方案', href: '#personalization' },
      { label: '核心技术', href: '#technology' },
    ],
  },
  {
    title: '信息',
    links: [
      { label: '应用场景', href: '#use-cases' },
      { label: '体验方案', href: '#pricing' },
      { label: '常见问题', href: '#faq' },
      { label: '返回顶部', href: '#home' },
    ],
  },
];

function FooterLinkGroup({ group }) {
  return (
    <div className="footer-link-group">
      <h2>{group.title}</h2>
      <nav aria-label={`${group.title}导航`}>
        {group.links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
      </nav>
    </div>
  );
}

export default function Footer({ className = '' }) {
  return (
    <footer data-module="footer" className={cn('footer-v2', className)}>
      <Container>
        <div className="footer-main-v2">
          <div className="footer-brand-v2">
            <a href="#home" aria-label="LumiDerm AI 首页">LumiDerm <span>AI</span></a>
            <p>用 AI 帮助用户更直观地理解肌肤状态与美容护理方向。</p>
          </div>

          <div className="footer-navigation-v2">
            {footerGroups.map((group) => <FooterLinkGroup key={group.title} group={group} />)}
          </div>
        </div>

        <div className="footer-bottom-v2">
          <p>© 2026 LumiDerm AI</p>
          <p>LumiDerm AI 提供的是美容护肤方向的模拟肌肤分析与护理建议，不构成医疗诊断或治疗建议。</p>
        </div>
      </Container>
    </footer>
  );
}
