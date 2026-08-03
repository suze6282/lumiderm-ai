export const productSteps = [
  {
    id: 'scan',
    title: 'Scan',
    zhTitle: '采集面部图像',
    description: '上传或拍摄面部照片，系统模拟识别面部区域和肌肤纹理。',
    iconName: 'ScanFace',
  },
  {
    id: 'analyze',
    title: 'Analyze',
    zhTitle: '生成肌肤评分',
    description: '从毛孔、水分、痘痘风险、肤色均匀度等维度生成可视化评分。',
    iconName: 'Radar',
  },
  {
    id: 'recommend',
    title: 'Recommend',
    zhTitle: '匹配护肤建议',
    description: '根据分析结果生成晨间、夜间和每周护理方案。',
    iconName: 'Sparkles',
  },
];
