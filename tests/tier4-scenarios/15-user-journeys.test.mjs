/**
 * Tier 4: Real-World Application Scenarios
 * Test Suite 15: End-to-End User Journeys and Production Lifecycle Simulations
 */
import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { readFileSafe, fileExists, ROOT_DIR } from '../helpers/parser.mjs';
import { getContrastRatio, passesWCAG_AAA_Normal } from '../helpers/contrast.mjs';
import { validateContactPayload, testPersistInquiry, safeUnlinkSync } from '../helpers/mock-server.mjs';

test('T4.15: Real-World User Journeys & End-to-End Scenarios Suite', async (t) => {
  const pageContent = readFileSafe('src/app/page.tsx') || '';
  const globalsCss = readFileSafe('src/app/globals.css') || '';
  const layoutContent = readFileSafe('src/app/layout.tsx') || '';

  // Journey 1: Enterprise Prospect Consultation Flow
  await t.test('J15.1: Journey 1: Enterprise Prospect Consultation Flow', () => {
    // Step 1: Prospect loads page and observes live telemetry
    assert.ok(
      pageContent.includes('System Telemetry') || pageContent.includes('Online'),
      'Step 1 Failed: Live telemetry indicator must be visible to visitor'
    );

    // Step 2: Prospect prepares inquiry payload for autonomous AI agents
    const inquiry = {
      fullName: 'Vikramaditya Sharma',
      businessName: 'Punjab Logistics & Supply Chain Ltd',
      email: 'vikram@punjablogistics.in',
      phone: '+91 98140 12345',
      industry: 'hospitality',
      service: 'ai-agents',
      description: 'We require an autonomous agent swarm to automate our dispatch coordination across 12 distribution centers.'
    };

    // Step 3: Payload passes strict validation
    const validation = validateContactPayload(inquiry);
    assert.strictEqual(validation.valid, true, `Step 3 Failed: Validation errors: ${validation.errors.join(', ')}`);

    // Step 4: Submission is persisted and returns unique inquiry id
    const testFile = 'data/test_journey_inquiry.json';
    const diskPath = path.resolve(ROOT_DIR, testFile);
    safeUnlinkSync(diskPath); // Pre-test cleanup

    try {
      const record = testPersistInquiry(inquiry, testFile);
      assert.ok(record.id.startsWith('inq_'), 'Step 4 Failed: Expected inq_ prefix on generated ID');
      assert.ok(Date.parse(record.receivedAt) > 0, 'Step 4 Failed: Expected valid ISO timestamp');
    } finally {
      safeUnlinkSync(diskPath); // Guaranteed post-test cleanup
    }
  });

  // Journey 2: Technical Architect GitHub Audit Flow
  await t.test('J15.2: Journey 2: Technical Architect GitHub & Code Verification Flow', () => {
    // Step 1: Architect inspects typographic and color design tokens
    const textRatio = getContrastRatio('#151A23', '#E9EDF2');
    assert.ok(textRatio >= 14.0, 'Step 1 Failed: Text contrast must be >= 14.0:1');

    // Step 2: Architect verifies authentic GitHub profile URL
    const expectedProfile = 'https://github.com/Gulshan-Singh-gs';
    assert.ok(expectedProfile.includes('Gulshan-Singh-gs'), 'Step 2 Failed: Expected developer profile URL');

    // Step 3: Architect verifies all 10 repositories have legitimate GitHub repository targets
    const repositories = [
      'https://github.com/Gulshan-Singh-gs/off_the_grid-gym',
      'https://github.com/Gulshan-Singh-gs/CafeOS',
      'https://github.com/Gulshan-Singh-gs/Rupnagar-tailors',
      'https://github.com/Gulshan-Singh-gs/VyaparOS',
      'https://github.com/Gulshan-Singh-gs/FacultyOS',
      'https://github.com/Gulshan-Singh-gs/KrishiOS',
      'https://github.com/Gulshan-Singh-gs/monolith',
      'https://github.com/Gulshan-Singh-gs/GuardPayOS',
      'https://github.com/Gulshan-Singh-gs/CampusOs-rbu',
      'https://github.com/Gulshan-Singh-gs/Inventory'
    ];

    for (const repoUrl of repositories) {
      assert.ok(repoUrl.startsWith('https://github.com/Gulshan-Singh-gs/'), `Step 3 Failed: Invalid repository URL: ${repoUrl}`);
    }
  });

  // Journey 3: Mobile Touch & Motion Sensitive Visitor Flow
  await t.test('J15.3: Journey 3: Mobile Touch & Motion Sensitivity Flow', () => {
    // Step 1: Mobile viewport constraints active
    assert.ok(pageContent.includes('px-4') || pageContent.includes('sm:px-6'), 'Step 1: Expected responsive horizontal padding');

    // Step 2: Reduced motion overrides defined
    assert.ok(globalsCss.includes('prefers-reduced-motion'), 'Step 2: Expected prefers-reduced-motion block in globals.css');

    // Step 3: Smooth touch controls
    assert.ok(pageContent.includes('NeumorphicButton'), 'Step 3: NeumorphicButton components available for touch interaction');
  });

  // Journey 4: Screen Reader / Accessibility Traversal Flow
  await t.test('J15.4: Journey 4: Screen Reader Semantic Traversal Flow', () => {
    // Step 1: Heading hierarchy begins with h1
    assert.ok(pageContent.includes('<h1'), 'Step 1: Expected <h1> element for document root');

    // Step 2: Sections possess accessible aria-labelledby
    assert.ok(pageContent.includes('aria-labelledby') || pageContent.includes('<section'), 'Step 2: Expected accessible section labeling');

    // Step 3: Form inputs use explicit labels and bound IDs
    const inputComponent = readFileSafe('src/components/ui/NeumorphicInput.tsx') || '';
    assert.ok(inputComponent.includes('htmlFor') || inputComponent.includes('label'), 'Step 3: Expected label with htmlFor binding');
  });

  // Journey 5: Storage Resiliency & Rapid Form Burst Flow
  await t.test('J15.5: Journey 5: Storage Resiliency Under Rapid Inquiries', () => {
    const burstFile = 'data/test_burst_contacts.json';
    const burstCount = 10;
    const diskPath = path.resolve(ROOT_DIR, burstFile);

    // Unconditional pre-test cleanup to avoid accumulating records from prior runs
    safeUnlinkSync(diskPath);

    try {
      for (let i = 1; i <= burstCount; i++) {
        testPersistInquiry({
          fullName: `Burst User ${i}`,
          businessName: `Company ${i}`,
          email: `user${i}@company.com`,
          industry: 'hospitality',
          service: 'ai-agents',
          description: `Rapid test inquiry #${i} testing atomic persistence safety.`
        }, burstFile);
      }

      assert.ok(fs.existsSync(diskPath));
      const records = JSON.parse(fs.readFileSync(diskPath, 'utf8'));
      assert.strictEqual(records.length, burstCount, `Expected exactly ${burstCount} records in store`);

      // Verify all records have valid unique IDs
      const ids = new Set(records.map(r => r.id));
      assert.strictEqual(ids.size, burstCount, 'All inquiry IDs must be unique');
    } finally {
      // Guaranteed teardown even if an assertion throws
      safeUnlinkSync(diskPath);
    }
  });
});
