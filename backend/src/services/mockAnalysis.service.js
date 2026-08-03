import crypto from 'node:crypto';

const disclaimer = 'Cosmetic analysis demo only. Not for medical diagnosis.';
const zhDisclaimer = '本演示仅用于美容护肤分析概念展示，不构成医疗诊断或治疗建议。';

const createAnalysisId = (timestamp = Date.now()) => {
  return `analysis_${timestamp}_${crypto.randomBytes(3).toString('hex')}`;
};

const metricTemplates = [
  {
    id: 'hydration',
    label: 'Hydration Level',
    zhLabel: '水分状态',
    value: 78,
    status: 'Good',
    description: 'Simulated skin insights suggest the visual moisture balance is steady, with room for daily hydration support.',
    zhDescription: '模拟肌肤观察显示水分观感较稳定，日常护理可继续关注补水支持。',
  },
  {
    id: 'pores',
    label: 'Pore Visibility',
    zhLabel: '毛孔可见度',
    value: 24,
    status: 'Low',
    description: 'Visible pore contrast appears relatively low in this visual skin report.',
    zhDescription: '本次视觉肌肤报告中，毛孔可见度相对较低。',
  },
  {
    id: 'acne',
    label: 'Blemish Tendency',
    zhLabel: '痘痘倾向',
    value: 18,
    status: 'Low',
    description: 'The simulated analysis shows a low visible blemish tendency in the uploaded image.',
    zhDescription: '模拟分析显示，上传图片中的可见瑕疵倾向较低。',
  },
  {
    id: 'dark-circles',
    label: 'Dark Circle Index',
    zhLabel: '黑眼圈指数',
    value: 32,
    status: 'Moderate',
    description: 'Eye-area shadowing is present at a mild to moderate visual level.',
    zhDescription: '眼周阴影观感处于轻至中等水平。',
  },
  {
    id: 'skin-tone',
    label: 'Skin Tone Evenness',
    zhLabel: '肤色均匀度',
    value: 84,
    status: 'Good',
    description: 'Tone balance appears strong across the visible facial area.',
    zhDescription: '可见面部区域的肤色均匀度表现较好。',
  },
  {
    id: 'texture',
    label: 'Skin Texture',
    zhLabel: '肌肤纹理',
    value: 71,
    status: 'Good',
    description: 'Texture appears generally smooth, with gentle refinement as a useful care direction.',
    zhDescription: '肌肤纹理整体较平滑，可将温和细致护理作为方向。',
  },
  {
    id: 'oil-balance',
    label: 'Oil Balance',
    zhLabel: '水油平衡',
    value: 69,
    status: 'Balanced',
    description: 'The simulated profile suggests a balanced surface finish with no strong shine pattern.',
    zhDescription: '模拟结果显示表面观感较均衡，没有明显强反光倾向。',
  },
  {
    id: 'aging',
    label: 'Visual Age Indicators',
    zhLabel: '视觉年龄相关指标',
    value: 29,
    status: 'Low',
    description: 'Visible fine-line and firmness cues appear low in this cosmetic analysis demo.',
    zhDescription: '在本美容护肤分析演示中，可见细纹与紧致度相关线索较低。',
  },
];

const faceMappingTemplates = [
  {
    id: 'forehead',
    label: 'Forehead Area',
    zhLabel: '额头区域',
    score: 82,
    observation: 'The forehead area appears visually even, with light texture attention as a care direction.',
    zhObservation: '额头区域观感较均匀，可适度关注细致纹理护理。',
  },
  {
    id: 'eye-area',
    label: 'Eye Area',
    zhLabel: '眼周区域',
    score: 74,
    observation: 'The eye area shows mild shadowing, so hydration support and rest-focused care direction may help the routine feel balanced.',
    zhObservation: '眼周区域有轻微阴影观感，护理方向可关注补水支持与规律作息配合。',
  },
  {
    id: 'nose',
    label: 'Nose and Wing Area',
    zhLabel: '鼻翼与鼻部区域',
    score: 76,
    observation: 'The nose area shows moderate pore visibility, making gentle texture refinement a useful focus.',
    zhObservation: '鼻部与鼻翼区域毛孔可见度中等，可将温和纹理管理作为护理重点之一。',
  },
  {
    id: 'cheeks',
    label: 'Cheeks',
    zhLabel: '脸颊区域',
    score: 85,
    observation: 'Cheek tone appears balanced with a smooth visual finish.',
    zhObservation: '脸颊区域肤色观感较均衡，整体表面观感较平滑。',
  },
  {
    id: 'chin',
    label: 'Chin Area',
    zhLabel: '下巴区域',
    score: 79,
    observation: 'The chin area appears stable, with barrier care as a steady routine direction.',
    zhObservation: '下巴区域观感较稳定，可继续关注屏障支持类日常护理。',
  },
];

