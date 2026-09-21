export function isMetricValueAvailable(value) {
  return value !== null && value !== undefined && Number.isFinite(Number(value));
}

export function normalizeMetricValue(value) {
  if (!isMetricValueAvailable(value)) return 0;
  return Math.min(100, Math.max(0, Number(value)));
}
