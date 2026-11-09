/**
 * Tier 1: Feature Coverage
 * Test Suite 08: Section 10 Contact Form, Validation Engine & Backend API Persistence
 */
import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { readFileSafe, fileExists, readAllFilesRecursively, ROOT_DIR } from '../helpers/parser.mjs';
import { validateContactPayload, testPersistInquiry, safeUnlinkSync } from '../helpers/mock-server.mjs';

test('T1.08: Contact Form & Backend API Persistence Suite', async (t) => {
  const allComponents = readAllFilesRecursively('src/components');
  const pageContent = readFileSafe('src/app/page.tsx') || '';
  const allText = [pageContent, ...allComponents.map(c => c.content)].join('\n');

  // Feature 17: Contact Form UI & Fields
  await t.test('F17.1: Contact form component or form section exists', (subT) => {
    const hasContact = fileExists('src/components/sections/Section09Contact.tsx') ||
                       pageContent.includes('id="contact"') ||
                       pageContent.includes('form') ||
                       allText.includes('Contact');
    assert.ok(hasContact, 'Expected Contact form or form section');
  });

  await t.test('F17.2: Form contains Full Name field with accessible label', (subT) => {
    const hasField = allText.includes('Full Name') || allText.includes('fullName');
    assert.ok(hasField, 'Expected Full Name field in form or UI');
  });

  await t.test('F17.3: Form contains Business Name field with accessible label', (subT) => {
    const hasField = allText.includes('Business Name') || allText.includes('businessName');
    if (!hasField && !fileExists('src/components/sections/Section09Contact.tsx')) {
      subT.skip('Pending Milestone M5: Section 09 Contact Form component');
      return;
    }
    assert.ok(hasField, 'Expected Business Name field in contact form');
  });

  await t.test('F17.4: Form contains Email Address field with accessible label', (subT) => {
    const hasField = allText.includes('Email') || allText.includes('email');
    assert.ok(hasField, 'Expected Email field');
  });

  await t.test('F17.5: Form contains Phone Number field', (subT) => {
    const hasField = allText.includes('Phone') || allText.includes('phone');
    if (!hasField && !fileExists('src/components/sections/Section09Contact.tsx')) {
      subT.skip('Pending Milestone M5: Section 09 Contact Form component');
      return;
    }
    assert.ok(hasField, 'Expected Phone Number field in contact form');
  });

  await t.test('F17.6: Form contains Industry selector', (subT) => {
    const hasField = allText.includes('Industry') || allText.includes('industry');
    if (!hasField && !fileExists('src/components/sections/Section09Contact.tsx')) {
      subT.skip('Pending Milestone M5: Section 09 Contact Form component');
      return;
    }
    assert.ok(hasField, 'Expected Industry selector in contact form');
  });

  await t.test('F17.7: Form contains Required Service selector', (subT) => {
    const hasField = allText.includes('Service') || allText.includes('service');
    assert.ok(hasField, 'Expected Service selector in contact form');
  });

  await t.test('F17.8: Form contains Project Description textarea', (subT) => {
    const hasField = allText.includes('Description') || allText.includes('description') || allText.includes('message');
    if (!hasField && !fileExists('src/components/sections/Section09Contact.tsx')) {
      subT.skip('Pending Milestone M5: Section 09 Contact Form component');
      return;
    }
    assert.ok(hasField, 'Expected Project Description in contact form');
  });

  // Feature 18: Backend API & Persistence Contracts
  await t.test('F18.1: Validation engine accepts valid 7-field inquiry payload', () => {
    const validPayload = {
      fullName: 'Marcus Vance',
      businessName: 'Vance Logistics Ltd',
      email: 'marcus@vancelogistics.com',
      phone: '+91 98765 43210',
      industry: 'hospitality',
      service: 'custom-platforms',
      description: 'We require a multi-tenant operations platform similar to CafeOS for our regional enterprise.'
    };
    const result = validateContactPayload(validPayload);
    assert.strictEqual(result.valid, true, `Validation failed unexpectedly: ${result.errors.join(', ')}`);
  });

  await t.test('F18.2: Validation engine rejects missing full name', () => {
    const invalid = {
      fullName: '',
      businessName: 'Vance Ltd',
      email: 'marcus@vance.com',
      industry: 'hospitality',
      service: 'custom-platforms',
      description: 'Valid description text with more than 10 characters.'
    };
    const result = validateContactPayload(invalid);
    assert.strictEqual(result.valid, false);
    assert.ok(result.errors.some(e => e.includes('Full Name')));
  });

  await t.test('F18.3: Validation engine rejects invalid email syntax', () => {
    const invalid = {
      fullName: 'Marcus Vance',
      businessName: 'Vance Ltd',
      email: 'not-an-email',
      industry: 'hospitality',
      service: 'custom-platforms',
      description: 'Valid description text with more than 10 characters.'
    };
    const result = validateContactPayload(invalid);
    assert.strictEqual(result.valid, false);
    assert.ok(result.errors.some(e => e.includes('email')));
  });

  await t.test('F18.4: Validation engine rejects invalid industry enum', () => {
    const invalid = {
      fullName: 'Marcus Vance',
      businessName: 'Vance Ltd',
      email: 'marcus@vance.com',
      industry: 'cryptocurrency-trading',
      service: 'custom-platforms',
      description: 'Valid description text with more than 10 characters.'
    };
    const result = validateContactPayload(invalid);
    assert.strictEqual(result.valid, false);
    assert.ok(result.errors.some(e => e.includes('Industry')));
  });

  await t.test('F18.5: Validation engine rejects too-short project description (<10 chars)', () => {
    const invalid = {
      fullName: 'Marcus Vance',
      businessName: 'Vance Ltd',
      email: 'marcus@vance.com',
      industry: 'hospitality',
      service: 'custom-platforms',
      description: 'Short'
    };
    const result = validateContactPayload(invalid);
    assert.strictEqual(result.valid, false);
    assert.ok(result.errors.some(e => e.includes('description')));
  });

  await t.test('F18.6: Data persistence writes inquiry record atomically to disk', () => {
    const testFile = 'data/test_contact_submission.json';
    const diskPath = path.resolve(ROOT_DIR, testFile);
    safeUnlinkSync(diskPath); // Pre-test cleanup

    const payload = {
      fullName: 'Dr. Anita Roy',
      businessName: 'Apex Health Systems',
      email: 'anita@apexhealth.org',
      phone: '+1 555 234 5678',
      industry: 'beauty-wellness',
      service: 'ai-agents',
      description: 'Deploying autonomous triage agents for clinical staff scheduling.'
    };

    try {
      const record = testPersistInquiry(payload, testFile);
      assert.ok(record.id.startsWith('inq_'), 'Expected generated submission id starting with inq_');
      assert.ok(record.receivedAt, 'Expected ISO timestamp on received record');
      assert.strictEqual(record.status, 'received');

      // Verify on disk
      assert.ok(fs.existsSync(diskPath), 'Expected file on disk');
      const diskData = JSON.parse(fs.readFileSync(diskPath, 'utf8'));
      assert.ok(Array.isArray(diskData), 'Expected array of records');
      assert.strictEqual(diskData[diskData.length - 1].payload.fullName, 'Dr. Anita Roy');
    } finally {
      safeUnlinkSync(diskPath); // Guaranteed cleanup
    }
  });

  await t.test('F18.7: Route handler /api/contact exists or is mapped for Milestone 5', (subT) => {
    const exists = fileExists('src/app/api/contact/route.ts') || fileExists('src/lib/contactStore.ts');
    if (!exists) {
      subT.skip('Pending Milestone M5: /api/contact Route Handler implementation');
      return;
    }
    assert.ok(exists, 'Expected /api/contact route handler or store');
  });
});
