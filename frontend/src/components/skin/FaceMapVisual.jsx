import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import { motionDuration, motionEase } from '../../lib/motion.js';

function FaceZoneMarker({ zone, marker, markerIndex, selected, onSelect }) {
  const markerLabel = zone.markers.length > 1 ? `${zone.label}${markerIndex === 0 ? '左侧' : '右侧'}` : zone.label;

  return (
    <button
      type="button"
      className="face-zone-marker-v2"
      style={{ '--zone-x': `${marker.x}%`, '--zone-y': `${marker.y}%` }}
      aria-label={`查看${markerLabel}区域分析`}
      aria-pressed={selected}
      onClick={() => onSelect(zone.id)}
    >
      <span className="face-zone-marker-core" aria-hidden="true" />
    </button>
  );
}

export default function FaceMapVisual({ zones, selectedZone, onSelect }) {
  const shouldReduceMotion = useReducedMotion();
  const primaryMarker = selectedZone?.markers?.[0];
  const labelPosition = selectedZone?.labelPosition;

  return (
    <div className="face-map-visual-v2" aria-label="可交互面部分区图">
      <div className="face-map-visual-status">
        <Check size={14} aria-hidden="true" />
        面部分区分析已完成
      </div>

      <div className="face-map-portrait" aria-hidden="true">
        <svg viewBox="0 0 420 560" focusable="false">
          <defs>
            <linearGradient id="face-outline-gradient" x1="58" x2="356" y1="54" y2="498" gradientUnits="userSpaceOnUse">
              <stop stopColor="#b59cff" stopOpacity="0.72" />
              <stop offset="0.54" stopColor="#d8d9e6" stopOpacity="0.38" />
              <stop offset="1" stopColor="#84d4ff" stopOpacity="0.7" />
            </linearGradient>
            <radialGradient id="face-depth-gradient" cx="0" cy="0" r="1" gradientTransform="translate(190 208) rotate(75) scale(265 190)" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffffff" stopOpacity="0.12" />
              <stop offset="0.58" stopColor="#9b8cff" stopOpacity="0.06" />
              <stop offset="1" stopColor="#070812" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path className="face-map-silhouette" d="M210 42C124 42 79 112 84 216c4 87 25 180 77 230 16 16 27 39 29 65h40c2-26 13-49 29-65 52-50 73-143 77-230 5-104-40-174-126-174Z" />
          <path className="face-map-depth" d="M210 57c-73 0-112 62-108 158 4 83 24 163 67 207 18 18 30 40 34 65h14c4-25 16-47 34-65 43-44 63-124 67-207 4-96-35-158-108-158Z" />
          <g className="face-map-features">
            <path d="M132 204c25-17 51-17 74-2" />
            <path d="M214 202c23-15 49-15 74 2" />
            <path d="M137 224c18 13 43 13 61 0" />
            <path d="M222 224c18 13 43 13 61 0" />
            <path d="M210 204c-10 49-16 82 4 95" />
            <path d="M188 337c15 10 29 13 43 0" />
            <path d="M170 342c27 28 55 28 82 0" />
          </g>
          <g className="face-map-mesh">
            <path d="M108 174 210 116 311 174" />
            <path d="M102 238 210 204 318 238" />
            <path d="M112 304 210 274 308 304" />
            <path d="M135 372 210 344 286 372" />
            <path d="M163 430 210 397 258 430" />
            <path d="M146 127 166 445" />
            <path d="M274 127 254 445" />
            <path d="M210 82 210 468" />
          </g>
        </svg>
        <span className="face-map-scan-line" />
      </div>

      {primaryMarker && labelPosition ? (
        <svg className="face-map-selected-connector" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <motion.path
            key={selectedZone.id}
            d={`M ${primaryMarker.x} ${primaryMarker.y} L ${labelPosition.x - 5} ${labelPosition.y}`}
            initial={shouldReduceMotion ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: shouldReduceMotion ? 0 : motionDuration.normal, ease: motionEase }}
          />
        </svg>
      ) : null}

      {zones.flatMap((zone) => zone.markers.map((marker, markerIndex) => (
        <FaceZoneMarker
          key={`${zone.id}-${markerIndex}`}
          zone={zone}
          marker={marker}
          markerIndex={markerIndex}
          selected={zone.id === selectedZone?.id}
          onSelect={onSelect}
        />
      )))}

      {selectedZone && labelPosition ? (
        <motion.div
          key={selectedZone.id}
          className="face-map-selected-label"
          style={{ '--label-x': `${labelPosition.x}%`, '--label-y': `${labelPosition.y}%` }}
          initial={shouldReduceMotion ? false : { opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : motionDuration.fast, ease: motionEase }}
        >
          <span>当前区域</span>
          <strong>{selectedZone.label}</strong>
        </motion.div>
      ) : null}
    </div>
  );
}
