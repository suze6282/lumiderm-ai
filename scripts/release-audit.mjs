import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const skippedDirectories = new Set([
  '.git',
  'node_modules',
  'dist',
  'coverage',
  'playwright-report',
  'test-results',
]);
const binaryExtensions = new Set([
  '.docx',
  '.pdf',
  '.png',
  '.jpg',
  '.jpeg',
  '.webp',
  '.gif',
  '.ico',
  '.zip',
]);
const forbiddenExtensions = new Set([
  '.sqlite',
  '.sqlite3',
  '.db',
  '.pem',
  '.key',
  '.p12',
  '.pfx',
  '.jks',
  '.keystore',
]);
const secretPatterns = [
  ['private key', /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/],
  ['Tencent Cloud secret id', /AKID[0-9A-Za-z]{13,}/],
  ['GitHub token', /(?:gh[pousr]_[A-Za-z0-9_]{20,}|github_pat_[A-Za-z0-9_]{20,})/],
  ['OpenAI-style API key', /sk-(?:proj-)?[A-Za-z0-9_-]{20,}/],
];

const findings = [];

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && skippedDirectories.has(entry.name)) continue;

    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      walk(absolutePath);
      continue;
    }

    const relativePath = path.relative(root, absolutePath).replaceAll('\\', '/');
    const extension = path.extname(entry.name).toLowerCase();
    const segments = relativePath.split('/');

    if (entry.name.startsWith('.env') && entry.name !== '.env.example') {
      findings.push(`${relativePath}: environment file must not be published`);
    }
    if (forbiddenExtensions.has(extension)) {
      findings.push(`${relativePath}: forbidden database or key file`);
    }
    if (segments.includes('uploads') && entry.name !== '.gitkeep') {
      findings.push(`${relativePath}: uploaded file must not be published`);
    }

    if (binaryExtensions.has(extension) || fs.statSync(absolutePath).size > 2_000_000) continue;
    const contents = fs.readFileSync(absolutePath, 'utf8');
    for (const [label, pattern] of secretPatterns) {
      if (pattern.test(contents)) findings.push(`${relativePath}: possible ${label}`);
    }
  }
}

walk(root);

if (findings.length > 0) {
  console.error('Release audit failed:');
  for (const finding of findings) console.error(`- ${finding}`);
  process.exitCode = 1;
} else {
  console.log('Release audit passed: no forbidden runtime data or high-confidence secret patterns found.');
}

