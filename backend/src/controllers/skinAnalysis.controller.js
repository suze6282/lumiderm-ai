import { AppError, ERROR_CODES } from '../utils/AppError.js';
import { successResponse } from '../utils/response.js';
import { generateMockSkinAnalysis } from '../services/mockAnalysis.service.js';
import {
  countAnalysisRecords,
  createAnalysisRecord,
  findAnalysisRecordById,
  findAnalysisRecords,
  normalizePagination,
} from '../repositories/analysisRecord.repository.js';

export const createSkinAnalysis = async (req, res) => {
  if (!req.file) {
    throw new AppError('Image file is required', 400, ERROR_CODES.IMAGE_REQUIRED);
  }

  const imageUrl = `/uploads/${req.file.filename}`;
  const uploadedAt = new Date().toISOString();
  const imageInfo = {
    originalName: req.file.originalname,
    fileName: req.file.filename,
    mimeType: req.file.mimetype,
    size: req.file.size,
    imageUrl,
    uploadedAt,
  };
  const analysis = generateMockSkinAnalysis(imageInfo);

  try {
    await createAnalysisRecord({ image: imageInfo, analysis });
  } catch (error) {
    throw new AppError(
      'Failed to save analysis record',
      500,
      ERROR_CODES.DATABASE_SAVE_FAILED,
    );
  }

  return successResponse(res, {
    message: 'Image uploaded successfully. Simulated skin analysis generated.',
    data: {
      image: imageInfo,
      analysis,
    },
  });
};

export const listSkinAnalyses = async (req, res) => {
  const { page, pageSize } = normalizePagination(req.query);
  let records;
  let total;

  try {
    [records, total] = await Promise.all([
      findAnalysisRecords({ page, pageSize }),
      countAnalysisRecords(),
    ]);
  } catch (error) {
    throw new AppError(
      'Failed to retrieve analysis records',
      500,
      ERROR_CODES.DATABASE_QUERY_FAILED,
    );
  }

  const totalPages = Math.ceil(total / pageSize);

  return successResponse(res, {
    message: 'Analysis records retrieved successfully',
    data: {
      records,
      pagination: {
        page,
        pageSize,
        total,
        totalPages,
      },
    },
  });
};

export const getSkinAnalysisById = async (req, res) => {
  let analysis;

  try {
    analysis = await findAnalysisRecordById(req.params.id);
  } catch (error) {
    throw new AppError(
      'Failed to retrieve analysis records',
      500,
      ERROR_CODES.DATABASE_QUERY_FAILED,
    );
  }

  if (!analysis) {
    throw new AppError('Analysis report not found', 404, ERROR_CODES.ANALYSIS_NOT_FOUND);
  }

  return successResponse(res, {
    message: 'Analysis report retrieved successfully',
    data: {
      analysis,
    },
  });
};
