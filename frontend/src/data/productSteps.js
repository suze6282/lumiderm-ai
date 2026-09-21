export const productSteps = [
  {
    id: 'scan',
    title: '开始肌肤检测',
    summary: '采集面部图像',
    description: '上传清晰的正面照片，系统模拟识别面部区域和肌肤纹理。',
    iconName: 'ScanFace',
  },
  {
    id: 'analyze',
    title: '生成肌肤分析',
    summary: '呈现肌肤评分',
    description: '从毛孔、水分、可见瑕疵倾向、肤色均匀度等维度生成可视化评分。',
    iconName: 'Radar',
  },
  {
    id: 'recommend',
    title: '整理护理建议',
    summary: '生成护理方案',
    description: '根据分析结果生成晨间、夜间和每周护理方案。',
    iconName: 'Sparkles',
  },
];
