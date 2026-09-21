export const skinScanFileConfig = Object.freeze({
  accept: 'image/jpeg,image/png,image/webp',
  allowedMimeTypes: new Set(['image/jpeg', 'image/png', 'image/webp']),
  allowedExtensions: new Set(['jpg', 'jpeg', 'png', 'webp']),
  maxSizeBytes: 5 * 1024 * 1024,
  formatLabel: 'JPG / PNG / WEBP',
  sizeLabel: '单张图片最大 5 MB',
});

export const scanFlowSteps = [
  { id: 'prepare', number: '01', label: '准备检测' },
  { id: 'confirm', number: '02', label: '确认图片' },
  { id: 'analyze', number: '03', label: 'AI 分析' },
  { id: 'report', number: '04', label: '生成报告' },
];

export const scanProgressStages = [
  { id: 'quality', label: '图像质量检测' },
  { id: 'face', label: '面部区域识别' },
  { id: 'texture', label: '肌肤纹理分析' },
  { id: 'hydration', label: '水润状态分析' },
  { id: 'pores', label: '毛孔状态分析' },
  { id: 'routine', label: '个性化建议生成' },
];

export const scanDetectionPoints = [
  { id: 'forehead', label: '额头检测点', x: '50%', y: '20%' },
  { id: 'left-eye', label: '左眼周检测点', x: '37%', y: '39%' },
  { id: 'right-eye', label: '右眼周检测点', x: '63%', y: '39%' },
  { id: 'nose', label: '鼻翼检测点', x: '51%', y: '51%' },
  { id: 'left-cheek', label: '左脸颊检测点', x: '31%', y: '58%' },
  { id: 'right-cheek', label: '右脸颊检测点', x: '70%', y: '58%' },
  { id: 'mouth', label: '嘴角检测点', x: '42%', y: '70%' },
  { id: 'chin', label: '下巴检测点', x: '51%', y: '80%' },
];

export const skinScore = {
  label: '综合肌肤评分',
  value: 86,
  status: '状态良好',
  condition: '分析完成',
  description: '当前模拟结果显示肌肤状态整体较稳定，建议重点关注水分维持与局部纹理管理。',
};

export const scanMetrics = [
  {
    id: 'hydration',
    label: '水分状态',
    value: 78,
    status: '状态良好',
    description: '水分观感较稳定，日常护理可继续关注补水支持。',
  },
  {
    id: 'pores',
    label: '毛孔可见度',
    value: 24,
    status: '表现优秀',
    description: '可见面部区域的毛孔对比度较低。',
  },
  {
    id: 'acne',
    label: '可见瑕疵倾向',
    value: 18,
    status: '表现优秀',
    description: '模拟观察中可见瑕疵倾向较低。',
  },
  {
    id: 'dark-circles',
    label: '眼周阴影指数',
    value: 32,
    status: '建议关注',
    description: '眼周阴影观感处于轻度水平。',
  },
];

export const aiInsight = {
  title: 'AI 肌肤洞察',
  content: '模拟结果显示肤色均匀度较好，可见瑕疵倾向较低，建议重点关注补水支持、温和纹理管理与日常防护。',
};

export const metricStatusTranslations = Object.freeze({
  Good: '状态良好',
  Low: '表现优秀',
  Moderate: '建议关注',
  Mild: '建议关注',
  Balanced: '状态良好',
  Excellent: '表现优秀',
  Ready: '分析完成',
});

export const routinePriorityTranslations = Object.freeze({
  'Hydration Support': '补水支持',
  'Texture Refinement': '温和纹理管理',
  'Barrier Care': '屏障护理',
  'Daily Protection': '日常防护',
});

export const ingredientTranslations = Object.freeze({
  'Hyaluronic Acid': '透明质酸',
  Niacinamide: '烟酰胺',
  Ceramides: '神经酰胺',
  Panthenol: '泛醇',
  'Green Tea Extract': '绿茶提取物',
});
