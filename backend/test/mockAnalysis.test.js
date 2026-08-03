import assert from 'node:assert/strict';
import test from 'node:test';
import { generateMockSkinAnalysis } from '../src/services/mockAnalysis.service.js';

test('mock analysis is explicitly cosmetic, structured, and linked to the uploaded image', () => {
  const analysis = generateMockSkinAnalysis({ imageUrl: '/uploads/test.png' });

  assert.match(analysis.analysisId, /^analysis_\d+_[a-f0-9]{6}$/);
  assert.equal(analysis.imageUrl, '/uploads/test.png');
  assert.equal(analysis.overallScore, 86);
  assert.equal(analysis.metrics.length, 8);
  assert.equal(analysis.faceMapping.length, 5);
  assert.match(analysis.disclaimer, /Cosmetic analysis demo only/i);
  assert.match(analysis.disclaimer, /Not for medical diagnosis/i);
  assert.match(analysis.zhDisclaimer, /不构成医疗诊断/);
});

