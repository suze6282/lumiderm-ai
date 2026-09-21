import { useState } from 'react';
import { ArrowRight, Info } from 'lucide-react';
import Container from './common/Container.jsx';
import GradientButton from './common/GradientButton.jsx';
import MotionSection from './common/MotionSection.jsx';
import SectionTitle from './common/SectionTitle.jsx';
import FaceMapVisual from './skin/FaceMapVisual.jsx';
import FaceZoneDetail from './skin/FaceZoneDetail.jsx';
import { faceMappingDisclaimer, faceZones } from '../data/faceZones.js';
import { cn } from '../lib/utils.js';

function EmptyFaceMapping() {
  return (
    <div className="face-map-empty-state">
      <span aria-hidden="true"><Info size={22} /></span>
      <h3>暂无面部分区分析</h3>
      <p>完成肌肤检测后，这里将展示不同面部区域的分析结果。</p>
      <GradientButton href="#analysis" icon={ArrowRight}>开始肌肤检测</GradientButton>
    </div>
  );
}

function ZoneChips({ zones, selectedZoneId, onSelect }) {
  return (
    <div className="face-zone-chips" role="group" aria-label="选择面部区域">
      {zones.map((zone) => (
        <button
          key={zone.id}
          type="button"
          className="face-zone-chip"
          aria-pressed={zone.id === selectedZoneId}
          onClick={() => onSelect(zone.id)}
        >
          {zone.label}
        </button>
      ))}
    </div>
  );
}

export default function FaceMapping({ className = '', zones = faceZones }) {
  const safeZones = Array.isArray(zones)
    ? zones.filter((zone) => zone && zone.id && zone.label && Array.isArray(zone.markers) && zone.markers.length)
    : [];
  const [selectedZoneId, setSelectedZoneId] = useState(() => safeZones[0]?.id || null);
  const selectedZone = safeZones.find((zone) => zone.id === selectedZoneId) || safeZones[0];

  return (
    <MotionSection id="face-mapping" data-module="face-mapping" className={cn('face-mapping-section section-spacing', className)}>
      <Container>
        <SectionTitle
          eyebrow="AI 面部分区分析"
          title="看见每个面部区域的肌肤状态"
          subtitle="选择不同面部区域，查看 LumiDerm AI 对局部肌肤状态的模拟分析与护理建议。"
          className="face-mapping-title"
        />

        {safeZones.length ? (
          <div className="face-mapping-shell">
            <div className="face-map-interaction-column">
              <FaceMapVisual zones={safeZones} selectedZone={selectedZone} onSelect={setSelectedZoneId} />
              <ZoneChips zones={safeZones} selectedZoneId={selectedZone?.id} onSelect={setSelectedZoneId} />
            </div>
            <FaceZoneDetail zone={selectedZone} disclaimer={faceMappingDisclaimer} />
          </div>
        ) : <EmptyFaceMapping />}
      </Container>
    </MotionSection>
  );
}
