export const scanStatusTags = ['Live Scan', 'Facial Mapping', 'Texture Detection', 'Cosmetic Analysis'];

export const scanDetectionPoints = [
  { id: 'forehead', label: 'Forehead', x: '50%', y: '20%' },
  { id: 'left-eye', label: 'Eye Area', x: '37%', y: '39%' },
  { id: 'right-eye', label: 'Eye Area', x: '63%', y: '39%' },
  { id: 'nose', label: 'Nose Wing', x: '51%', y: '51%' },
  { id: 'left-cheek', label: 'Left Cheek', x: '31%', y: '58%' },
  { id: 'right-cheek', label: 'Right Cheek', x: '70%', y: '58%' },
  { id: 'mouth', label: 'Mouth Corner', x: '42%', y: '70%' },
  { id: 'chin', label: 'Chin', x: '51%', y: '80%' },
];

export const skinScore = {
  label: 'Overall Skin Score',
  value: 86,
  status: 'Balanced',
  condition: 'Good Condition',
  description: '当前模拟结果显示肌肤状态整体较稳定，建议重点关注水分维持与局部纹理管理。',
};

export const scanMetrics = [
  {
    id: 'hydration',
    label: 'Hydration Level',
    zhLabel: '水分水平',
    value: 78,
    status: 'Good',
    description: 'Moisture support appears stable in this sample profile.',
  },
  {
    id: 'pore-visibility',
    label: 'Pore Visibility',
    zhLabel: '毛孔可见度',
    value: 24,
    status: 'Low',
    description: 'Visible pore texture remains low in the preview zones.',
  },
  {
    id: 'acne-risk',
    label: 'Acne Risk',
    zhLabel: '痘痘风险',
    value: 18,
    status: 'Low',
    description: 'Sample blemish-prone signal is low for cosmetic care planning.',
  },
  {
    id: 'dark-circle',
    label: 'Dark Circle Index',
    zhLabel: '黑眼圈指数',
    value: 32,
    status: 'Mild',
    description: 'Under-eye shadow signal is mild in this simulated report.',
  },
  {
    id: 'skin-tone',
    label: 'Skin Tone Balance',
    zhLabel: '肤色均匀度',
    value: 91,
    status: 'Excellent',
    description: 'Tone balance appears strong across the visible face zones.',
  },
  {
    id: 'aging-index',
    label: 'Aging Index',
    zhLabel: '抗老指数',
    value: 22,
    status: 'Low',
    description: 'Visible line signal is low in this sample analysis.',
  },
];

export const aiInsight = {
  title: 'AI Insight',
  content:
    'Your skin profile shows strong tone balance and low acne risk. Focus on hydration support and gentle texture refinement for a smoother beauty routine.',
  zhContent: '模拟结果显示肤色均匀度较好，痘痘风险较低，建议重点关注补水维持与温和纹理管理。',
};
