import { useRef, useState } from 'react';
import { ImagePlus, ShieldCheck, UploadCloud } from 'lucide-react';
import { skinScanFileConfig } from '../../data/skinScanDemo.js';
import { cn } from '../../lib/utils.js';

export default function SkinUploadZone({ errorMessage = '', disabled = false, onSelectFile }) {
  const dragDepthRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileInput = (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (file) onSelectFile(file);
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    if (disabled) return;
    dragDepthRef.current += 1;
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    if (disabled) return;
    dragDepthRef.current = Math.max(0, dragDepthRef.current - 1);
    if (dragDepthRef.current === 0) setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    dragDepthRef.current = 0;
    setIsDragging(false);
    if (disabled) return;
    const file = event.dataTransfer.files?.[0];
    if (file) onSelectFile(file);
  };

  return (
    <div className="skin-upload-block">
      <div
        className={cn('skin-upload-zone', isDragging && 'is-dragging', errorMessage && 'has-error')}
        onDragEnter={handleDragEnter}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          id="skin-scan-image"
          className="skin-upload-input sr-only"
          type="file"
          accept={skinScanFileConfig.accept}
          disabled={disabled}
          aria-describedby="skin-upload-formats skin-upload-privacy"
          onChange={handleFileInput}
        />
        <label className="skin-upload-label" htmlFor="skin-scan-image" aria-disabled={disabled || undefined}>
          <span className="skin-upload-icon" aria-hidden="true">
            {isDragging ? <ImagePlus size={29} /> : <UploadCloud size={29} />}
          </span>
          <span className="skin-upload-title">{isDragging ? '松开即可上传' : '上传面部照片'}</span>
          <span className="skin-upload-copy">
            {isDragging ? '我们会先检查图片格式和大小' : (
              <>
                <span className="skin-upload-copy-desktop">拖拽照片到这里，或点击选择照片</span>
                <span className="skin-upload-copy-mobile">点击选择一张清晰的正面照片</span>
              </>
            )}
          </span>
          <span id="skin-upload-formats" className="skin-upload-formats">
            支持 {skinScanFileConfig.formatLabel}，{skinScanFileConfig.sizeLabel}
          </span>
          <span className="skin-upload-action">选择照片</span>
        </label>
        <span className="skin-upload-corner skin-upload-corner--tl" aria-hidden="true" />
        <span className="skin-upload-corner skin-upload-corner--tr" aria-hidden="true" />
        <span className="skin-upload-corner skin-upload-corner--bl" aria-hidden="true" />
        <span className="skin-upload-corner skin-upload-corner--br" aria-hidden="true" />
      </div>

      {errorMessage ? <p className="skin-upload-error" role="alert">{errorMessage}</p> : null}

      <p id="skin-upload-privacy" className="skin-upload-privacy">
        <ShieldCheck size={15} aria-hidden="true" />
        <span>照片会发送至本地演示服务以生成模拟报告，请勿上传包含其他敏感信息的图片。</span>
      </p>
    </div>
  );
}
