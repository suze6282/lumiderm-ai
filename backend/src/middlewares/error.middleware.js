import multer from 'multer';
import { AppError, ERROR_CODES } from '../utils/AppError.js';
import { errorResponse } from '../utils/response.js';

const isDatabaseError = (err) => {
  return typeof err?.code === 'string' && err.code.startsWith('SQLITE_');
};

const mapMulterError = (err) => {
  if (err.code === 'LIMIT_FILE_SIZE') {
    return new AppError(
      'Image size must be less than 5MB',
      400,
      ERROR_CODES.FILE_TOO_LARGE,
    );
  }

  return new AppError('Invalid upload request', 400, ERROR_CODES.VALIDATION_ERROR);
};

const normalizeError = (err) => {
  if (err instanceof AppError) {
    return err;
  }

  if (err instanceof multer.MulterError) {
    return mapMulterError(err);
  }

  if (err?.code === ERROR_CODES.UNSUPPORTED_FILE_TYPE) {
    return new AppError(
      'Only JPG, PNG, and WEBP images are allowed',
      400,
      ERROR_CODES.UNSUPPORTED_FILE_TYPE,
    );
  }

  if (isDatabaseError(err)) {
    return new AppError(
      'Failed to retrieve analysis records',
      500,
      ERROR_CODES.DATABASE_QUERY_FAILED,
    );
  }

  return new AppError(
    'Internal server error',
    500,
    ERROR_CODES.INTERNAL_SERVER_ERROR,
  );
};

export const notFoundHandler = (req, res, next) => {
  return next(new AppError('Route not found', 404, ERROR_CODES.ROUTE_NOT_FOUND));
};

export const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const normalizedError = normalizeError(err);

  return errorResponse(
    res,
    {
      message: normalizedError.message,
      code: normalizedError.errorCode,
    },
    normalizedError.statusCode,
  );
};
