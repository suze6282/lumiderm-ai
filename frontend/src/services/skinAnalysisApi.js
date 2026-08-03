const DEFAULT_API_BASE_URL = 'http://localhost:3001';

export const getApiBaseUrl = () => {
  const configuredUrl = import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL;
  return configuredUrl.replace(/\/$/, '');
};

export const getBackendAssetUrl = (path) => {
  if (!path) {
    return null;
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${getApiBaseUrl()}${path.startsWith('/') ? path : `/${path}`}`;
};

export async function analyzeSkinImage(file) {
  if (!file) {
    const error = new Error('Image file is required');
    error.code = 'IMAGE_REQUIRED';
    throw error;
  }

  const formData = new FormData();
  formData.append('image', file);

  let response;
  try {
    response = await fetch(`${getApiBaseUrl()}/api/skin-analysis`, {
      method: 'POST',
      body: formData,
    });
  } catch (error) {
    const requestError = new Error('Analysis request failed');
    requestError.code = 'REQUEST_FAILED';
    requestError.cause = error;
    throw requestError;
  }

  const payload = await response.json().catch(() => null);

  if (!response.ok || !payload?.success) {
    const error = new Error(payload?.message || 'Analysis request failed');
    error.code = payload?.error?.code || 'ANALYSIS_REQUEST_FAILED';
    error.payload = payload;
    throw error;
  }

  return payload.data;
}
