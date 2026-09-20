import { heroDetectionPoints } from '../data/heroData.js';

export default function HeroPortraitLayer() {
  return (
    <div
      className="hero-portrait-layer"
      data-portrait-status="abstract-fallback"
      role="img"
      aria-label="AI 肌肤分析视觉，展示抽象面部轮廓、肌肤映射与检测节点"
    >
      <div className="hero-portrait-aura" aria-hidden="true" />
      <div className="hero-portrait-surface" aria-hidden="true">
        <svg className="hero-face-vector" viewBox="0 0 520 640" fill="none">
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
          <path
            d="M248 72C166 90 119 163 117 253C115 327 146 424 206 510C239 558 285 583 331 565C372 548 393 500 405 452C417 405 408 372 433 338C458 305 455 271 432 246C414 226 409 200 401 169C383 103 321 56 248 72Z"
            stroke="url(#faceContour)"
            strokeWidth="1.6"
          />
          <path d="M194 240C219 224 250 223 276 238" stroke="url(#faceContour)" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M302 233C327 218 357 220 377 238" stroke="url(#faceContour)" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M222 258C238 249 256 250 270 259C254 267 237 268 222 258Z" stroke="url(#faceContour)" strokeWidth="1.1" />
          <path d="M312 254C329 246 348 248 362 258C346 266 327 265 312 254Z" stroke="url(#faceContour)" strokeWidth="1.1" />
          <path d="M291 245C282 299 273 334 299 348C315 356 331 351 343 343" stroke="url(#faceContour)" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M248 407C280 430 328 430 361 402" stroke="url(#faceContour)" strokeWidth="1.35" strokeLinecap="round" />
          <path d="M263 416C286 425 316 425 341 411" stroke="url(#faceContour)" strokeWidth="0.9" strokeLinecap="round" opacity="0.6" />
          <g stroke="url(#faceMesh)" strokeWidth="0.72">
            <path d="M220 158L294 119L361 166L388 245L366 324L402 386L348 482L270 518L205 450L166 342L185 245L220 158Z" />
            <path d="M220 158L276 238L185 245M294 119L276 238L361 166M276 238L291 341L185 245M276 238L388 245L291 341M185 245L166 342L291 341M388 245L366 324L291 341M166 342L205 450L291 341M366 324L402 386L291 341M205 450L270 518L291 341M402 386L348 482L291 341M270 518L348 482" />
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
