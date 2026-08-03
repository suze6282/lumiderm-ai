import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware.js';
import { ensureUploadsDir, uploadsDir } from './middlewares/upload.middleware.js';
import healthRoutes from './routes/health.routes.js';
import skinAnalysisRoutes from './routes/skinAnalysis.routes.js';

dotenv.config();
ensureUploadsDir();

const app = express();
const frontendOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';

app.use(
  cors({
    origin: frontendOrigin,
    credentials: true,
  }),
);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(uploadsDir));
app.use('/api/health', healthRoutes);
app.use('/api/skin-analysis', skinAnalysisRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
