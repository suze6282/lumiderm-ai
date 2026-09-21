export const routineOverview = {
  status: '护理路径已生成',
  title: '你的个性化护理方案',
  basis: '根据当前水分状态、肌肤纹理、T 区水油表现与眼周区域观察生成。',
  recommendationTitle: 'AI 护理建议',
  recommendation: '优先保持温和清洁与稳定补水，在肤感稳定的基础上，再循序加入针对肌理和肤色观感的功能护理。',
};

export const routinePriorities = [
  {
    id: 'hydration',
    order: '第一优先',
    title: '加强保湿',
    description: '持续补充水分并减少不必要的护理叠加。',
  },
  {
    id: 'texture',
    order: '第二优先',
    title: '改善肌理观感',
    description: '在肌肤耐受的前提下，循序加入温和的功能护理。',
  },
  {
    id: 'barrier',
    order: '第三优先',
    title: '稳定肤感',
    description: '通过屏障支持与日常防护维持舒适状态。',
  },
];

export const routineData = [
  {
    id: 'morning',
    title: '早间护理',
    timing: '建议在白天护肤时完成',
    description: '以轻盈补水和日间防护为主，帮助维持水润感与肤色通透观感。',
    steps: [
      {
        id: 'morning-cleanse',
        title: '温和清洁',
        summary: '清理夜间产生的表面油脂，为后续护理做好准备。',
        detail: '使用温和方式清洁即可，避免反复揉搓或追求过度清爽的肤感。',
      },
      {
        id: 'morning-vitamin-c',
        title: '维生素 C 护理',
        summary: '帮助维持肤色通透观感，并为日间护理提供支持。',
        detail: '如果是首次使用或肌肤较敏感，建议根据自身耐受情况循序加入。',
        ingredient: '维生素 C',
      },
      {
        id: 'morning-moisturize',
        title: '日间保湿',
        summary: '补充水分并帮助维持舒适、稳定的肌肤状态。',
        detail: '可关注质地轻盈的保湿护理，避免因层层叠加造成黏腻负担。',
        ingredient: '透明质酸',
      },
      {
        id: 'morning-protection',
        title: '日间防护',
        summary: '作为早间护理的最后一步，完成日常防护。',
        detail: '根据当天活动环境安排防护，并注意在需要时进行合理补充。',
      },
    ],
  },
  {
    id: 'evening',
    title: '晚间护理',
    timing: '建议在晚间清洁后完成',
    description: '以修护和稳定为主，逐步关注肌理细腻度与屏障支持。',
    steps: [
      {
        id: 'evening-cleanse',
        title: '温和清洁',
        summary: '清理日间残留，让肌肤回到舒适的护理起点。',
        detail: '避免长时间清洁或高频去角质，让后续护理更温和可控。',
      },
      {
        id: 'evening-serum',
        title: '修护精华',
        summary: '为水油平衡和屏障护理提供轻量支持。',
        detail: '优先选择配方简洁、肤感舒适的护理方向，并观察肌肤实际感受。',
        ingredient: '烟酰胺',
      },
      {
        id: 'evening-retinol',
        title: '视黄醇护理',
        summary: '循序关注肌理细腻度与平滑观感。',
        detail: '视黄醇属于需要建立耐受的活性成分，建议从低频开始，并根据自身耐受情况调整。',
        ingredient: '视黄醇',
      },
      {
        id: 'evening-ceramide',
        title: '神经酰胺保湿',
        summary: '完成晚间保湿，并为屏障护理提供支持。',
        detail: '在功能护理之后使用，帮助减少干燥紧绷感并维持舒适肤感。',
        ingredient: '神经酰胺',
      },
    ],
  },
];

export const weeklyRoutine = {
  id: 'weekly',
  title: '每周加护',
  timing: '根据肤感低频安排，无需一次完成全部项目',
  description: '作为早晚基础护理之外的补充，重点保持温和与适度。',
  steps: [
    { id: 'weekly-exfoliation', title: '温和去角质', description: '根据耐受情况低频安排，避免与多种活性护理同时叠加。' },
    { id: 'weekly-mask', title: '补水面膜', description: '在干燥或紧绷时提供短时补水支持。' },
    { id: 'weekly-barrier', title: '屏障修护', description: '在肤感不稳定时优先简化步骤并加强保湿。' },
    { id: 'weekly-soothing', title: '舒缓护理', description: '减少刺激性步骤，让肌肤保持舒适状态。' },
  ],
};

export const routineIngredients = [
  { id: 'hyaluronic-acid', name: '透明质酸', direction: '帮助提升肌肤水润感，为后续保湿护理提供支持。' },
  { id: 'niacinamide', name: '烟酰胺', direction: '关注水油平衡、肤色观感与屏障护理方向。' },
  { id: 'ceramide', name: '神经酰胺', direction: '帮助维持肌肤屏障与舒适肤感。' },
  { id: 'vitamin-c', name: '维生素 C', direction: '用于日间肤色通透观感与抗氧化护理方向。' },
  { id: 'retinol', name: '视黄醇', direction: '关注肌理细腻度，建议根据自身耐受情况循序使用。', caution: true },
];

export const routineDisclaimer = 'LumiDerm AI 提供的是美容护肤方向的模拟护理建议，不构成医疗诊断或治疗方案。';
