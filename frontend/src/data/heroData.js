export const heroStats = [
  { id: 'speed', value: '30 秒', label: '快速分析' },
  { id: 'metrics', value: '8 项', label: '肌肤指标' },
  { id: 'routine', value: 'AI', label: '个性化护理' },
];

export const heroInsightCards = [
  {
    id: 'score',
    label: '肌肤评分',
    value: '86 / 100',
    detail: '整体状态均衡',
    graphic: 'score',
    placement: 'left-[1%] top-[8%] w-36 -rotate-[2deg] sm:left-[4%] sm:w-40',
    visibility: '',
  },
  {
    id: 'hydration',
    label: '水润度',
    value: '78%',
    detail: '水分状态良好',
    graphic: 'hydration',
    placement: 'right-[1%] top-[48%] w-36 rotate-[2deg] sm:right-[3%] sm:top-[9%] sm:w-40',
    visibility: '',
  },
  {
    id: 'pores',
    label: '毛孔状态',
    value: '精细',
    detail: '可见度较低',
    graphic: 'pores',
    placement: 'bottom-[10%] left-[1%] w-40 rotate-[1.5deg] md:left-[3%]',
    visibility: 'hidden sm:flex',
  },
  {
    id: 'routine-match',
    label: '护理匹配',
    value: '92%',
    detail: '方案适配度',
    graphic: 'match',
    placement: 'bottom-[9%] right-[2%] w-40 -rotate-[2deg]',
    visibility: 'hidden lg:flex',
  },
];

export const heroDetectionPoints = [
  { id: 'forehead', label: '额头检测点', x: '56%', y: '22%' },
  { id: 'under-eye-left', label: '左眼周检测点', x: '45%', y: '41%' },
  { id: 'under-eye-right', label: '右眼周检测点', x: '65%', y: '40%' },
  { id: 'nose', label: '毛孔检测点', x: '58%', y: '53%' },
  { id: 'cheek-left', label: '左脸颊肌理检测点', x: '39%', y: '60%' },
  { id: 'cheek-right', label: '右脸颊肌理检测点', x: '72%', y: '59%' },
  { id: 'chin', label: '下巴检测点', x: '59%', y: '77%' },
];
