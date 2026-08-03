import { useEffect, useState } from 'react';
import { Download, Gauge, Loader2, Sparkles, UploadCloud } from 'lucide-react';
import Container from './common/Container.jsx';
import GlowCard from './common/GlowCard.jsx';
import GradientButton from './common/GradientButton.jsx';
import MotionSection from './common/MotionSection.jsx';
import SectionTitle from './common/SectionTitle.jsx';
import { analyzeSkinImage, getBackendAssetUrl } from '../services/skinAnalysisApi.js';
import {
  aiInsight,
  scanDetectionPoints,
  scanMetrics,
  scanStatusTags,
  skinScore,
} from '../data/skinScanDemo.js';
import { cn } from '../lib/utils.js';

const uploadStatusCopy = {
  idle: {
    label: 'Ready for simulated scan',
    progress: '0%',
  },
  selected: {
    label: 'Photo selected. Ready to analyze.',
    progress: '24%',
  },
  loading: {
    label: 'Generating simulated skin analysis...',
    progress: '72%',
  },
  success: {
    label: 'Visual skin report ready',
    progress: '100%',
  },
  error: {
    label: 'Analysis paused',
    progress: '0%',
  },
};

function getFriendlyErrorMessage(error) {
  switch (error?.code) {
    case 'IMAGE_REQUIRED':
      return 'Please choose a JPG, PNG, or WEBP image before starting the simulated analysis.';
    case 'UNSUPPORTED_FILE_TYPE':
      return 'Please upload a JPG, PNG, or WEBP image.';
    case 'FILE_TOO_LARGE':
      return 'Image size must be less than 5MB.';
    case 'REQUEST_FAILED':
      return 'Analysis request failed. Please make sure the backend service is running.';
    default:
      return '图片上传失败，请确认后端服务已启动后重试。';
  }
}

function getScoreData(analysis) {
  if (!analysis) {
    return skinScore;
  }

  return {
    label: 'Overall Skin Score',
    value: analysis.overallScore,
    status: 'Simulated Report',
    condition: 'Ready',
    description: analysis.insight?.zh || skinScore.description,
  };
}

function ScanStatus({ uploadStatus }) {
  const copy = uploadStatusCopy[uploadStatus] || uploadStatusCopy.idle;

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3 text-sm text-lumi-secondary">
        <span className="scan-demo-live-dot" aria-hidden="true" />
        <span>{copy.label}</span>
      </div>
      <div className="rounded-full border border-lumi-line bg-white/[0.04] px-3 py-1 text-xs text-lumi-secondary">
        Scan Progress <span className="font-semibold text-lumi-text">{copy.progress}</span>
      </div>
    </div>
  );
}

function FacePreview({ imageSrc }) {
  return (
    <div className="scan-demo-face-wrap relative mx-auto flex h-[24rem] max-h-[58vw] min-h-[20rem] w-full max-w-[25rem] items-center justify-center">
      <div className="scan-demo-face-halo" aria-hidden="true" />
      <div className="scan-demo-face relative h-full w-[74%] overflow-hidden rounded-[48%_52%_46%_54%/38%_40%_60%_62%] border border-lumi-cyan/20">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="Uploaded face preview"
            className="absolute inset-0 z-[1] h-full w-full object-cover opacity-65 saturate-[0.82]"
          />
        ) : null}
        <div className="scan-demo-face-texture" aria-hidden="true" />
        <div className="scan-demo-line" aria-hidden="true" />
        <svg className="absolute inset-[13%] z-10 h-auto w-auto text-white/70" viewBox="0 0 240 330" aria-hidden="true">
          <path d="M82 118 C104 104 136 104 158 118" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
          <path d="M83 146 C101 137 119 137 137 146" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M146 146 C160 138 174 138 188 146" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M124 138 C117 172 116 194 138 197" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M92 236 C112 252 145 252 166 236" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <svg className="absolute inset-0 z-20 h-full w-full text-lumi-cyan/22" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M50 20 L37 39 L31 58 L42 70 L51 80 L67 58 L62 39 Z" fill="none" stroke="currentColor" strokeWidth="0.28" />
          <path d="M37 39 L62 39 M31 58 L67 58 M42 70 L67 58 M50 20 L51 80" fill="none" stroke="currentColor" strokeWidth="0.22" />
        </svg>
        {scanDetectionPoints.map((point) => (
          <span
            key={point.id}
            className="scan-demo-point"
            style={{ left: point.x, top: point.y }}
            aria-label={point.label}
          />
        ))}
      </div>
    </div>
  );
}

