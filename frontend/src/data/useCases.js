export const useCases = [
  {
    id: 'understand-current-state',
    title: '了解当下肌肤状态',
    question: '最近肤感发生变化，却不确定应该关注哪些方面？',
    value: 'LumiDerm AI 将水分、毛孔、肌理和肤色观感整理成更直观的模拟分析结果。',
    iconName: 'Sparkles',
    featured: true,
    signals: ['水分状态', '毛孔观感', '肌理表现', '肤色观感'],
  },
  {
    id: 'adjust-care-focus',
    title: '调整日常护理重点',
    question: '护理步骤很多，却不知道当前更应该先做什么？',
    value: '从整体指标中梳理优先顺序，让补水、肌理和屏障护理更有方向。',
    iconName: 'SlidersHorizontal',
  },
  {
    id: 'observe-local-zones',
    title: '观察局部区域表现',
    question: '额头、鼻部、眼周和脸颊的肤感并不相同，应该怎样分别理解？',
    value: '通过面部分区查看不同位置的状态说明与美容护理建议。',
    iconName: 'ScanFace',
  },
  {
    id: 'organize-routine',
    title: '整理早晚护理路径',
    question: '知道了肌肤重点，但仍不清楚下一步该如何安排？',
    value: '把分析结果整理成有顺序的早间、晚间和每周护理路径。',
    iconName: 'ListChecks',
    wide: true,
  },
];