const routineSuggestion = {
  priorities: ['Hydration Support', 'Texture Refinement', 'Barrier Care', 'Daily Protection'],
  morning: [
    'Use a gentle cleanser or rinse according to skin comfort.',
    'Apply lightweight hydration support.',
    'Finish with daily broad-spectrum sun protection.',
  ],
  evening: [
    'Cleanse gently to remove daily residue.',
    'Use a barrier-supporting moisturizer.',
    'Add mild texture refinement only when the skin feels comfortable.',
  ],
  weekly: [
    'Use a soothing hydration mask once or twice weekly.',
    'Keep exfoliation gentle and occasional.',
  ],
  ingredients: ['Hyaluronic Acid', 'Niacinamide', 'Ceramides', 'Panthenol', 'Green Tea Extract'],
};

const insight = {
  en: 'This simulated visual skin report shows strong tone balance and low visible blemish tendency. A practical care direction is hydration support, gentle texture refinement, barrier care, and consistent daily protection.',
  zh: '本次模拟视觉肌肤报告显示肤色均匀度较好，可见瑕疵倾向较低。护理方向可重点关注补水支持、温和纹理管理、屏障护理与日常防护。',
};

const cloneMetrics = (metricOverrides = []) => {
  return metricTemplates.map((metric, index) => ({
    ...metric,
    ...(metricOverrides[index] || {}),
  }));
};

const cloneFaceMapping = (zoneOverrides = []) => {
  return faceMappingTemplates.map((zone, index) => ({
    ...zone,
    ...(zoneOverrides[index] || {}),
  }));
};

const createAnalysisReport = ({
  analysisId = 'demo_001',
  imageUrl = '/uploads/demo-face.jpg',
  overallScore = 86,
  metricOverrides = [],
  faceMappingOverrides = [],
  createdAt = '2026-07-01T00:00:00.000Z',
} = {}) => ({
  analysisId,
  imageUrl,
  overallScore,
  metrics: cloneMetrics(metricOverrides),
  faceMapping: cloneFaceMapping(faceMappingOverrides),
  insight,
  routineSuggestion,
  disclaimer,
  zhDisclaimer,
  createdAt,
});

export const generateMockSkinAnalysis = (imageInfo = {}) => {
  const timestamp = Date.now();
  return createAnalysisReport({
    analysisId: createAnalysisId(timestamp),
    imageUrl: imageInfo.imageUrl || null,
    createdAt: new Date(timestamp).toISOString(),
  });
};

const mockReports = [
  createAnalysisReport(),
  createAnalysisReport({
    analysisId: 'demo_002',
    imageUrl: '/uploads/demo-face-2.jpg',
    overallScore: 82,
    metricOverrides: [
      { value: 72, status: 'Good' },
      { value: 31, status: 'Moderate' },
      { value: 22, status: 'Low' },
      { value: 38, status: 'Moderate' },
      { value: 79, status: 'Good' },
      { value: 68, status: 'Balanced' },
      { value: 64, status: 'Balanced' },
      { value: 34, status: 'Moderate' },
    ],
    faceMappingOverrides: [
      { score: 79 },
      { score: 72 },
      { score: 73 },
      { score: 81 },
      { score: 77 },
    ],
  }),
];

export const generateMockAnalysis = generateMockSkinAnalysis;

export const getMockAnalysisRecords = () => mockReports;

export const getMockAnalysisById = (analysisId) => {
  return mockReports.find((report) => report.analysisId === analysisId) || null;
};