function UploadDemo({
  selectedFile,
  uploadStatus,
  errorMessage,
  onFileChange,
  onAnalyze,
}) {
  const isLoading = uploadStatus === 'loading';

  return (
    <div className="grid gap-3 rounded-2xl border border-lumi-line bg-lumi-black/45 p-4 sm:grid-cols-[1fr_auto] sm:items-center">
      <div>
        <div className="flex items-center gap-2 text-sm font-semibold text-lumi-text">
          <UploadCloud size={17} className="text-lumi-cyan" aria-hidden="true" />
          Upload Face Photo
        </div>
        <p className="mt-2 text-xs leading-5 text-lumi-muted">
          {selectedFile
            ? `${selectedFile.name} · ${(selectedFile.size / 1024).toFixed(1)} KB`
            : 'Use a clear front-facing JPG, PNG, or WEBP image for simulated cosmetic analysis.'}
        </p>
        {errorMessage ? (
          <p className="mt-2 text-xs leading-5 text-[#FF8FB7]">{errorMessage}</p>
        ) : null}
      </div>
      <div className="flex flex-wrap gap-2 sm:justify-end">
        <input
          id="skin-scan-image"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="sr-only"
          onChange={onFileChange}
        />
        <label
          htmlFor="skin-scan-image"
          className="inline-flex min-h-9 cursor-pointer items-center justify-center rounded-full border border-lumi-line bg-white/[0.035] px-4 text-xs font-semibold text-lumi-secondary transition duration-300 hover:border-lumi-lineActive hover:bg-white/[0.07]"
        >
          Choose Photo
        </label>
        <GradientButton
          type="button"
          size="sm"
          icon={isLoading ? Loader2 : UploadCloud}
          disabled={!selectedFile || isLoading}
          onClick={onAnalyze}
        >
          {isLoading ? 'Analyzing' : 'Analyze'}
        </GradientButton>
      </div>
    </div>
  );
}

function ScanPreview({
  imageSrc,
  selectedFile,
  uploadStatus,
  errorMessage,
  onFileChange,
  onAnalyze,
}) {
  return (
    <GlowCard hoverable={false} className="scan-demo-panel min-h-full p-5 sm:p-6">
      <ScanStatus uploadStatus={uploadStatus} />
      <div className="mt-6 rounded-[1.35rem] border border-white/10 bg-lumi-black/35 p-4 placeholder-grid">
        <FacePreview imageSrc={imageSrc} />
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {scanStatusTags.map((tag) => (
          <span key={tag} className="rounded-full border border-lumi-line bg-white/[0.035] px-3 py-1 text-xs text-lumi-secondary">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-5">
        <UploadDemo
          selectedFile={selectedFile}
          uploadStatus={uploadStatus}
          errorMessage={errorMessage}
          onFileChange={onFileChange}
          onAnalyze={onAnalyze}
        />
      </div>
    </GlowCard>
  );
}

function ScoreRing({ score }) {
  const radius = 47;
  const circumference = 2 * Math.PI * radius;
  const scoreValue = Number.isFinite(Number(score.value)) ? Math.min(100, Math.max(0, Number(score.value))) : 0;
  const strokeOffset = circumference - (scoreValue / 100) * circumference;

  return (
    <div className="grid gap-5 rounded-2xl border border-lumi-line bg-white/[0.035] p-5 sm:grid-cols-[9rem_1fr] sm:items-center">
      <div className="relative mx-auto size-36">
        <svg className="size-full -rotate-90" viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="9" />
          <circle
            className="scan-demo-score-ring"
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="url(#skin-score-gradient)"
            strokeDasharray={circumference}
            strokeDashoffset={strokeOffset}
            strokeLinecap="round"
            strokeWidth="9"
          />
          <defs>
            <linearGradient id="skin-score-gradient" x1="14" x2="104" y1="16" y2="104">
              <stop stopColor="#FF4FD8" />
              <stop offset="0.48" stopColor="#9B5CFF" />
              <stop offset="1" stopColor="#4CC9F0" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <strong className="text-5xl font-semibold tracking-tight text-lumi-text">{scoreValue}</strong>
          <span className="text-xs text-lumi-muted">/ 100</span>
        </div>
      </div>
      <div>
        <p className="text-sm text-lumi-secondary">{score.label}</p>
        <h3 className="mt-2 text-2xl font-semibold text-lumi-text">{score.status} · {score.condition}</h3>
        <p className="mt-4 text-sm leading-6 text-lumi-secondary">{score.description}</p>
      </div>
    </div>
  );
}

function MetricProgress({ metric }) {
  const metricValue = Number.isFinite(Number(metric.value)) ? Math.min(100, Math.max(0, Number(metric.value))) : 0;

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-lumi-text">{metric.label}</p>
          <p className="mt-1 text-xs text-lumi-muted">{metric.zhLabel} · {metric.status}</p>
        </div>
        <strong className="text-sm text-lumi-text">{metricValue}%</strong>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.06]" aria-hidden="true">
        <div className="scan-demo-progress h-full rounded-full" style={{ '--metric-value': `${metricValue}%` }} />
      </div>
      <p className="mt-3 text-xs leading-5 text-lumi-muted">{metric.description}</p>
    </div>
  );
}

function InsightCard({ insight }) {
  const insightData = insight
    ? {
        title: 'AI Insight',
        content: insight.en,
        zhContent: insight.zh,
      }
    : aiInsight;

  return (
    <GlowCard hoverable={false} className="p-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-lumi-text">
        <Sparkles size={17} className="text-lumi-cyan" aria-hidden="true" />
        {insightData.title}
      </div>
      <p className="mt-3 text-sm leading-6 text-lumi-secondary">{insightData.content}</p>
      <p className="mt-3 text-xs leading-5 text-lumi-muted">{insightData.zhContent}</p>
    </GlowCard>
  );
}

function RoutineSuggestion({ routineSuggestion }) {
  if (!routineSuggestion) {
    return null;
  }

  const priorities = routineSuggestion.priorities || [];
  const ingredients = routineSuggestion.ingredients || [];

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-lumi-text">
        <Sparkles size={17} className="text-lumi-cyan" aria-hidden="true" />
        Personalized Routine Direction
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {priorities.map((priority) => (
          <span key={priority} className="rounded-full border border-lumi-line bg-white/[0.035] px-3 py-1 text-xs text-lumi-secondary">
            {priority}
          </span>
        ))}
      </div>
      {ingredients.length ? (
        <p className="mt-3 text-xs leading-5 text-lumi-muted">
          Suggested ingredients: {ingredients.join(', ')}
        </p>
      ) : null}
    </div>
  );
}

