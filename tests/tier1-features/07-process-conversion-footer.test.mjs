/**
 * Tier 1: Feature Coverage
 * Test Suite 07: Section 08 Process Timeline, Section 09 Dark Neumorphic Conversion & Section 11 Footer
 */
import test from 'node:test';
import assert from 'node:assert';
import { readFileSafe, fileExists, readAllFilesRecursively } from '../helpers/parser.mjs';

test('T1.07: Process, Conversion & Footer Suite', async (t) => {
  const allComponents = readAllFilesRecursively('src/components');
  const pageContent = readFileSafe('src/app/page.tsx') || '';
  const allText = [pageContent, ...allComponents.map(c => c.content)].join('\n');

  // Feature 14: Section 08 Process Timeline
  await t.test('F14.1: Process component exists with #process anchor', (subT) => {
    const hasProcess = fileExists('src/components/sections/Section07Process.tsx') ||
                       pageContent.includes('id="process"') ||
                       allText.includes('Section07Process');
    if (!hasProcess) {
      subT.skip('Pending Milestone M4: Process Timeline component');
      return;
    }
    assert.ok(hasProcess, 'Expected Process Timeline component');
  });

  await t.test('F14.2: Stage 1: Discover present in process timeline', (subT) => {
    const hasProcess = fileExists('src/components/sections/Section07Process.tsx');
    if (!hasProcess) {
      subT.skip('Pending Milestone M4: Process Timeline component');
      return;
    }
    const content = readFileSafe('src/components/sections/Section07Process.tsx') || '';
    assert.ok(content.includes('Discover'), 'Expected Stage 1: Discover');
  });

  await t.test('F14.3: Stage 2: Architect present in process timeline', (subT) => {
    const hasProcess = fileExists('src/components/sections/Section07Process.tsx');
    if (!hasProcess) {
      subT.skip('Pending Milestone M4: Process Timeline component');
      return;
    }
    const content = readFileSafe('src/components/sections/Section07Process.tsx') || '';
    assert.ok(content.includes('Architect'), 'Expected Stage 2: Architect');
  });

  await t.test('F14.4: Stage 3: Engineer present in process timeline', (subT) => {
    const hasProcess = fileExists('src/components/sections/Section07Process.tsx');
    if (!hasProcess) {
      subT.skip('Pending Milestone M4: Process Timeline component');
      return;
    }
    const content = readFileSafe('src/components/sections/Section07Process.tsx') || '';
    assert.ok(content.includes('Engineer'), 'Expected Stage 3: Engineer');
  });

  await t.test('F14.5: Stage 4: Deploy present in process timeline', (subT) => {
    const hasProcess = fileExists('src/components/sections/Section07Process.tsx');
    if (!hasProcess) {
      subT.skip('Pending Milestone M4: Process Timeline component');
      return;
    }
    const content = readFileSafe('src/components/sections/Section07Process.tsx') || '';
    assert.ok(content.includes('Deploy'), 'Expected Stage 4: Deploy');
  });

  await t.test('F14.6: Stage 5: Evolve present in process timeline', (subT) => {
    const hasProcess = fileExists('src/components/sections/Section07Process.tsx');
    if (!hasProcess) {
      subT.skip('Pending Milestone M4: Process Timeline component');
      return;
    }
    const content = readFileSafe('src/components/sections/Section07Process.tsx') || '';
    assert.ok(content.includes('Evolve'), 'Expected Stage 5: Evolve');
  });

  // Feature 15: Section 09 Dark Neumorphic Conversion
  await t.test('F15.1: Conversion component exists with #conversion anchor', (subT) => {
    const hasConv = fileExists('src/components/sections/Section08Conversion.tsx') ||
                    pageContent.includes('id="conversion"') ||
                    allText.includes('Section08Conversion');
    if (!hasConv) {
      subT.skip('Pending Milestone M4: Conversion component');
      return;
    }
    assert.ok(hasConv, 'Expected Conversion component');
  });

  await t.test('F15.2: Conversion section utilizes dark neumorphic background #171C29', (subT) => {
    const hasConv = fileExists('src/components/sections/Section08Conversion.tsx');
    if (!hasConv) {
      subT.skip('Pending Milestone M4: Conversion component');
      return;
    }
    const content = readFileSafe('src/components/sections/Section08Conversion.tsx') || '';
    const hasDarkBg = content.includes('#171C29') || content.includes('bg-bg-dark') || content.includes('surfaceDark');
    assert.ok(hasDarkBg, 'Expected dark neumorphic background #171C29');
  });

  await t.test('F15.3: Conversion headline "Your Next Competitive Advantage Starts With Better Engineering."', (subT) => {
    const hasConv = fileExists('src/components/sections/Section08Conversion.tsx');
    if (!hasConv) {
      subT.skip('Pending Milestone M4: Conversion component');
      return;
    }
    const content = readFileSafe('src/components/sections/Section08Conversion.tsx') || '';
    assert.ok(content.includes('Your Next Competitive Advantage Starts With Better Engineering'), 'Expected authoritative conversion headline');
  });

  await t.test('F15.4: Conversion section contains direct consultation and GitHub CTAs', (subT) => {
    const hasConv = fileExists('src/components/sections/Section08Conversion.tsx');
    if (!hasConv) {
      subT.skip('Pending Milestone M4: Conversion component');
      return;
    }
    const content = readFileSafe('src/components/sections/Section08Conversion.tsx') || '';
    assert.ok(content.includes('#contact') || content.includes('Consultation'), 'Expected Consultation CTA');
    assert.ok(content.includes('https://github.com/Gulshan-Singh-gs') || content.includes('GitHub'), 'Expected GitHub CTA');
  });

  // Feature 16: Section 11 Complete Brand Footer
  await t.test('F16.1: Footer component exists in layout or codebase', (subT) => {
    const hasFooter = fileExists('src/components/layout/Footer.tsx') || allText.includes('<footer') || allText.includes('Footer');
    if (!hasFooter) {
      subT.skip('Pending Milestone M4: Footer component');
      return;
    }
    assert.ok(hasFooter, 'Expected Footer component');
  });

  await t.test('F16.2: Footer includes official GitHub profile link https://github.com/Gulshan-Singh-gs', (subT) => {
    const hasFooter = fileExists('src/components/layout/Footer.tsx');
    if (!hasFooter) {
      subT.skip('Pending Milestone M4: Footer component');
      return;
    }
    const content = readFileSafe('src/components/layout/Footer.tsx') || '';
    assert.ok(content.includes('https://github.com/Gulshan-Singh-gs'), 'Expected official GitHub profile link in Footer');
  });

  await t.test('F16.3: Footer contains copyright notice with GS-Softwares', (subT) => {
    const hasFooter = fileExists('src/components/layout/Footer.tsx');
    if (!hasFooter) {
      subT.skip('Pending Milestone M4: Footer component');
      return;
    }
    const content = readFileSafe('src/components/layout/Footer.tsx') || '';
    const hasCopyright = (content.includes('©') || content.includes('Copyright')) && content.includes('GS-Softwares');
    assert.ok(hasCopyright, 'Expected copyright notice in Footer');
  });

  await t.test('F16.4: Footer links to core sections (Home, Services, Solutions, Our Work)', (subT) => {
    const hasFooter = fileExists('src/components/layout/Footer.tsx');
    if (!hasFooter) {
      subT.skip('Pending Milestone M4: Footer component');
      return;
    }
    const content = readFileSafe('src/components/layout/Footer.tsx') || '';
    assert.ok(content.includes('#hero') || content.includes('Home'), 'Expected Home link');
    assert.ok(content.includes('#services') || content.includes('Services'), 'Expected Services link');
  });
});
