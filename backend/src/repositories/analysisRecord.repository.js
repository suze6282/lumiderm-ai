import { getDatabase } from '../db/database.js';

const toJson = (value) => JSON.stringify(value ?? null);
const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;
const MAX_PAGE_SIZE = 50;

const parseJson = (value, fallback) => {
  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

export const normalizePagination = (options = {}) => {
  const parsedPage = Number.parseInt(options.page, 10);
  const parsedPageSize = Number.parseInt(options.pageSize, 10);
  const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : DEFAULT_PAGE;
  const pageSize =
    Number.isInteger(parsedPageSize) && parsedPageSize > 0
      ? Math.min(parsedPageSize, MAX_PAGE_SIZE)
      : DEFAULT_PAGE_SIZE;

  return {
    page,
    pageSize,
    limit: pageSize,
    offset: (page - 1) * pageSize,
  };
};

const getTopMetric = (metrics) => {
  if (!Array.isArray(metrics) || metrics.length === 0) {
    return null;
  }

  return metrics.reduce((topMetric, metric) => {
    if (!topMetric || Number(metric.value) > Number(topMetric.value)) {
      return metric;
    }

    return topMetric;
  }, null);
};

const mapListRecord = (row) => {
  const metrics = parseJson(row.metrics_json, []);
  const routineSuggestion = parseJson(row.routine_suggestion_json, {});
  const topMetric = getTopMetric(metrics);

  return {
    analysisId: row.analysis_id,
    imageUrl: row.image_url,
    overallScore: row.overall_score,
    createdAt: row.created_at,
    summary: {
      topMetric: topMetric?.label || null,
      priority: routineSuggestion?.priorities?.[0] || null,
    },
  };
};

const mapAnalysisRecord = (row) => ({
  analysisId: row.analysis_id,
  imageUrl: row.image_url,
  overallScore: row.overall_score,
  metrics: parseJson(row.metrics_json, []),
  faceMapping: parseJson(row.face_mapping_json, []),
  insight: parseJson(row.insight_json, {}),
  routineSuggestion: parseJson(row.routine_suggestion_json, {}),
  disclaimer: row.disclaimer,
  zhDisclaimer: row.zh_disclaimer,
  createdAt: row.created_at,
});

export const createAnalysisRecord = async ({ image, analysis }) => {
  const db = await getDatabase();
  const updatedAt = new Date().toISOString();

  const result = await db.run(
    `
      INSERT INTO analysis_records (
        analysis_id,
        image_url,
        image_file_name,
        image_original_name,
        image_mime_type,
        image_size,
        overall_score,
        metrics_json,
        face_mapping_json,
        insight_json,
        routine_suggestion_json,
        disclaimer,
        zh_disclaimer,
        created_at,
        updated_at
      ) VALUES (
        $analysisId,
        $imageUrl,
        $imageFileName,
        $imageOriginalName,
        $imageMimeType,
        $imageSize,
        $overallScore,
        $metricsJson,
        $faceMappingJson,
        $insightJson,
        $routineSuggestionJson,
        $disclaimer,
        $zhDisclaimer,
        $createdAt,
        $updatedAt
      )
    `,
    {
      $analysisId: analysis.analysisId,
      $imageUrl: analysis.imageUrl,
      $imageFileName: image.fileName,
      $imageOriginalName: image.originalName,
      $imageMimeType: image.mimeType,
      $imageSize: image.size,
      $overallScore: analysis.overallScore,
      $metricsJson: toJson(analysis.metrics),
      $faceMappingJson: toJson(analysis.faceMapping),
      $insightJson: toJson(analysis.insight),
      $routineSuggestionJson: toJson(analysis.routineSuggestion),
      $disclaimer: analysis.disclaimer,
      $zhDisclaimer: analysis.zhDisclaimer,
      $createdAt: analysis.createdAt,
      $updatedAt: updatedAt,
    },
  );

  return {
    id: result.lastID,
    analysisId: analysis.analysisId,
    createdAt: analysis.createdAt,
    updatedAt,
  };
};

export const findAnalysisRecords = async (options = {}) => {
  const db = await getDatabase();
  const { limit, offset } = normalizePagination(options);
  const rows = await db.all(
    `
      SELECT
        analysis_id,
        image_url,
        overall_score,
        metrics_json,
        routine_suggestion_json,
        created_at
      FROM analysis_records
      ORDER BY created_at DESC, id DESC
      LIMIT ? OFFSET ?
    `,
    limit,
    offset,
  );

  return rows.map(mapListRecord);
};

export const findAnalysisRecordById = async (analysisId) => {
  const db = await getDatabase();
  const row = await db.get(
    `
      SELECT
        analysis_id,
        image_url,
        overall_score,
        metrics_json,
        face_mapping_json,
        insight_json,
        routine_suggestion_json,
        disclaimer,
        zh_disclaimer,
        created_at
      FROM analysis_records
      WHERE analysis_id = ?
    `,
    analysisId,
  );

  return row ? mapAnalysisRecord(row) : null;
};

export const countAnalysisRecords = async () => {
  const db = await getDatabase();
  const row = await db.get(`
    SELECT COUNT(*) AS total
    FROM analysis_records
  `);

  return row.total;
};
