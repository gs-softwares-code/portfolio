/**
 * Contact Backend API Contract & In-Memory / File Storage Harness
 * Resilient Windows File Locking & Atomic Persistence Implementation
 */
import fs from 'node:fs';
import path from 'node:path';
import { ROOT_DIR } from './parser.mjs';

export const VALID_INDUSTRIES = [
  'hospitality',
  'beauty-wellness',
  'legal-professional',
  'retail-commerce',
  'growing-businesses',
  'other'
];

export const VALID_SERVICES = [
  'ai-agents',
  'business-automation',
  'custom-platforms',
  'website-engineering',
  'application-development',
  'digital-infrastructure',
  'other'
];

export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
export const PHONE_REGEX = /^[\d\+\-\s\(\)]{7,20}$/;

export function validateContactPayload(payload) {
  const errors = [];
  if (!payload || typeof payload !== 'object') {
    return { valid: false, errors: ['Payload must be an object'] };
  }

  // fullName
  if (typeof payload.fullName !== 'string' || payload.fullName.trim().length < 2 || payload.fullName.trim().length > 100) {
    errors.push('Full Name must be between 2 and 100 characters');
  }

  // businessName
  if (typeof payload.businessName !== 'string' || payload.businessName.trim().length < 2 || payload.businessName.trim().length > 100) {
    errors.push('Business Name must be between 2 and 100 characters');
  }

  // email
  if (typeof payload.email !== 'string' || !EMAIL_REGEX.test(payload.email.trim()) || payload.email.length > 254) {
    errors.push('A valid email address is required');
  }

  // phone (optional, but if provided must match)
  if (payload.phone !== undefined && payload.phone !== null && payload.phone.trim() !== '') {
    if (typeof payload.phone !== 'string' || !PHONE_REGEX.test(payload.phone.trim())) {
      errors.push('Phone number must be between 7 and 20 digits/symbols');
    }
  }

  // industry
  if (!payload.industry || !VALID_INDUSTRIES.includes(payload.industry)) {
    errors.push(`Industry must be one of: ${VALID_INDUSTRIES.join(', ')}`);
  }

  // service
  if (!payload.service || !VALID_SERVICES.includes(payload.service)) {
    errors.push(`Service must be one of: ${VALID_SERVICES.join(', ')}`);
  }

  // description (or message)
  const desc = payload.description || payload.message;
  if (typeof desc !== 'string' || desc.trim().length < 10 || desc.trim().length > 2000) {
    errors.push('Project description must be between 10 and 2000 characters');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Synchronous non-busy sleep via Atomics.wait (zero CPU spin) with fallback
 */
export function sleepSync(ms) {
  try {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
  } catch {
    const end = Date.now() + ms;
    while (Date.now() < end) {}
  }
}

/**
 * Resilient file unlinking for Windows filesystems.
 * Handles transient locks (EPERM, EBUSY, EACCES) with exponential backoff retries.
 * Silently succeeds if file does not exist (ENOENT).
 */
export function safeUnlinkSync(targetPath, maxRetries = 5, initialDelayMs = 5) {
  if (!fs.existsSync(targetPath)) return;
  let delay = initialDelayMs;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      fs.unlinkSync(targetPath);
      return;
    } catch (err) {
      if ((err.code === 'EPERM' || err.code === 'EBUSY' || err.code === 'EACCES') && attempt < maxRetries) {
        sleepSync(delay);
        delay = Math.min(delay * 2, 100);
      } else if (err.code === 'ENOENT') {
        return;
      } else {
        throw err;
      }
    }
  }
}

/**
 * Robust atomic file write with:
 * 1. High-entropy nonces (PID + timestamp + high-res random) to avoid sub-millisecond collisions
 * 2. Exponential backoff retry loop for Windows EPERM/EBUSY/EACCES rename errors
 * 3. Fallback to copyFileSync + unlinkSync on retry exhaustion
 * 4. Guaranteed temp file cleanup in finally block
 */
export function safeAtomicWriteFileSync(filePath, content, { maxRetries = 10, initialDelayMs = 5 } = {}) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const nonce = `${process.pid}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  const tempPath = `${filePath}.tmp_${nonce}`;

  fs.writeFileSync(tempPath, content, 'utf8');

  let delay = initialDelayMs;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      fs.renameSync(tempPath, filePath);
      return;
    } catch (err) {
      const isTransient = err.code === 'EPERM' || err.code === 'EBUSY' || err.code === 'EACCES' || err.code === 'EMFILE';
      if (isTransient && attempt < maxRetries) {
        sleepSync(delay);
        delay = Math.min(delay * 2, 150);
      } else {
        // Fallback strategy: Direct copy into existing file destination
        try {
          fs.copyFileSync(tempPath, filePath);
          safeUnlinkSync(tempPath);
          return;
        } catch (copyErr) {
          safeUnlinkSync(tempPath);
          throw err;
        }
      }
    }
  }
}

/**
 * Clean up test artifacts and temporary files in the data directory
 */
export function cleanTestArtifacts(dataDirRel = 'data') {
  const fullDir = path.resolve(ROOT_DIR, dataDirRel);
  if (!fs.existsSync(fullDir)) return;
  try {
    const files = fs.readdirSync(fullDir);
    for (const file of files) {
      if (file.startsWith('test_') || file.includes('.tmp_')) {
        safeUnlinkSync(path.join(fullDir, file));
      }
    }
  } catch {
    // Non-fatal if directory is temporarily locked
  }
}

export function testPersistInquiry(payload, targetFilePath = 'data/test_contacts.json') {
  const fullPath = path.resolve(ROOT_DIR, targetFilePath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  let records = [];
  if (fs.existsSync(fullPath)) {
    try {
      const content = fs.readFileSync(fullPath, 'utf8');
      records = JSON.parse(content);
      if (!Array.isArray(records)) records = [];
    } catch {
      records = [];
    }
  }

  const newRecord = {
    id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    receivedAt: new Date().toISOString(),
    status: 'received',
    payload
  };

  records.push(newRecord);

  // Safe atomic write with Windows retry and fallback
  safeAtomicWriteFileSync(fullPath, JSON.stringify(records, null, 2));

  return newRecord;
}
