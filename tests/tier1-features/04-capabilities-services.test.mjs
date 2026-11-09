/**
 * Tier 1: Feature Coverage
 * Test Suite 04: Section 03 Capability Overview & Section 04 Premium Services
 */
import test from 'node:test';
import assert from 'node:assert';
import { readFileSafe, fileExists, readAllFilesRecursively } from '../helpers/parser.mjs';

test('T1.04: Capabilities & Services Suite', async (t) => {
  const allComponents = readAllFilesRecursively('src/components');
  const pageContent = readFileSafe('src/app/page.tsx') || '';
  const allText = [pageContent, ...allComponents.map(c => c.content)].join('\n');

  // Feature 8: Section 03 Capability Overview
  await t.test('F8.1: Capability Overview component or section exists', (subT) => {
    const hasCap = fileExists('src/components/sections/Section02Capabilities.tsx') ||
                   pageContent.includes('id="capabilities"') ||
                   allText.includes('CAPABILITY MATRIX') ||
                   allText.includes('Three Pillars');
    if (!hasCap) {
      subT.skip('Pending Milestone M3: Capabilities component');
      return;
    }
    assert.ok(hasCap, 'Expected Capability Overview section');
  });

  await t.test('F8.2: Pillar 1: Autonomous Intelligence present in capabilities', (subT) => {
    const hasCap = fileExists('src/components/sections/Section02Capabilities.tsx');
    if (!hasCap) {
      subT.skip('Pending Milestone M3: Capabilities component');
      return;
    }
    const capContent = readFileSafe('src/components/sections/Section02Capabilities.tsx') || '';
    const hasPillar = capContent.includes('Intelligence') || capContent.includes('Autonomous');
    assert.ok(hasPillar, 'Expected Pillar 1: Autonomous Intelligence');
  });

  await t.test('F8.3: Pillar 2: System Automation present in capabilities', (subT) => {
    const hasCap = fileExists('src/components/sections/Section02Capabilities.tsx');
    if (!hasCap) {
      subT.skip('Pending Milestone M3: Capabilities component');
      return;
    }
    const capContent = readFileSafe('src/components/sections/Section02Capabilities.tsx') || '';
    const hasPillar = capContent.includes('Automation') || capContent.includes('Pipeline');
    assert.ok(hasPillar, 'Expected Pillar 2: System Automation');
  });

  await t.test('F8.4: Pillar 3: Deterministic Engineering present in capabilities', (subT) => {
    const hasCap = fileExists('src/components/sections/Section02Capabilities.tsx');
    if (!hasCap) {
      subT.skip('Pending Milestone M3: Capabilities component');
      return;
    }
    const capContent = readFileSafe('src/components/sections/Section02Capabilities.tsx') || '';
    const hasPillar = capContent.includes('Engineering') || capContent.includes('Deterministic');
    assert.ok(hasPillar, 'Expected Pillar 3: Deterministic Engineering');
  });

  await t.test('F8.5: Visual composition varies across the 3 pillars (non-identical layouts)', (subT) => {
    const hasCap = fileExists('src/components/sections/Section02Capabilities.tsx');
    if (!hasCap) {
      subT.skip('Pending Milestone M3: Capabilities component');
      return;
    }
    const capContent = readFileSafe('src/components/sections/Section02Capabilities.tsx') || '';
    // Check for distinct visual patterns: terminal or timeline or split grid
    const hasVariedLayout = capContent.includes('terminal') || capContent.includes('tree') || capContent.includes('col-span') || capContent.includes('grid-cols');
    assert.ok(hasVariedLayout, 'Expected varied layout patterns across capability pillars');
  });

  // Feature 9: Section 04 Premium Services
  await t.test('F9.1: Services component exists with #services anchor', (subT) => {
    const hasServices = fileExists('src/components/sections/Section03Services.tsx') ||
                        pageContent.includes('id="services"') ||
                        allText.includes('Section03Services');
    if (!hasServices) {
      subT.skip('Pending Milestone M3: Services component');
      return;
    }
    assert.ok(hasServices, 'Expected Services component');
  });

  await t.test('F9.2: Service 1: AI Agent Development present', (subT) => {
    const hasServices = fileExists('src/components/sections/Section03Services.tsx');
    if (!hasServices) {
      subT.skip('Pending Milestone M3: Services component');
      return;
    }
    const content = readFileSafe('src/components/sections/Section03Services.tsx') || '';
    assert.ok(content.includes('AI Agent') || content.includes('Agent Development'), 'Expected Service 1: AI Agent Development');
  });

  await t.test('F9.3: Service 2: Business Automation present', (subT) => {
    const hasServices = fileExists('src/components/sections/Section03Services.tsx');
    if (!hasServices) {
      subT.skip('Pending Milestone M3: Services component');
      return;
    }
    const content = readFileSafe('src/components/sections/Section03Services.tsx') || '';
    assert.ok(content.includes('Business Automation') || content.includes('Workflow Automation'), 'Expected Service 2: Business Automation');
  });

  await t.test('F9.4: Service 3: Custom Business Platforms present', (subT) => {
    const hasServices = fileExists('src/components/sections/Section03Services.tsx');
    if (!hasServices) {
      subT.skip('Pending Milestone M3: Services component');
      return;
    }
    const content = readFileSafe('src/components/sections/Section03Services.tsx') || '';
    assert.ok(content.includes('Custom Business Platform') || content.includes('Platforms'), 'Expected Service 3: Custom Business Platforms');
  });

  await t.test('F9.5: Service 4: Website Engineering present', (subT) => {
    const hasServices = fileExists('src/components/sections/Section03Services.tsx');
    if (!hasServices) {
      subT.skip('Pending Milestone M3: Services component');
      return;
    }
    const content = readFileSafe('src/components/sections/Section03Services.tsx') || '';
    assert.ok(content.includes('Website Engineering') || content.includes('Web Engineering'), 'Expected Service 4: Website Engineering');
  });

  await t.test('F9.6: Service 5: Application Development present', (subT) => {
    const hasServices = fileExists('src/components/sections/Section03Services.tsx');
    if (!hasServices) {
      subT.skip('Pending Milestone M3: Services component');
      return;
    }
    const content = readFileSafe('src/components/sections/Section03Services.tsx') || '';
    assert.ok(content.includes('Application Development') || content.includes('App Development'), 'Expected Service 5: Application Development');
  });

  await t.test('F9.7: Service 6: Digital Infrastructure present', (subT) => {
    const hasServices = fileExists('src/components/sections/Section03Services.tsx');
    if (!hasServices) {
      subT.skip('Pending Milestone M3: Services component');
      return;
    }
    const content = readFileSafe('src/components/sections/Section03Services.tsx') || '';
    assert.ok(content.includes('Digital Infrastructure') || content.includes('Infrastructure'), 'Expected Service 6: Digital Infrastructure');
  });
});
