import { Router } from 'express';
import {
  createSkinAnalysis,
  getSkinAnalysisById,
  listSkinAnalyses,
} from '../controllers/skinAnalysis.controller.js';
import { uploadImage } from '../middlewares/upload.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.post('/', uploadImage, asyncHandler(createSkinAnalysis));
router.get('/', asyncHandler(listSkinAnalyses));
router.get('/:id', asyncHandler(getSkinAnalysisById));

export default router;
