/**
 * Tier 2: Boundary & Corner Cases
 * Test Suite 10: Contact Form & Backend API Extreme Bounds and Input Fuzzing
 */
import test from 'node:test';
import assert from 'node:assert';
import { validateContactPayload } from '../helpers/mock-server.mjs';

test('T2.10: Contact Validation Boundary & Corner Cases Suite', async (t) => {
  const baseValidPayload = {
    fullName: 'Gulshan Singh',
    businessName: 'GS-Softwares',
    email: 'contact@gs-softwares.com',
    phone: '+91 98765 43210',
    industry: 'hospitality',
    service: 'ai-agents',
    description: 'We require autonomous agent workflows with deterministic execution guarantees.'
  };

  // Full Name Boundary Tests
  await t.test('B10.1: Full Name - 1 character rejected (min 2)', () => {
    const res = validateContactPayload({ ...baseValidPayload, fullName: 'A' });
    assert.strictEqual(res.valid, false);
    assert.ok(res.errors.some(e => e.includes('Full Name')));
  });

  await t.test('B10.2: Full Name - Exact 2 characters accepted (boundary)', () => {
    const res = validateContactPayload({ ...baseValidPayload, fullName: 'Al' });
    assert.strictEqual(res.valid, true);
  });

  await t.test('B10.3: Full Name - Exact 100 characters accepted (boundary)', () => {
    const name100 = 'A'.repeat(100);
    const res = validateContactPayload({ ...baseValidPayload, fullName: name100 });
    assert.strictEqual(res.valid, true);
  });

  await t.test('B10.4: Full Name - 101 characters rejected (max 100)', () => {
    const name101 = 'A'.repeat(101);
    const res = validateContactPayload({ ...baseValidPayload, fullName: name101 });
    assert.strictEqual(res.valid, false);
    assert.ok(res.errors.some(e => e.includes('Full Name')));
  });

  // Business Name Boundary Tests
  await t.test('B10.5: Business Name - 1 character rejected (min 2)', () => {
    const res = validateContactPayload({ ...baseValidPayload, businessName: 'B' });
    assert.strictEqual(res.valid, false);
    assert.ok(res.errors.some(e => e.includes('Business Name')));
  });

  await t.test('B10.6: Business Name - Exact 100 characters accepted (boundary)', () => {
    const biz100 = 'Corp '.repeat(20); // 100 chars
    const res = validateContactPayload({ ...baseValidPayload, businessName: biz100 });
    assert.strictEqual(res.valid, true);
  });

  await t.test('B10.7: Business Name - 101 characters rejected (max 100)', () => {
    const biz101 = 'Corp '.repeat(20) + 'X';
    const res = validateContactPayload({ ...baseValidPayload, businessName: biz101 });
    assert.strictEqual(res.valid, false);
    assert.ok(res.errors.some(e => e.includes('Business Name')));
  });

  // Email Format Edge Cases
  await t.test('B10.8: Email - missing domain user@ rejected', () => {
    const res = validateContactPayload({ ...baseValidPayload, email: 'user@' });
    assert.strictEqual(res.valid, false);
  });

  await t.test('B10.9: Email - missing username @domain.com rejected', () => {
    const res = validateContactPayload({ ...baseValidPayload, email: '@domain.com' });
    assert.strictEqual(res.valid, false);
  });

  await t.test('B10.10: Email - double @ sign user@@domain.com rejected', () => {
    const res = validateContactPayload({ ...baseValidPayload, email: 'user@@domain.com' });
    assert.strictEqual(res.valid, false);
  });

  await t.test('B10.11: Email - whitespace inside email user @domain.com rejected', () => {
    const res = validateContactPayload({ ...baseValidPayload, email: 'user @domain.com' });
    assert.strictEqual(res.valid, false);
  });

  await t.test('B10.12: Email - complex tagged address user+tag.123@sub.domain.co.uk accepted', () => {
    const res = validateContactPayload({ ...baseValidPayload, email: 'user+tag.123@sub.domain.co.uk' });
    assert.strictEqual(res.valid, true);
  });

  // Phone Format Boundary Tests
  await t.test('B10.13: Phone - omitted or empty string accepted (optional field)', () => {
    const res1 = validateContactPayload({ ...baseValidPayload, phone: undefined });
    assert.strictEqual(res1.valid, true);

    const res2 = validateContactPayload({ ...baseValidPayload, phone: '' });
    assert.strictEqual(res2.valid, true);
  });

  await t.test('B10.14: Phone - 6 digits rejected (min 7 digits)', () => {
    const res = validateContactPayload({ ...baseValidPayload, phone: '123456' });
    assert.strictEqual(res.valid, false);
    assert.ok(res.errors.some(e => e.includes('Phone')));
  });

  await t.test('B10.15: Phone - 7 digits accepted (min boundary)', () => {
    const res = validateContactPayload({ ...baseValidPayload, phone: '1234567' });
    assert.strictEqual(res.valid, true);
  });

  await t.test('B10.16: Phone - international format with +, (), dashes accepted', () => {
    const res = validateContactPayload({ ...baseValidPayload, phone: '+1 (555) 019-2834' });
    assert.strictEqual(res.valid, true);
  });

  await t.test('B10.17: Phone - alphabet characters rejected', () => {
    const res = validateContactPayload({ ...baseValidPayload, phone: '+91-CALL-NOW' });
    assert.strictEqual(res.valid, false);
  });

  // Project Description Length Boundaries
  await t.test('B10.18: Description - 9 characters rejected (min 10)', () => {
    const res = validateContactPayload({ ...baseValidPayload, description: '123456789' });
    assert.strictEqual(res.valid, false);
    assert.ok(res.errors.some(e => e.includes('description')));
  });

  await t.test('B10.19: Description - exact 10 characters accepted (boundary)', () => {
    const res = validateContactPayload({ ...baseValidPayload, description: '1234567890' });
    assert.strictEqual(res.valid, true);
  });

  await t.test('B10.20: Description - exact 2000 characters accepted (boundary)', () => {
    const desc2000 = 'A'.repeat(2000);
    const res = validateContactPayload({ ...baseValidPayload, description: desc2000 });
    assert.strictEqual(res.valid, true);
  });

  await t.test('B10.21: Description - 2001 characters rejected (max 2000)', () => {
    const desc2001 = 'A'.repeat(2001);
    const res = validateContactPayload({ ...baseValidPayload, description: desc2001 });
    assert.strictEqual(res.valid, false);
    assert.ok(res.errors.some(e => e.includes('description')));
  });

  // Industry & Service Enum Boundaries
  await t.test('B10.22: Industry - unrecognized enum string rejected', () => {
    const res = validateContactPayload({ ...baseValidPayload, industry: 'invalid-industry-slug' });
    assert.strictEqual(res.valid, false);
  });

  await t.test('B10.23: Service - unrecognized enum string rejected', () => {
    const res = validateContactPayload({ ...baseValidPayload, service: 'invalid-service-slug' });
    assert.strictEqual(res.valid, false);
  });

  // Null / Malformed Payload Handling
  await t.test('B10.24: Null or primitive payload rejected safely', () => {
    assert.strictEqual(validateContactPayload(null).valid, false);
    assert.strictEqual(validateContactPayload('string').valid, false);
    assert.strictEqual(validateContactPayload(12345).valid, false);
  });
});
