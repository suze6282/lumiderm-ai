import {
  ArrowRight,
  Layers,
  ScanSearch,
  Sparkles,
} from 'lucide-react';
import Container from './common/Container.jsx';
import GradientButton from './common/GradientButton.jsx';
import GlowCard from './common/GlowCard.jsx';
import MotionSection from './common/MotionSection.jsx';
import SectionTitle from './common/SectionTitle.jsx';
import { faceMappingHighlights, faceZones } from '../data/faceZones.js';
import { cn } from '../lib/utils.js';

const iconMap = {
  Layers,
  ScanSearch,
  Sparkles,
};

const accentMap = {
  violet: {
    rgb: '155, 92, 255',
    dot: 'bg-lumi-violet',
    text: 'text-lumi-violet',
    border: 'border-lumi-violet/25',
  },
  rose: {
    rgb: '255, 107, 158',
    dot: 'bg-lumi-rose',
    text: 'text-lumi-rose',
    border: 'border-lumi-rose/25',
  },
  cyan: {
    rgb: '95, 255, 224',
    dot: 'bg-lumi-cyan',
    text: 'text-lumi-cyan',
    border: 'border-lumi-cyan/25',
  },
  blue: {
    rgb: '76, 201, 240',
    dot: 'bg-lumi-blue',
    text: 'text-lumi-blue',
    border: 'border-lumi-blue/25',
  },
  magenta: {
    rgb: '255, 79, 216',
    dot: 'bg-lumi-magenta',
    text: 'text-lumi-magenta',
    border: 'border-lumi-magenta/25',
  },
};

function FaceZonePoint({ zone }) {
  const accent = accentMap[zone.accent] || accentMap.cyan;

  return (
    <div
      className="face-zone-marker"
      style={{
        '--zone-x': `${zone.x}%`,
        '--zone-y': `${zone.y}%`,
        '--zone-accent': accent.rgb,
      }}
      aria-label={`${zone.zone} maps to ${zone.metric}`}
    >
      <span className={cn('face-zone-dot', accent.dot)} />
    </div>
  );
}

function ZoneLabel({ zone }) {
  const accent = accentMap[zone.accent] || accentMap.cyan;

  return (
    <div
      className={cn(
        'face-zone-label hidden rounded-2xl border bg-lumi-black/70 px-3.5 py-2.5 backdrop-blur md:block',
        accent.border,
      )}
      style={{
        '--label-x': `${zone.labelX}%`,
        '--label-y': `${zone.labelY}%`,
        '--zone-accent': accent.rgb,
      }}
    >
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-lumi-text">
        {zone.zone}
      </p>
      <p className={cn('mt-1 text-xs font-medium', accent.text)}>{zone.metric}</p>
    </div>
  );
}

function FaceMapVisual() {
  return (
    <GlowCard className="face-map-panel p-4 sm:p-6">
      <div
        className="face-map-stage relative min-h-[430px] overflow-hidden rounded-[1.35rem] border border-white/10 md:min-h-[540px]"
        aria-label="Abstract facial region mapping visualization"
      >
        <div className="face-map-grid" aria-hidden="true" />
        <div className="face-map-face-wrap" aria-hidden="true">
          <div className="face-map-face">
            <span className="face-map-zone-glow forehead" />
            <span className="face-map-zone-glow eye" />
            <span className="face-map-zone-glow nose" />
            <span className="face-map-zone-glow cheek" />
            <span className="face-map-zone-glow chin" />
            <svg className="face-map-lines" viewBox="0 0 220 300" aria-hidden="true">
              <path d="M67 94 C92 78 128 78 153 94" />
              <path d="M76 124 C91 113 106 113 118 124" />
              <path d="M131 124 C145 113 159 114 172 124" />
              <path d="M112 116 C106 140 102 158 116 169" />
              <path d="M86 207 C104 223 127 223 146 207" />
              <path d="M60 158 C82 147 93 151 101 164" />
              <path d="M159 157 C144 148 132 151 124 164" />
            </svg>
            <div className="face-map-texture" />
          </div>
        </div>

        <svg className="face-map-connectors" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {faceZones.map((zone) => (
            <line
              key={zone.id}
              x1={zone.x}
              y1={zone.y}
              x2={zone.labelX}
              y2={zone.labelY}
              style={{ '--zone-accent': (accentMap[zone.accent] || accentMap.cyan).rgb }}
            />
          ))}
        </svg>

        {faceZones.map((zone) => (
          <FaceZonePoint key={zone.id} zone={zone} />
        ))}
        {faceZones.map((zone) => (
          <ZoneLabel key={`${zone.id}-label`} zone={zone} />
        ))}

        <div className="absolute bottom-4 left-4 right-4 z-30 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-lumi-black/70 p-3 backdrop-blur">
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-lumi-cyan/80">
              Zone Signal
            </p>
            <p className="mt-1 text-sm text-lumi-secondary">5 regions · simulated cosmetic analysis</p>
          </div>
          <span className="rounded-full border border-lumi-cyan/20 bg-lumi-cyan/10 px-3 py-1 text-xs font-semibold text-lumi-cyan">
            Region Map
          </span>
        </div>
      </div>
    </GlowCard>
  );
}