function AnalysisPanel({ analysis }) {
  const score = getScoreData(analysis);
  const metrics = analysis?.metrics?.length ? analysis.metrics : scanMetrics;
  const disclaimer = analysis?.disclaimer || 'Cosmetic analysis demo only. Not for medical diagnosis.';
  const zhDisclaimer = analysis?.zhDisclaimer || '本演示仅用于美容护肤分析概念展示，不构成医疗诊断或治疗建议。';

  return (
    <GlowCard hoverable={false} className="min-h-full p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <Gauge size={20} className="text-lumi-cyan" aria-hidden="true" />
        <h3 className="text-xl font-semibold">Visual Skin Report</h3>
      </div>
      <div className="mt-6">
        <ScoreRing score={score} />
      </div>
      <div className="mt-5 grid gap-3">
        {metrics.map((metric) => (
          <MetricProgress key={metric.id} metric={metric} />
        ))}
      </div>
      <div className="mt-5">
        <InsightCard insight={analysis?.insight} />
      </div>
      <div className="mt-5">
        <RoutineSuggestion routineSuggestion={analysis?.routineSuggestion} />
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <GradientButton href="#personalization">Generate Routine</GradientButton>
        <GradientButton variant="secondary" icon={Download}>Export Demo Report</GradientButton>
      </div>
      <p className="mt-6 text-xs leading-5 text-lumi-muted">
        {disclaimer}
        <br />
        {zhDisclaimer}
      </p>
    </GlowCard>
  );
}

export default function SkinScanDemo({ className = '' }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploadStatus, setUploadStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [result, setResult] = useState(null);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setResult(null);
    setErrorMessage('');
    setUploadStatus('selected');
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setErrorMessage('Please choose a JPG, PNG, or WEBP image before starting the simulated analysis.');
      setUploadStatus('error');
      return;
    }

    setUploadStatus('loading');
    setErrorMessage('');

    try {
      const data = await analyzeSkinImage(selectedFile);
      setResult(data);
      setUploadStatus('success');
    } catch (error) {
      setErrorMessage(getFriendlyErrorMessage(error));
      setUploadStatus('error');
    }
  };

  const imageSrc = result?.image?.imageUrl ? getBackendAssetUrl(result.image.imageUrl) : previewUrl;

  return (
    <MotionSection id="analysis" data-module="skin-scan-demo" className={cn('section-spacing', className)}>
      <Container>
        <SectionTitle
          eyebrow="LIVE AI SKIN SCAN"
          title="AI Skin Scan Demo"
          subtitle="模拟上传面部照片后，LumiDerm AI 会分析肌肤状态，并生成可视化评分报告与护理建议方向。"
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2 xl:gap-8">
          <ScanPreview
            imageSrc={imageSrc}
            selectedFile={selectedFile}
            uploadStatus={uploadStatus}
            errorMessage={errorMessage}
            onFileChange={handleFileChange}
            onAnalyze={handleAnalyze}
          />
          <AnalysisPanel analysis={result?.analysis} />
        </div>
      </Container>
    </MotionSection>
  );
}
