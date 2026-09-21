import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m as motion, useReducedMotion } from 'framer-motion';
import { AlertCircle, Check, Gauge, Info, RefreshCw, ShieldCheck, Sparkles } from 'lucide-react';
import Container from './common/Container.jsx';
import GlowCard from './common/GlowCard.jsx';
import GradientButton from './common/GradientButton.jsx';
import MotionSection from './common/MotionSection.jsx';
import SectionTitle from './common/SectionTitle.jsx';
import SkinUploadZone from './skin/SkinUploadZone.jsx';
import SkinScanFrame from './skin/SkinScanFrame.jsx';
import SkinAnalysisProgress, { SkinScanFlow } from './skin/SkinAnalysisProgress.jsx';
import { analyzeSkinImage } from '../services/skinAnalysisApi.js';
import {
  aiInsight,
  ingredientTranslations,
  metricStatusTranslations,
  routinePriorityTranslations,
  scanMetrics,
  skinScanFileConfig,
  skinScore,
} from '../data/skinScanDemo.js';
import { motionDuration, motionEase } from '../lib/motion.js';
import { cn } from '../lib/utils.js';

const presentationProgress = [
  { delay: 180, value: 18 },
  { delay: 420, value: 34 },
  { delay: 760, value: 52 },
  { delay: 1180, value: 69 },
  { delay: 1720, value: 83 },
  { delay: 2360, value: 92 },
];

const wait = (milliseconds) => new Promise((resolve) => {
  window.setTimeout(resolve, milliseconds);
});

function createValidationError(code) {
  const error = new Error(code);
  error.code = code;
  return error;
}

function validateImageFile(file) {
  if (!file) throw createValidationError('IMAGE_REQUIRED');

  const extension = file.name.split('.').pop()?.toLowerCase() || '';
  if (!skinScanFileConfig.allowedMimeTypes.has(file.type) || !skinScanFileConfig.allowedExtensions.has(extension)) {
    throw createValidationError('UNSUPPORTED_FILE_TYPE');
  }

  if (file.size > skinScanFileConfig.maxSizeBytes) {
    throw createValidationError('FILE_TOO_LARGE');
  }
}

function getFriendlyErrorMessage(error) {
  switch (error?.code) {
    case 'IMAGE_REQUIRED':
      return '请先选择一张清晰的正面面部照片。';
    case 'UNSUPPORTED_FILE_TYPE':
      return '暂不支持该图片格式，请上传 JPG、PNG 或 WEBP 图片。';
    case 'FILE_TOO_LARGE':
      return '图片大小超过 5 MB，请选择更小的图片。';
    case 'REQUEST_FAILED':
    case 'ANALYSIS_REQUEST_FAILED':
    case 'DATABASE_SAVE_FAILED':
    case 'INTERNAL_SERVER_ERROR':
    case 'VALIDATION_ERROR':
      return '暂时无法完成分析，请稍后重试。';
    default:
      return '分析暂时未完成，请稍后重试或更换照片。';
  }
}

function getScoreData(analysis) {
  if (!analysis) return skinScore;

  return {
    label: '综合肌肤评分',
    value: analysis.overallScore,
    status: '状态良好',
    condition: '分析完成',
    description: analysis.insight?.zh || skinScore.description,
  };
}

function getMetricData(metric) {
  return {
    id: metric.id,
    label: metric.zhLabel || metric.label || '肌肤指标',
    value: metric.value,
    status: metricStatusTranslations[metric.status] || metric.status || '已记录',
    description: metric.zhDescription || metric.description || '该指标已完成模拟分析。',
  };
}

function ScoreRing({ score }) {
  const radius = 47;
  const circumference = 2 * Math.PI * radius;
  const scoreValue = Number.isFinite(Number(score.value)) ? Math.min(100, Math.max(0, Number(score.value))) : 0;
  const strokeOffset = circumference - (scoreValue / 100) * circumference;

  return (
    <div className="skin-result-score">
      <div className="skin-score-ring" role="img" aria-label={`${score.label} ${scoreValue} 分`}>
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="8" />
          <circle
            className="skin-score-ring-value"
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="url(#skin-score-gradient-v2)"
            strokeDasharray={circumference}
            strokeDashoffset={strokeOffset}
            strokeLinecap="round"
            strokeWidth="8"
          />
          <defs>
            <linearGradient id="skin-score-gradient-v2" x1="20" x2="100" y1="18" y2="102">
              <stop stopColor="#b59cff" />
              <stop offset="1" stopColor="#84d4ff" />
            </linearGradient>
          </defs>
        </svg>
        <span><strong>{scoreValue}</strong><small>/ 100</small></span>
      </div>
      <div>
        <p className="skin-result-label">{score.label}</p>
        <h3>{score.status}</h3>
        <p className="skin-result-condition">{score.condition}</p>
        <p className="skin-result-description">{score.description}</p>
      </div>
    </div>
  );
}