function ZoneInsightCard({ item }) {
  const Icon = iconMap[item.iconName] || Sparkles;

  return (
    <GlowCard className="p-4" hoverable>
      <div className="flex gap-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-lumi-cyan/20 bg-lumi-cyan/10 text-lumi-cyan">
          <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-lumi-text">{item.title}</h3>
          <p className="mt-2 text-sm leading-6 text-lumi-secondary">{item.description}</p>
        </div>
      </div>
    </GlowCard>
  );
}

function ZoneList() {
  return (
    <GlowCard className="p-4 sm:p-5" hoverable={false}>
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lumi-cyan/80">Mapped Zones</p>
        <span className="text-xs text-lumi-muted">{faceZones.length} areas</span>
      </div>
      <div className="grid gap-2">
        {faceZones.map((zone) => {
          const accent = accentMap[zone.accent] || accentMap.cyan;
          return (
            <div
              key={zone.id}
              className="grid gap-3 rounded-2xl border border-white/10 bg-white/[0.025] p-3 sm:grid-cols-[1fr_auto] sm:items-center"
            >
              <div>
                <p className="text-sm font-semibold text-lumi-text">
                  {zone.zone}
                  <span className="ml-2 text-xs font-medium text-lumi-muted">{zone.zhZone}</span>
                </p>
                <p className="mt-1 text-sm text-lumi-secondary">{zone.listSignal}</p>
              </div>
              <span
                className={cn(
                  'inline-flex w-fit rounded-full border bg-white/[0.035] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em]',
                  accent.border,
                  accent.text,
                )}
              >
                {zone.status}
              </span>
            </div>
          );
        })}
      </div>
    </GlowCard>
  );
}

function MappingCTA() {
  return (
    <GlowCard className="p-5" hoverable={false}>
      <p className="text-sm leading-6 text-lumi-secondary">
        From zone insights to personalized routines, LumiDerm AI turns simulated skin signals into beauty care directions.
      </p>
      <p className="mt-3 text-sm leading-6 text-lumi-muted">
        从区域化肌肤观察到个性化护肤建议，系统会进一步生成更适合你的护理方向。
      </p>
      <GradientButton href="#personalization" variant="secondary" size="md" icon={ArrowRight} className="mt-5">
        View Personalized Routine
      </GradientButton>
    </GlowCard>
  );
}

export default function FaceMapping({ className = '' }) {
  return (
    <MotionSection id="face-mapping" data-module="face-mapping" className={cn('section-spacing', className)}>
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          <FaceMapVisual />

          <div className="min-w-0">
            <SectionTitle
              eyebrow="FACIAL REGION MAPPING"
              title="Multi-Zone Facial Mapping"
              subtitle="LumiDerm AI 将面部分为多个区域，模拟分析不同区域的肤质纹理、水油状态、毛孔可见度、眼周暗沉和护理优先级。"
            />

            <div className="mt-8">
              <h3 className="text-2xl font-semibold tracking-tight text-lumi-text">
                Region-Based Skin Intelligence
              </h3>
              <p className="mt-4 text-base leading-7 text-lumi-secondary">
                不同面部区域的肤质表现并不相同。LumiDerm AI 通过区域化模拟分析，帮助用户理解局部肌肤状态，并为后续护理建议提供参考。
              </p>
            </div>

            <div className="mt-7 grid gap-3">
              {faceMappingHighlights.map((item) => (
                <ZoneInsightCard key={item.id} item={item} />
              ))}
            </div>

            <div className="mt-4">
              <ZoneList />
            </div>

            <div className="mt-4">
              <MappingCTA />
            </div>
          </div>
        </div>
      </Container>
    </MotionSection>
  );
}
