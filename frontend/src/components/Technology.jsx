import { motion } from 'framer-motion';
import { Brain, Fingerprint, ScanFace, Sparkles, Waypoints } from 'lucide-react';
import Container from './common/Container.jsx';
import GlowCard from './common/GlowCard.jsx';
import MotionSection from './common/MotionSection.jsx';
import SectionTitle from './common/SectionTitle.jsx';
import { technologyFeatures, technologySignals } from '../data/technologyFeatures.js';
import { cardReveal, staggerContainer } from '../lib/motion.js';
import { cn } from '../lib/utils.js';

const iconMap = {
  Brain,
  Fingerprint,
  ScanFace,
  Sparkles,
  Waypoints,
};

const accentMap = {
  cyan: {
    rgb: '95, 255, 224',
    text: 'text-lumi-cyan',
    border: 'border-lumi-cyan/25',
    bg: 'bg-lumi-cyan/10',
  },
  violet: {
    rgb: '155, 92, 255',
    text: 'text-lumi-violet',
    border: 'border-lumi-violet/25',
    bg: 'bg-lumi-violet/10',
  },
  blue: {
    rgb: '76, 201, 240',
    text: 'text-lumi-blue',
    border: 'border-lumi-blue/25',
    bg: 'bg-lumi-blue/10',
  },
  magenta: {
    rgb: '255, 79, 216',
    text: 'text-lumi-magenta',
    border: 'border-lumi-magenta/25',
    bg: 'bg-lumi-magenta/10',
  },
};

function TechnologyVisual() {
  return (
    <GlowCard className="technology-visual-panel p-4 sm:p-6" hoverable={false}>
      <div className="technology-visual-stage relative min-h-[430px] overflow-hidden rounded-[1.35rem] border border-white/10">
        <div className="technology-grid" aria-hidden="true" />
        <div className="technology-orb" aria-hidden="true">
          <div className="technology-orb-core">
            <ScanFace size={58} strokeWidth={1.25} aria-hidden="true" />
          </div>
          <span className="technology-ring ring-one" />
          <span className="technology-ring ring-two" />
          <span className="technology-ring ring-three" />
        </div>

        <svg className="technology-network" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M18 28 C34 16 58 18 77 31" />
          <path d="M21 70 C38 56 61 58 82 72" />
          <path d="M26 32 L47 49 L70 28" />
          <path d="M29 69 L48 51 L75 67" />
        </svg>

        <span className="technology-node node-a" />
        <span className="technology-node node-b" />
        <span className="technology-node node-c" />
        <span className="technology-node node-d" />

        <div className="absolute bottom-4 left-4 right-4 z-30 grid gap-3 sm:grid-cols-3">
          {technologySignals.map((signal) => (
            <div key={signal.label} className="rounded-2xl border border-white/10 bg-lumi-black/70 p-3 backdrop-blur">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-lumi-cyan/80">
                {signal.label}
              </p>
              <p className="mt-2 text-xs leading-5 text-lumi-secondary">{signal.value}</p>
            </div>
          ))}
        </div>
      </div>
    </GlowCard>
  );
}

function TechnologyCard({ item }) {
  const Icon = iconMap[item.iconName] || Brain;
  const accent = accentMap[item.accent] || accentMap.cyan;

  return (
    <GlowCard
      className="technology-card p-5"
      style={{ '--tech-accent': accent.rgb }}
    >
      <div className="flex gap-4">
        <div className={cn('flex size-11 shrink-0 items-center justify-center rounded-full border', accent.border, accent.bg, accent.text)}>
          <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-lumi-muted">{item.zhTitle}</p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight text-lumi-text">{item.title}</h3>
          <p className="mt-3 text-sm leading-6 text-lumi-secondary">{item.description}</p>
        </div>
      </div>
    </GlowCard>
  );
}

export default function Technology({ className = '' }) {
  return (
    <MotionSection id="technology" data-module="technology" className={cn('section-spacing', className)}>
      <Container>
        <SectionTitle
          eyebrow="BEAUTY INTELLIGENCE ENGINE"
          title="Beauty Intelligence, Powered By Vision AI"
          subtitle="LumiDerm AI 结合视觉识别、面部分区、肌肤纹理映射和推荐逻辑，将模拟肌肤信号转化为可理解的护理方向。"
          align="center"
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <motion.div variants={cardReveal}>
            <TechnologyVisual />
          </motion.div>
          <motion.div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1" variants={staggerContainer}>
            {technologyFeatures.map((item) => (
              <motion.div key={item.id} variants={cardReveal}>
                <TechnologyCard item={item} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div variants={cardReveal}>
          <GlowCard className="mt-8 p-6 md:p-7" hoverable={false}>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <p className="max-w-3xl text-sm leading-6 text-lumi-secondary md:text-base">
                From visual intelligence to real beauty experiences, LumiDerm AI can be adapted across multiple skincare and beauty scenarios.
              </p>
              <p className="text-sm leading-6 text-lumi-muted md:max-w-md md:text-right">
                从视觉智能到真实美业体验，LumiDerm AI 可以延展到个人护肤、品牌互动、美容咨询和电商推荐等场景。
              </p>
            </div>
          </GlowCard>
        </motion.div>
      </Container>
    </MotionSection>
  );
}