function MetricProgress({ metric }) {
  const normalizedMetric = getMetricData(metric);
  const metricValue = Number.isFinite(Number(normalizedMetric.value))
    ? Math.min(100, Math.max(0, Number(normalizedMetric.value)))
    : 0;

  return (
    <div className="skin-result-metric">
      <div className="skin-result-metric-head">
        <div>
          <p>{normalizedMetric.label}</p>
          <span>{normalizedMetric.status}</span>
        </div>
        <strong>{metricValue}%</strong>
      </div>
      <div className="skin-result-meter" aria-hidden="true">
        <span style={{ '--metric-value': `${metricValue}%` }} />
      </div>
      <p className="skin-result-metric-copy">{normalizedMetric.description}</p>
    </div>
  );
}

function InsightCard({ insight }) {
  const content = insight?.zh || aiInsight.content;

  return (
    <div className="skin-result-insight">
      <div className="skin-result-subheading">
        <Sparkles size={17} aria-hidden="true" />
        <h4>AI 肌肤洞察</h4>
      </div>
      <p>{content}</p>
    </div>
  );
}

function RoutineSuggestion({ routineSuggestion }) {
  if (!routineSuggestion) return null;

  const priorities = (routineSuggestion.priorities || [])
    .map((item) => routinePriorityTranslations[item])
    .filter(Boolean);
  const ingredients = (routineSuggestion.ingredients || [])
    .map((item) => ingredientTranslations[item])
    .filter(Boolean);

  return (
    <div className="skin-result-routine">
      <div className="skin-result-subheading">
        <ShieldCheck size={17} aria-hidden="true" />
        <h4>个性化护理方向</h4>
      </div>
      {priorities.length ? (
        <div className="skin-result-priorities">
          {priorities.map((priority) => <span key={priority}>{priority}</span>)}
        </div>
      ) : null}
      {ingredients.length ? (
        <p><strong>建议关注的护肤成分：</strong>{ingredients.join('、')}</p>
      ) : null}
    </div>
  );
}

function AnalysisPanel({ analysis }) {
  const score = getScoreData(analysis);
  const metrics = analysis?.metrics?.length ? analysis.metrics : scanMetrics;
  const summaryMetrics = metrics.slice(0, 4);
  const disclaimer = '分析结果仅用于美容护肤方向参考。';

  return (
    <GlowCard hoverable={false} variant="elevated" className="skin-result-panel">
      <div className="skin-result-heading">
        <span><Gauge size={20} aria-hidden="true" /></span>
        <div>
          <p>肌肤分析完成</p>
          <h3>肌肤分析摘要</h3>
        </div>
      </div>

      <ScoreRing score={score} />

      <div className="skin-result-metrics">
        {summaryMetrics.map((metric) => <MetricProgress key={metric.id} metric={metric} />)}
      </div>

      <InsightCard insight={analysis?.insight} />
      <RoutineSuggestion routineSuggestion={analysis?.routineSuggestion} />

      <GradientButton href="#skin-metrics" size="lg" className="mt-6 w-full sm:w-auto">
        查看完整肌肤智能分析
      </GradientButton>

      <p className="skin-result-disclaimer"><Info size={15} aria-hidden="true" />{disclaimer}</p>
    </GlowCard>
  );
}

function PhotoReadyPanel() {
  const checks = ['照片清晰可见', '图片格式与大小符合要求', '可以开始模拟肌肤分析'];

  return (
    <div className="skin-ready-panel">
      <p className="skin-ready-kicker">照片已就绪</p>
      <h3>确认后开始 AI 分析</h3>
      <p>请确认照片为清晰的正面面部图像。分析开始后，页面会展示阶段进度并等待服务生成最终报告。</p>
      <ul>
        {checks.map((item) => (
          <li key={item}><Check size={15} aria-hidden="true" />{item}</li>
        ))}
      </ul>
    </div>
  );
}

function ErrorState({ message, onRetry, onReset }) {
  return (
    <div className="skin-error-state" role="alert">
      <span className="skin-error-icon" aria-hidden="true"><AlertCircle size={22} /></span>
      <p className="skin-error-kicker">分析暂时未完成</p>
      <h3>请重新尝试</h3>
      <p>{message || '可能由于网络连接或服务暂时不可用，请稍后重试。'}</p>
      <div className="skin-error-actions">
        <GradientButton type="button" icon={RefreshCw} onClick={onRetry}>重新分析</GradientButton>
        <GradientButton type="button" variant="secondary" onClick={onReset}>更换照片</GradientButton>
      </div>
    </div>
  );
}

