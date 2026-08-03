import multer from 'multer';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { AppError, ERROR_CODES } from '../utils/AppError.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const uploadsDir = path.resolve(__dirname, '../../uploads');

const maxImageSizeBytes = 5 * 1024 * 1024;
const allowedMimeTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);
const allowedExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp']);

export const ensureUploadsDir = () => {
  fs.mkdirSync(uploadsDir, { recursive: true });
};

const getSafeExtension = (file) => {
  return path.extname(file.originalname || '').toLowerCase();
};

const isAllowedImage = (file) => {
  return allowedMimeTypes.has(file.mimetype) && allowedExtensions.has(getSafeExtension(file));
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    ensureUploadsDir();
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = getSafeExtension(file);
    const random = crypto.randomBytes(3).toString('hex');
    cb(null, `skin-${Date.now()}-${random}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: maxImageSizeBytes,
  },
  fileFilter: (req, file, cb) => {
    if (!isAllowedImage(file)) {
      return cb(
        new AppError(
          'Only JPG, PNG, and WEBP images are allowed',
          400,
          ERROR_CODES.UNSUPPORTED_FILE_TYPE,
        ),
      );
    }

    return cb(null, true);
  },
});

export const uploadImage = (req, res, next) => {
  ensureUploadsDir();

  upload.single('image')(req, res, (err) => {
    if (!err) {
      return next();
    }

    return next(err);
  });
};
