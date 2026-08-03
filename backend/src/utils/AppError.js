export const ERROR_CODES = Object.freeze({
  IMAGE_REQUIRED: 'IMAGE_REQUIRED',
  UNSUPPORTED_FILE_TYPE: 'UNSUPPORTED_FILE_TYPE',
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  ANALYSIS_NOT_FOUND: 'ANALYSIS_NOT_FOUND',
  DATABASE_SAVE_FAILED: 'DATABASE_SAVE_FAILED',
  DATABASE_QUERY_FAILED: 'DATABASE_QUERY_FAILED',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  ROUTE_NOT_FOUND: 'ROUTE_NOT_FOUND',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
});

export class AppError extends Error {
  constructor(message, statusCode = 500, errorCode = ERROR_CODES.INTERNAL_SERVER_ERROR) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = true;

    Error.captureStackTrace?.(this, this.constructor);
  }
}
