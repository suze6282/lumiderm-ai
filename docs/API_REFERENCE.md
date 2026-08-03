# API 参考

本页根据当前 `backend/src/` 源码整理。默认根地址为 `http://localhost:3001`，所有业务响应使用 JSON；上传接口使用 `multipart/form-data`。

## 通用响应

成功响应：

```json
{"success":true,"message":"...","data":{}}
```

错误响应：

```json
{"success":false,"message":"...","error":{"code":"ERROR_CODE"}}
```

## GET /api/health

检查服务是否运行。无请求参数。

```bash
curl http://localhost:3001/api/health
```

响应示例：

```json
{
  "success": true,
  "message": "LumiDerm AI backend is running",
  "service": "lumiderm-ai-backend",
  "version": "1.0.0",
  "data": {}
}
```

## POST /api/skin-analysis

上传图片并生成、保存模拟美容护肤分析报告。

| 参数 | 位置 | 必填 | 说明 |
| --- | --- | --- | --- |
| `image` | multipart 文件 | 是 | JPG/JPEG、PNG 或 WEBP，最大 5 MiB |

```bash
curl -X POST http://localhost:3001/api/skin-analysis \
  -F "image=@C:/path/to/test.png;type=image/png"
```

成功响应节选：

```json
{
  "success": true,
  "message": "Image uploaded successfully. Simulated skin analysis generated.",
  "data": {
    "image": {
      "originalName": "test.png",
      "fileName": "skin-...png",
      "mimeType": "image/png",
      "size": 1234,
      "imageUrl": "/uploads/skin-...png",
      "uploadedAt": "2026-01-01T00:00:00.000Z"
    },
    "analysis": {
      "analysisId": "analysis_...",
      "overallScore": 86,
      "metrics": [],
      "faceMapping": [],
      "routineSuggestion": {},
      "disclaimer": "Cosmetic analysis demo only. Not for medical diagnosis."
    }
  }
}
```

可能错误：`IMAGE_REQUIRED`、`UNSUPPORTED_FILE_TYPE`、`FILE_TOO_LARGE`、`VALIDATION_ERROR`、`DATABASE_SAVE_FAILED`、`INTERNAL_SERVER_ERROR`。

## GET /api/skin-analysis

分页获取历史报告摘要。

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `page` | 正整数 | `1` | 页码；无效值回退默认值 |
| `pageSize` | 正整数 | `10` | 每页数量，上限 `50` |

```bash
curl "http://localhost:3001/api/skin-analysis?page=1&pageSize=10"
```

响应示例：

```json
{
  "success": true,
  "message": "Analysis records retrieved successfully",
  "data": {
    "records": [
      {
        "analysisId": "analysis_...",
        "imageUrl": "/uploads/skin-...png",
        "overallScore": 86,
        "createdAt": "2026-01-01T00:00:00.000Z",
        "summary": {"topMetric":"Skin Tone Evenness","priority":"Hydration Support"}
      }
    ],
    "pagination": {"page":1,"pageSize":10,"total":1,"totalPages":1}
  }
}
```

数据库查询失败返回 `DATABASE_QUERY_FAILED`。

## GET /api/skin-analysis/:id

按 `analysisId` 获取完整报告。

```bash
curl http://localhost:3001/api/skin-analysis/analysis_123_example
```

成功响应中的 `data.analysis` 包含 `analysisId`、`imageUrl`、`overallScore`、`metrics`、`faceMapping`、`insight`、`routineSuggestion`、中英文免责声明和 `createdAt`。不存在时返回 HTTP 404：

```json
{"success":false,"message":"Analysis report not found","error":{"code":"ANALYSIS_NOT_FOUND"}}
```

## 其他错误

未知路由返回 HTTP 404 与 `ROUTE_NOT_FOUND`；未映射的服务错误返回 HTTP 500 与 `INTERNAL_SERVER_ERROR`。

## Postman / Apifox

建立环境变量 `baseUrl=http://localhost:3001`。上传请求选择 `POST {{baseUrl}}/api/skin-analysis`，Body 使用 `form-data`，键名 `image`，类型选 File；不要手动设置 multipart 的 `Content-Type` 边界。成功后复制 `data.analysis.analysisId`，再测试列表和详情接口。测试图片只保存在本机，不加入仓库。
