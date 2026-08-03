# 后端指南

## 定位与完成范围

后端是 LumiDerm AI 的本地 MVP 服务。规划第 1—9 步已经完成：Express 基础服务、健康检查、图片上传与 5 MiB 限制、本地存储、模拟分析、SQLite 初始化与保存、历史分页与详情、统一错误处理和本地联调。第 10—12 步仍未完成。

## 分层结构

- `src/app.js`：Express、CORS、静态上传目录和路由装配。
- `src/server.js`：数据库初始化与端口监听。
- `src/routes/`：健康检查和分析接口。
- `src/controllers/`：请求处理与响应编排。
- `src/services/`：模拟分析报告生成。
- `src/repositories/`：SQLite 写入、分页和详情映射。
- `src/db/`：数据库文件位置与建表逻辑。
- `src/middlewares/`：Multer 上传、404 和统一错误处理。
- `src/utils/`：响应格式、异步包装和错误类型。

## 数据与上传

数据库首次启动时自动在 `backend/data/lumiderm.sqlite` 建表。图片写入 `backend/uploads/`，只允许 JPG、JPEG、PNG 和 WEBP，最大 5 MiB。数据库和上传图片都属于本地运行数据，已经由 `.gitignore` 排除。

## 本地命令

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

检查与测试：

```bash
npm run check
npm test
npm start
```

## 当前边界

报告由模拟模板生成，并非真实模型推理。当前没有身份验证、授权、限流、恶意文件内容检测、对象存储、生产日志脱敏或自动数据清理机制，因此只能按本地原型使用。部署必须从后端第 10 步开始，并完成第 11 步安全配置后再做公网联调。

原始规划书见 [后端开发完整规划文档](plans/LumiDerm_AI_后端开发完整规划文档.docx)。
