# 项目交接

## 当前项目状态

- 正式本地根目录：`C:\Users\suze6\Documents\Lumiderm-AI`。
- 前端第 1—12 步已完成。
- 后端第 1—9 步已完成。
- 后端第 10—12 步未完成，下一次开发应从第 10 步的部署前只读检查开始。
- 当前分析是模拟美容护肤分析，不是真实 AI 或医疗能力。

## 关键路径

- 前端入口：`frontend/src/main.jsx`、`frontend/src/App.jsx`。
- 接口层：`frontend/src/services/skinAnalysisApi.js`。
- 后端入口：`backend/src/server.js`、`backend/src/app.js`。
- 上传：`backend/src/middlewares/upload.middleware.js`。
- 报告：`backend/src/services/mockAnalysis.service.js`。
- 持久化：`backend/src/db/database.js`、`backend/src/repositories/analysisRecord.repository.js`。

## 启动命令

前端：`cd frontend && npm install && npm run dev`。后端：`cd backend && npm install`，复制 `.env.example` 为 `.env`，再运行 `npm run dev`。健康检查：`GET http://localhost:3001/api/health`。

## 环境变量

前端使用 `VITE_API_BASE_URL`；后端使用 `PORT`、`NODE_ENV`、`FRONTEND_ORIGIN`。真实 `.env` 不进入仓库。

## API

稳定接口为 `GET /api/health`、`POST /api/skin-analysis`、`GET /api/skin-analysis`、`GET /api/skin-analysis/:id`。不要在部署整理中改变其路径或响应结构。

## 不允许破坏的前端模块

Navbar、Hero、ProductIntro、SkinScanDemo、AnalysisMetrics、FaceMapping、PersonalizedRoutine、Technology、UseCases、Pricing、FAQ、FinalCTA、Footer，以及现有响应式布局、视觉语言和正常动画均为已完成成果。

## 下一步

从后端第 10 步开始：只读审计目标腾讯云服务器，确认旧网站目录、Nginx、PM2、端口、域名和证书，再规划独立部署。未经检查不得覆盖旧配置或直接开放 3001。

## 部署安全边界

不提交或粘贴 SSH 私钥、腾讯云密钥、Token、密码和服务器登录信息；不把本地数据库、上传图片和日志传入 Git；生产 CORS 只允许正式域名；完成 HTTPS、限流、安全头、上传强化、日志脱敏、数据周期和回滚后再做第 12 步公网联调。
