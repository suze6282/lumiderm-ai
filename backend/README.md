# LumiDerm AI Backend

这是 LumiDerm AI 模拟美容护肤分析 MVP 的 Express 后端。它接收图片、执行类型与 5 MiB 大小校验、写入本地 `uploads/`，生成结构化模拟报告，并把报告保存到 SQLite。

当前服务不包含真实 AI 模型、身份验证、云存储或生产部署能力，也不用于医疗诊断。

## 启动

```bash
npm install
copy .env.example .env
npm run dev
```

默认端口为 `3001`。也可使用 `npm start` 启动；健康检查地址为 `http://localhost:3001/api/health`。

## 验证

```bash
npm run check
npm test
curl http://localhost:3001/api/health
```

完整接口说明见 [`../docs/API_REFERENCE.md`](../docs/API_REFERENCE.md)，本地联调说明见 [`../docs/LOCAL_DEVELOPMENT.md`](../docs/LOCAL_DEVELOPMENT.md)。

## 本地数据

- `data/lumiderm.sqlite` 由服务首次初始化时生成，不应提交。
- `uploads/` 中的图片不应提交；目录只保留 `.gitkeep`。
- `.env` 不应提交；只保留 `.env.example`。
