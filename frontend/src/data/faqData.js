export const faqData = [
  {
    id: 'analysis-process',
    question: 'LumiDerm AI 如何进行肌肤分析？',
    answer: '上传照片后，当前原型会把图像发送至本地演示服务，生成一套模拟肌肤指标、面部分区信息与美容护理方向。结果用于展示产品流程，不代表真实医学检测。',
  },
  {
    id: 'photo-guidance',
    question: '上传什么样的照片效果更好？',
    answer: '建议使用光线均匀、面部无遮挡、保持正视且画面清晰的照片。尽量避免强滤镜、过度曝光、明显阴影或多人合照。',
  },
  {
    id: 'supported-formats',
    question: '支持哪些图片格式和大小？',
    answer: '当前支持 JPG、PNG 和 WEBP 格式，单张图片最大 5 MB。文件类型和扩展名都需要符合要求。',
  },
  {
    id: 'medical-boundary',
    question: '分析结果是否属于医疗诊断？',
    answer: '不是。LumiDerm AI 当前提供的是美容护肤方向的模拟肌肤分析与护理建议，不用于疾病诊断，也不能替代医生或专业医疗建议。',
  },
  {
    id: 'result-variation',
    question: '为什么不同照片可能得到不同结果？',
    answer: '光线、角度、清晰度、遮挡和滤镜都会改变照片中的视觉信息。当前版本仍是模拟分析原型，因此结果应作为产品体验和美容护理参考理解。',
  },
  {
    id: 'routine-generation',
    question: '个性化护理建议是如何生成的？',
    answer: '当前原型根据模拟指标、整体评分与局部关注区域，整理早间、晚间和每周护理方向。它不会推荐具体品牌商品，也不构成医疗诊断或治疗建议。',
  },
  {
    id: 'photo-handling',
    question: '上传的照片会如何被处理？',
    answer: '当前本地演示服务会将上传图片保存到服务器的本地上传目录，并把图片信息与模拟分析记录写入本地数据库；项目目前没有自动删除机制。体验时请避免上传不必要的敏感信息。',
  },
];
