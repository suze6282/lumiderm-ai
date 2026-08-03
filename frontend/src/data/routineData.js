export const routineData = [
  {
    id: 'morning',
    title: 'Morning Routine',
    zhTitle: '晨间护肤',
    description: '轻盈防护，帮助维持白天的水润感和肤色通透度。',
    priority: 'Daily Essential',
    focus: ['Skin Tone', 'Hydration', 'Protection'],
    reason: 'Recommended for uneven skin tone and daily protection.',
    zhReason: '适合关注肤色均匀度、日间防护和基础补水的人群。',
    steps: ['Gentle Cleanser', 'Vitamin C', 'Moisturizer', 'SPF'],
    accent: 'rose',
    iconName: 'SunMedium',
  },
  {
    id: 'night',
    title: 'Night Routine',
    zhTitle: '夜间护肤',
    description: '更偏修护与稳定，帮助夜间护理聚焦纹理细腻度和屏障支持。',
    priority: 'Evening Focus',
    focus: ['Texture', 'Barrier', 'Renewal'],
    reason: 'Recommended for texture refinement and barrier support.',
    zhReason: '适合关注肌肤纹理、屏障护理和夜间修护方向的人群。',
    steps: ['Gentle Cleanser', 'Repair Serum', 'Retinol', 'Ceramide Cream'],
    accent: 'violet',
    iconName: 'Moon',
  },
  {
    id: 'weekly',
    title: 'Weekly Treatment',
    zhTitle: '每周护理',
    description: '低频维护，帮助补水恢复、温和清洁与肤感舒适度管理。',
    priority: 'Weekly Reset',
    focus: ['Hydration', 'Texture', 'Comfort'],
    reason: 'Recommended for hydration recovery and smoother-looking texture.',
    zhReason: '适合用于每周补水维护、温和清洁和屏障支持。',
    steps: ['Mild Exfoliation', 'Hydration Mask', 'Barrier Repair', 'Soothing Care'],
    accent: 'cyan',
    iconName: 'CalendarDays',
  },
  {
    id: 'ingredients',
    title: 'Ingredient Suggestions',
    zhTitle: '推荐成分',
    description: '基于模拟指标和护理优先级生成可关注的护肤成分方向。',
    priority: 'Ingredient Direction',
    focus: ['Hydration', 'Brightening', 'Barrier'],
    reason: 'Suggested ingredients based on simulated hydration, tone balance and texture priorities.',
    zhReason: '基于模拟补水、肤色均匀度和纹理护理优先级生成的成分方向。',
    steps: ['Hyaluronic Acid 玻尿酸', 'Niacinamide 烟酰胺', 'Retinol 视黄醇', 'Vitamin C 维生素 C', 'Ceramide 神经酰胺'],
    accent: 'magenta',
    iconName: 'FlaskConical',
  },
];

export const routineSummaryMetrics = [
  {
    label: 'Skin Tone Balance',
    value: '91%',
    status: 'Excellent',
  },
  {
    label: 'Hydration Level',
    value: '78%',
    status: 'Good',
  },
  {
    label: 'Texture Priority',
    value: 'Medium',
    status: 'Focus Area',
  },
];

export const routinePriorities = [
  {
    title: 'Hydration Support',
    zhTitle: '补水支持',
    accent: 'cyan',
  },
  {
    title: 'Texture Refinement',
    zhTitle: '纹理细腻度管理',
    accent: 'violet',
  },
  {
    title: 'Barrier Care',
    zhTitle: '屏障护理',
    accent: 'rose',
  },
  {
    title: 'Daily Protection',
    zhTitle: '日间防护',
    accent: 'magenta',
  },
];

export const routineFlow = [
  {
    title: 'Skin Metrics',
    zhTitle: '肌肤指标',
  },
  {
    title: 'Zone Insights',
    zhTitle: '区域观察',
  },
  {
    title: 'Care Priorities',
    zhTitle: '护理优先级',
  },
  {
    title: 'Routine Plan',
    zhTitle: '个性化方案',
  },
];
