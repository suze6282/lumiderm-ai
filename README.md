# LumiDerm AI

LumiDerm AI 是一个 AI Beauty / Skin Analysis 产品官网与肌肤分析系统原型。它用高保真前端呈现产品叙事，并通过本地 Express API 完成图片上传、格式与大小校验、模拟美容护肤分析、SQLite 记录保存和历史报告查询。

> 当前分析结果由固定规则与模拟数据生成，不使用真实 AI 模型，不构成医疗诊断、治疗建议或疾病检测。项目尚未完成生产部署，也不是已经商业上线的服务。

## 产品定位

项目面向作品集演示和 MVP 验证：用户可以浏览完整产品官网，上传一张 JPG、PNG 或 WEBP 图片，获得结构化的美容护肤分析演示结果。真实 AI、账户、支付、会员和管理后台不在当前版本范围内。

## 项目截图

仓库暂未加入经过发布审查的截图。后续只会在 `docs/assets/` 中放置不含真实用户面部、服务器地址、密钥或个人信息的展示素材；详见 [截图说明](docs/assets/README.md)。

## 当前功能

- 完整官网模块：Navbar、Hero、ProductIntro、SkinScanDemo、AnalysisMetrics、FaceMapping、PersonalizedRoutine、Technology、UseCases、Pricing、FAQ、FinalCTA、Footer。
- 响应式布局、滚动动效、移动端导航与减少动画偏好支持。
- 前端通过 `multipart/form-data` 调用后端分析接口。
- 图片类型校验与 5 MiB 上限，本地上传目录存储。
- 结构化模拟分析报告与中英文合规提示。
- SQLite 初始化、保存、分页列表和报告详情。
- 统一 JSON 响应、错误码与 404 处理。

## 技术栈

| 范围 | 技术 |
| --- | --- |
| 前端 | React 18、Vite 6、Tailwind CSS 3、Framer Motion、Lucide React Icons |
| 后端 | Node.js、Express 4、Multer、SQLite / sqlite3、CORS、dotenv |
| 工程 | pnpm、Node.js 内置测试、GitHub Actions |

## 目录结构

```text
lumiderm-ai/
├─ frontend/                 # React + Vite 前端
│  ├─ src/components/       # 页面模块与通用组件
│  ├─ src/data/             # 展示数据
│  └─ src/services/         # 后端接口接入
├─ backend/                  # Express + SQLite 后端 MVP
│  ├─ src/                  # routes/controllers/services/repositories/db
│  ├─ data/.gitkeep         # 本地数据库目录，数据库文件不入库
│  └─ uploads/.gitkeep      # 本地上传目录，上传图片不入库
├─ docs/                     # 使用、架构、API、安全、状态与路线图
│  └─ plans/                # 前后端完整 Word 规划书
├─ scripts/release-audit.mjs
└─ .github/workflows/ci.yml
```

## 本地运行（仅限于作者本人使用，其他浏览者此处可以忽略）

需要 Node.js 20.17 或更高版本。仓库锁文件使用 pnpm 11.9；如已安装普通 Node.js，也可分别在前后端目录执行 `npm install` 和对应的 `npm run ...` 命令。

### 前端

```bash
cd frontend
npm install
npm run dev
```

默认地址：<http://localhost:5173>。生产构建和本地预览：

```bash
npm run build
npm run preview
```

### 后端

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

PowerShell 可用 `Copy-Item .env.example .env`。后端默认地址为 <http://localhost:3001>，健康检查为 <http://localhost:3001/api/health>；生产式本地启动使用 `npm start`。

完整说明见 [本地开发指南](docs/LOCAL_DEVELOPMENT.md)。

## 环境变量

| 文件 | 变量 | 默认示例 | 用途 |
| --- | --- | --- | --- |
| `frontend/.env` | `VITE_API_BASE_URL` | `http://localhost:3001` | 前端 API 根地址 |
| `backend/.env` | `PORT` | `3001` | 后端监听端口 |
| `backend/.env` | `NODE_ENV` | `development` | 运行环境 |
| `backend/.env` | `FRONTEND_ORIGIN` | `http://localhost:5173` | CORS 允许来源 |

`.env` 不应提交；仓库只保留 `.env.example`。

## API 简介

- `GET /api/health`：服务健康检查。
- `POST /api/skin-analysis`：上传字段名为 `image` 的图片并生成模拟报告。
- `GET /api/skin-analysis`：分页查询历史报告。
- `GET /api/skin-analysis/:id`：查询单个报告详情。

请求、响应、错误码与 curl 示例见 [API 参考](docs/API_REFERENCE.md)。

## 当前开发进度

| 阶段 | 状态 |
| --- | --- |
| 前端第 1—12 步 | 已完成 |
| 后端第 1—9 步 | 已完成 |
| 后端第 10 步：腾讯云部署 | 尚未完成 |
| 后端第 11 步：生产环境安全配置 | 尚未完成 |
| 后端第 12 步：最终公网联调 | 尚未完成 |

已完成表示本地 MVP 代码和本地验证范围，不代表生产环境已经上线。详见 [项目状态](docs/PROJECT_STATUS.md) 与 [路线图](docs/ROADMAP.md)。

## 腾讯云状态

当前没有可声明为成功的腾讯云部署结果。未来部署必须使用独立目录、独立 PM2 进程和独立 Nginx 配置，避免覆盖既有网站；3001 端口不直接暴露公网。方案见 [腾讯云部署指南](docs/TENCENT_CLOUD_DEPLOYMENT.md)。

## 合规与隐私

仓库不应包含 `.env`、SQLite 数据库、用户上传图片、日志、SSH 私钥、云密钥、`node_modules` 或 `dist`。上传图片属于敏感数据；当前本地存储只适合开发验证。完整边界见 [安全与隐私](docs/SECURITY_AND_PRIVACY.md)。

## 规划文档

- [前端开发完整规划文档](docs/plans/LumiDerm_AI_前端开发完整规划文档.docx)
- [后端开发完整规划文档](docs/plans/LumiDerm_AI_后端开发完整规划文档.docx)
- [前端 GitHub 阅读指南](docs/FRONTEND_GUIDE.md)
- [后端 GitHub 阅读指南](docs/BACKEND_GUIDE.md)

## 免责声明

LumiDerm AI 当前是美容护肤分析概念与模拟分析 MVP。报告仅用于产品体验和界面演示，不构成医疗诊断或治疗建议，也不应代替专业人员意见。真实 AI 模型、用户系统、支付、会员、管理后台和生产级数据治理属于后续路线。
