# 前端指南

## 定位与完成范围

前端是 LumiDerm AI 的高保真产品官网和分析交互入口。前端规划的第 1—12 步已经完成，当前代码以模块化组件、独立数据文件和 API 服务层组成完整页面；本次仓库整理不重新设计视觉，也不改动正常动画节奏。

## 技术与入口

- React 18 与 `frontend/src/main.jsx` 作为入口。
- `frontend/src/App.jsx` 只组合页面模块。
- Vite 6 负责开发服务与生产构建。
- Tailwind CSS 3 与 `frontend/src/index.css` 负责设计系统和响应式样式。
- Framer Motion 负责滚动显现、Hero 和移动导航动效。
- Lucide React Icons 提供图标。

## 页面模块

页面依次渲染 Navbar、Hero、ProductIntro、SkinScanDemo、AnalysisMetrics、FaceMapping、PersonalizedRoutine、Technology、UseCases、Pricing、FAQ、FinalCTA 和 Footer。`components/common/` 保存 Container、GlowCard、GradientButton、MotionSection 和 SectionTitle 等通用组件；`data/` 保存展示数据。

## 接口接入

`frontend/src/services/skinAnalysisApi.js` 从 `VITE_API_BASE_URL` 读取后端根地址，默认使用 `http://localhost:3001`。`analyzeSkinImage(file)` 将图片以 `multipart/form-data` 的 `image` 字段提交至 `POST /api/skin-analysis`，并把后端错误码转为前端错误对象。

## 本地命令

```bash
cd frontend
npm install
npm run dev
npm run build
npm run preview
```

开发地址和预览地址默认绑定 `127.0.0.1`。构建输出位于 `frontend/dist/`，该目录属于生成物，不进入 Git。

## 维护边界

- 不把真实用户图片写入源码或演示数据。
- 不使用医疗诊断、治疗、疾病检测或绝对准确等表达。
- API 变化应先与后端文档和 `skinAnalysisApi.js` 一起核对。
- 真实 AI、登录、支付和管理后台属于后续阶段。

原始规划书见 [前端开发完整规划文档](plans/LumiDerm_AI_前端开发完整规划文档.docx)。
