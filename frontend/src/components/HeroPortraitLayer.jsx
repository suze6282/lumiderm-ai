import { heroDetectionPoints } from '../data/heroData.js';
import portraitImage from '../assets/hero/lumiderm-beauty-portrait.webp';

export default function HeroPortraitLayer() {
  return (
    <div
      className="hero-portrait-layer"
      data-portrait-status="photorealistic"
    >
      <div className="hero-portrait-aura" aria-hidden="true" />
      <div className="hero-portrait-surface">
        <img
          className="hero-portrait-photo"
          src={portraitImage}
          alt="LumiDerm AI 肌肤分析中的原创美容人像"
          width="1122"
          height="1402"
          decoding="async"
          fetchpriority="high"
        />
        <svg className="hero-face-vector" viewBox="0 0 520 640" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="faceContour" x1="126" y1="80" x2="430" y2="560" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F3F0FF" stopOpacity="0.82" />
              <stop offset="0.48" stopColor="#84D4FF" stopOpacity="0.48" />
              <stop offset="1" stopColor="#9B8CFF" stopOpacity="0.18" />
            </linearGradient>
            <linearGradient id="faceMesh" x1="170" y1="130" x2="388" y2="520" gradientUnits="userSpaceOnUse">
              <stop stopColor="#DAD3FF" stopOpacity="0.18" />
              <stop offset="1" stopColor="#84D4FF" stopOpacity="0.46" />
            </linearGradient>
          </defs>
          <g stroke="url(#faceMesh)" strokeWidth="0.72">
            <path d="M174 167L269 112L369 150L426 236L398 330L421 403L360 502L270 542L184 463L145 346L153 244L174 167Z" />
            <path d="M174 167L252 248L153 244M269 112L252 248L369 150M252 248L286 350L153 244M252 248L426 236L286 350M153 244L145 346L286 350M426 236L398 330L286 350M145 346L184 463L286 350M398 330L421 403L286 350M184 463L270 542L286 350M421 403L360 502L286 350M270 542L360 502" />
          </g>
          <g fill="#B9E4FF">
            <circle cx="294" cy="119" r="2.4" />
            <circle cx="276" cy="238" r="2.2" />
            <circle cx="388" cy="245" r="2" />
            <circle cx="291" cy="341" r="2.6" />
            <circle cx="205" cy="450" r="2" />
            <circle cx="348" cy="482" r="2.2" />
          </g>
        </svg>
        <div className="hero-face-scan" />
        {heroDetectionPoints.map((point) => (
          <span
            key={point.id}
            className="hero-detection-point"
            style={{ left: point.x, top: point.y }}
            aria-label={point.label}
          />
        ))}
      </div>
    </div>
  );
}
