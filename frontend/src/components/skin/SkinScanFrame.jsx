import { ImageUp, RefreshCw } from 'lucide-react';
import GradientButton from '../common/GradientButton.jsx';
import { scanDetectionPoints, skinScanFileConfig } from '../../data/skinScanDemo.js';

function formatFileSize(size) {
  if (!Number.isFinite(size)) return '';
  if (size >= 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  return `${Math.max(1, Math.round(size / 1024))} KB`;
}

function FilePicker({ id, disabled, onSelectFile, children }) {
  const handleChange = (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (file) onSelectFile(file);
  };

  return (
    <>
      <input
        id={id}
        className="skin-reselect-input sr-only"
        type="file"
        accept={skinScanFileConfig.accept}
        disabled={disabled}
        onChange={handleChange}
      />
      <label className="skin-reselect-button" htmlFor={id} aria-disabled={disabled || undefined}>
        <ImageUp size={16} aria-hidden="true" />
        {children}
      </label>
    </>
  );
}

export default function SkinScanFrame({
  imageSrc,
  selectedFile,
  state,
  disabled = false,
  showActions = true,
  onSelectFile,
  onAnalyze,
  onRestart,
}) {
  const isLoading = state === 'loading';
  const isSuccess = state === 'success';

  return (
    <div className="skin-scan-frame-panel">
      <div className="skin-scan-frame" data-scanning={isLoading ? 'true' : 'false'}>
        <img src={imageSrc} alt="待分析的面部照片预览" className="skin-scan-image" />
        <div className="skin-scan-grid" aria-hidden="true" />
        <div className="skin-scan-line" aria-hidden="true" />
        <span className="skin-frame-corner skin-frame-corner--tl" aria-hidden="true" />
        <span className="skin-frame-corner skin-frame-corner--tr" aria-hidden="true" />
        <span className="skin-frame-corner skin-frame-corner--bl" aria-hidden="true" />
        <span className="skin-frame-corner skin-frame-corner--br" aria-hidden="true" />
        {isLoading ? scanDetectionPoints.map((point) => (
          <span
            key={point.id}
            className="skin-scan-point"
            style={{ left: point.x, top: point.y }}
            aria-label={point.label}
          />
        )) : null}
        <div className="skin-scan-frame-status" aria-live="polite">
          {isLoading ? 'AI 正在分析' : isSuccess ? '分析已完成' : '照片已就绪'}
        </div>
      </div>

      <div className="skin-file-summary">
        <div className="min-w-0">
          <p className="skin-file-name">{selectedFile?.name}</p>
          <p className="skin-file-meta">{formatFileSize(selectedFile?.size)} · {skinScanFileConfig.formatLabel}</p>
        </div>
        {!isLoading && showActions ? (
          <div className="skin-frame-actions">
            <FilePicker id={`skin-scan-reselect-${state}`} disabled={disabled} onSelectFile={onSelectFile}>
              更换照片
            </FilePicker>
            {isSuccess ? (
              <GradientButton type="button" size="md" icon={RefreshCw} onClick={onRestart}>
                重新检测
              </GradientButton>
            ) : (
              <GradientButton type="button" size="md" onClick={onAnalyze} disabled={disabled}>
                开始 AI 肌肤分析
              </GradientButton>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
