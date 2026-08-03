# 本地开发

## 前置条件

安装 Node.js 20.17 或更高版本。Node.js 官方安装包通常包含 npm。确认环境：

```bash
node --version
npm --version
```

## 启动前端

```bash
cd frontend
npm install
npm run dev
```

默认地址为 <http://localhost:5173>。构建与预览：

```bash
npm run build
npm run preview
```

`npm run build` 生成 `frontend/dist/`；该目录不提交。

## 启动后端

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

PowerShell 复制命令为：

```powershell
Copy-Item .env.example .env
```

默认地址为 <http://localhost:3001>，健康检查为 <http://localhost:3001/api/health>。不需要自动重载时使用：

```bash
npm start
```

## 同时启动

打开两个终端：第一个进入 `backend/` 运行 `npm run dev`，第二个进入 `frontend/` 运行 `npm run dev`。确认 `frontend/.env` 的 `VITE_API_BASE_URL` 与后端地址一致，并确认 `backend/.env` 的 `FRONTEND_ORIGIN` 是前端地址。

仓库也提供 pnpm 根命令：

```bash
pnpm install:all
pnpm dev:backend
pnpm dev:frontend
```

## 常见问题

### 端口占用

Windows PowerShell 可查看端口：

```powershell
Get-NetTCPConnection -LocalPort 5173,3001 -ErrorAction SilentlyContinue
```

先确认进程属于本项目再停止，或修改 `backend/.env` 的 `PORT`。前端可临时使用 `npm run dev -- --port 5174`，同时更新后端 `FRONTEND_ORIGIN`。

### CORS 错误

检查浏览器实际前端来源是否与 `FRONTEND_ORIGIN` 完全相同，包括协议和端口；修改 `.env` 后重启后端。

### 上传失败

字段名必须为 `image`；文件扩展名与 MIME 类型都应为 JPG/JPEG、PNG 或 WEBP，且大小不超过 5 MiB。

### SQLite 或本地文件

服务会自动创建 `backend/data/lumiderm.sqlite` 和上传文件。测试结束后可删除本地运行数据，但不要删除数据库初始化代码或两个 `.gitkeep`。
