import { Router } from 'express';
import { successResponse } from '../utils/response.js';

const router = Router();

router.get('/', (req, res) => {
  return successResponse(res, {
    message: 'LumiDerm AI backend is running',
    service: 'lumiderm-ai-backend',
    version: '1.0.0',
  });
});

export default router;
