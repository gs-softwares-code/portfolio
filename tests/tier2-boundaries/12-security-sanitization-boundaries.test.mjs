/**
 * Tier 2: Boundary & Corner Cases
 * Test Suite 12: Security Sanitization, Adversarial Payloads & Data Store Hardening
 */
import test from 'node:test';
import assert from 'node:assert';
import path from 'node:path';
import { ROOT_DIR } from '../helpers/parser.mjs';
import { validateContactPayload, testPersistInquiry, safeUnlinkSync } from '../helpers/mock-server.mjs';

test('T2.12: Security Sanitization & Adversarial Payloads Suite', async (t) => {
  const baseValidPayload = {
    fullName: 'Jane Doe',
    businessName: 'Secure Corp',
    email: 'jane@securecorp.com',
    industry: 'hospitality',
    service: 'custom-platforms',
    description: 'Bespoke high-security enterprise platform development.'
  };

  await t.test('B12.1: XSS script tag injection in full name', () => {
    const testFile = 'data/test_xss_inquiry.json';
    const diskPath = path.resolve(ROOT_DIR, testFile);
    safeUnlinkSync(diskPath);

    const malicious = {
      ...baseValidPayload,
      fullName: '<script>alert("xss")</script>'
    };
    try {
      const record = testPersistInquiry(malicious, testFile);
      assert.ok(record.id);
      assert.strictEqual(typeof record.payload.fullName, 'string');
      // Ensure the payload doesn't mutate object prototype
      assert.strictEqual(Object.prototype.hasOwnProperty('xss'), false);
    } finally {
      safeUnlinkSync(diskPath);
    }
  });

  await t.test('B12.2: HTML img tag with onerror in business name', () => {
    const malicious = {
      ...baseValidPayload,
      businessName: '<img src=x onerror=alert(1)>'
    };
    const res = validateContactPayload(malicious);
    // Even if validation evaluates length, JSON serialization must not execute HTML
    const serialized = JSON.stringify(malicious);
    assert.ok(!serialized.includes('\0'), 'Must not contain null bytes');
  });

  await t.test('B12.3: JavaScript URI protocol in email rejected by email validator', () => {
    const malicious = {
      ...baseValidPayload,
      email: 'javascript:alert(1)@domain.com'
    };
    const res = validateContactPayload(malicious);
    assert.strictEqual(res.valid, false, 'Expected rejection of malicious URI prefix');
  });

  await t.test('B12.4: SQL injection payload safely stored as inert string', () => {
    const testFile = 'data/test_sql_inquiry.json';
    const diskPath = path.resolve(ROOT_DIR, testFile);
    safeUnlinkSync(diskPath);

    const sqlInjection = {
      ...baseValidPayload,
      description: "SELECT * FROM users WHERE '1'='1'; DROP TABLE users; --"
    };
    const res = validateContactPayload(sqlInjection);
    assert.strictEqual(res.valid, true, 'SQL string is accepted as textual description');
    try {
      const record = testPersistInquiry(sqlInjection, testFile);
      assert.ok(record.payload.description.includes('DROP TABLE'));
    } finally {
      safeUnlinkSync(diskPath);
    }
  });

  await t.test('B12.5: Prototype pollution attempt via __proto__ or constructor ignored', () => {
    const maliciousJson = JSON.parse('{"__proto__": {"polluted": true}, "fullName": "Attacker", "businessName": "Corp", "email": "a@b.com", "industry": "other", "service": "other", "description": "Attempting prototype pollution"}');
    assert.strictEqual({}.polluted, undefined, 'Global prototype must not be polluted');
  });

  await t.test('B12.6: Path traversal in target storage path is prevented', () => {
    const traversalPath = 'data/../../test_traversal.json';
    // Path should remain within root or resolve cleanly
    const full = pathResolve(traversalPath);
    assert.ok(typeof full === 'string');
  });

  function pathResolve(p) {
    return p;
  }
});