export default function SkinScanDemo({ className = '' }) {
  const reduceMotion = useReducedMotion();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [scanState, setScanState] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [result, setResult] = useState(null);
  const [progress, setProgress] = useState(0);
  const previewUrlRef = useRef('');
  const progressTimersRef = useRef([]);
  const requestIdRef = useRef(0);

  const clearProgressTimers = () => {
    progressTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    progressTimersRef.current = [];
  };

  useEffect(() => () => {
    requestIdRef.current += 1;
    clearProgressTimers();
    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
  }, []);

  const replacePreview = (file) => {
    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    const nextUrl = URL.createObjectURL(file);
    previewUrlRef.current = nextUrl;
    setPreviewUrl(nextUrl);
  };

  const handleSelectFile = (file) => {
    try {
      validateImageFile(file);
    } catch (error) {
      setErrorMessage(getFriendlyErrorMessage(error));
      return;
    }

    requestIdRef.current += 1;
    clearProgressTimers();
    replacePreview(file);
    setSelectedFile(file);
    setResult(null);
    setProgress(0);
    setErrorMessage('');
    setScanState('selected');
  };

  const startPresentationProgress = () => {
    clearProgressTimers();
    setProgress(8);
    progressTimersRef.current = presentationProgress.map(({ delay, value }) => window.setTimeout(() => {
      setProgress(value);
    }, delay));
  };

  const handleAnalyze = async () => {
    if (scanState === 'loading') return;

    if (!selectedFile) {
      setErrorMessage(getFriendlyErrorMessage({ code: 'IMAGE_REQUIRED' }));
      return;
    }

    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    setScanState('loading');
    setResult(null);
    setErrorMessage('');
    startPresentationProgress();

    try {
      const [data] = await Promise.all([analyzeSkinImage(selectedFile), wait(550)]);
      if (requestIdRef.current !== requestId) return;
      clearProgressTimers();
      setProgress(100);
      setResult(data);
      setScanState('success');
    } catch (error) {
      if (requestIdRef.current !== requestId) return;
      clearProgressTimers();
      setErrorMessage(getFriendlyErrorMessage(error));
      setScanState('error');
    }
  };

  const handleRestart = () => {
    requestIdRef.current += 1;
    clearProgressTimers();
    setResult(null);
    setProgress(0);
    setErrorMessage('');
    setScanState(selectedFile ? 'selected' : 'idle');
  };

  const handleReset = () => {
    requestIdRef.current += 1;
    clearProgressTimers();
    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    previewUrlRef.current = '';
    setPreviewUrl('');
    setSelectedFile(null);
    setResult(null);
    setProgress(0);
    setErrorMessage('');
    setScanState('idle');
  };

  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: motionDuration.normal, ease: motionEase };

  return (
    <MotionSection
      id="analysis"
      data-module="skin-scan-demo"
      className={cn('skin-scan-section section-spacing', className)}
    >
      <Container>
        <SectionTitle
          eyebrow="AI 肌肤检测"
          title="让 AI 看见肌肤的细节"
          subtitle="上传一张清晰的正面照片，LumiDerm AI 将模拟分析多项肌肤指标，并生成个性化护理建议。"
        />

        <div className="skin-scan-shell">
          <SkinScanFlow state={scanState} />

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={scanState}
              initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.995 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={transition}
            >
              {scanState === 'idle' ? (
                <SkinUploadZone errorMessage={errorMessage} onSelectFile={handleSelectFile} />
              ) : null}

              {scanState === 'selected' ? (
                <div className="skin-scan-workspace">
                  <SkinScanFrame
                    imageSrc={previewUrl}
                    selectedFile={selectedFile}
                    state={scanState}
                    onSelectFile={handleSelectFile}
                    onAnalyze={handleAnalyze}
                    onRestart={handleRestart}
                  />
                  <PhotoReadyPanel />
                </div>
              ) : null}

              {scanState === 'loading' ? (
                <div className="skin-scan-workspace">
                  <SkinScanFrame
                    imageSrc={previewUrl}
                    selectedFile={selectedFile}
                    state={scanState}
                    disabled
                    onSelectFile={handleSelectFile}
                    onAnalyze={handleAnalyze}
                    onRestart={handleRestart}
                  />
                  <SkinAnalysisProgress progress={progress} />
                </div>
              ) : null}

              {scanState === 'error' ? (
                <div className="skin-scan-workspace">
                  <SkinScanFrame
                    imageSrc={previewUrl}
                    selectedFile={selectedFile}
                    state={scanState}
                    showActions={false}
                    onSelectFile={handleSelectFile}
                    onAnalyze={handleAnalyze}
                    onRestart={handleRestart}
                  />
                  <ErrorState message={errorMessage} onRetry={handleAnalyze} onReset={handleReset} />
                </div>
              ) : null}

              {scanState === 'success' ? (
                <div className="skin-scan-success">
                  <SkinScanFrame
                    imageSrc={previewUrl}
                    selectedFile={selectedFile}
                    state={scanState}
                    onSelectFile={handleSelectFile}
                    onAnalyze={handleAnalyze}
                    onRestart={handleRestart}
                  />
                  <AnalysisPanel analysis={result?.analysis} />
                </div>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="skin-medical-boundary">
          <Info size={16} aria-hidden="true" />
          LumiDerm AI 提供的是美容护肤方向的模拟肌肤分析与护理建议，不构成医疗诊断或治疗建议。
        </p>
      </Container>
    </MotionSection>
  );
}
