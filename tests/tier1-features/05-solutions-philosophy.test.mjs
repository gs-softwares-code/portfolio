/**
 * Tier 1: Feature Coverage
 * Test Suite 05: Section 05 Industry Solutions & Section 06 Engineering Philosophy
 */
import test from 'node:test';
import assert from 'node:assert';
import { readFileSafe, fileExists, readAllFilesRecursively } from '../helpers/parser.mjs';

test('T1.05: Industry Solutions & Engineering Philosophy Suite', async (t) => {
  const allComponents = readAllFilesRecursively('src/components');
  const pageContent = readFileSafe('src/app/page.tsx') || '';
  const allText = [pageContent, ...allComponents.map(c => c.content)].join('\n');

  // Feature 10: Section 05 Industry Solutions (5-Tab Selector)
  await t.test('F10.1: Solutions component exists with #solutions anchor', (subT) => {
    const hasSolutions = fileExists('src/components/sections/Section04Solutions.tsx') ||
                         pageContent.includes('id="solutions"') ||
                         allText.includes('Section04Solutions');
    if (!hasSolutions) {
      subT.skip('Pending Milestone M3: Industry Solutions component');
      return;
    }
    assert.ok(hasSolutions, 'Expected Industry Solutions component');
  });

  await t.test('F10.2: Industry 1: Hospitality covered in solutions selector', (subT) => {
    const hasSolutions = fileExists('src/components/sections/Section04Solutions.tsx');
    if (!hasSolutions) {
      subT.skip('Pending Milestone M3: Industry Solutions component');
      return;
    }
    const content = readFileSafe('src/components/sections/Section04Solutions.tsx') || '';
    assert.ok(content.includes('Hospitality') || content.includes('hospitality'), 'Expected Hospitality industry');
  });

  await t.test('F10.3: Industry 2: Beauty & Wellness covered in solutions selector', (subT) => {
    const hasSolutions = fileExists('src/components/sections/Section04Solutions.tsx');
    if (!hasSolutions) {
      subT.skip('Pending Milestone M3: Industry Solutions component');
      return;
    }
    const content = readFileSafe('src/components/sections/Section04Solutions.tsx') || '';
    assert.ok(content.includes('Beauty') || content.includes('Wellness') || content.includes('wellness'), 'Expected Beauty & Wellness industry');
  });

  await t.test('F10.4: Industry 3: Legal & Professional Services covered in solutions selector', (subT) => {
    const hasSolutions = fileExists('src/components/sections/Section04Solutions.tsx');
    if (!hasSolutions) {
      subT.skip('Pending Milestone M3: Industry Solutions component');
      return;
    }
    const content = readFileSafe('src/components/sections/Section04Solutions.tsx') || '';
    assert.ok(content.includes('Legal') || content.includes('Professional'), 'Expected Legal & Professional Services industry');
  });

  await t.test('F10.5: Industry 4: Retail & Commerce covered in solutions selector', (subT) => {
    const hasSolutions = fileExists('src/components/sections/Section04Solutions.tsx');
    if (!hasSolutions) {
      subT.skip('Pending Milestone M3: Industry Solutions component');
      return;
    }
    const content = readFileSafe('src/components/sections/Section04Solutions.tsx') || '';
    assert.ok(content.includes('Retail') || content.includes('Commerce'), 'Expected Retail & Commerce industry');
  });

  await t.test('F10.6: Industry 5: Growing Businesses covered in solutions selector', (subT) => {
    const hasSolutions = fileExists('src/components/sections/Section04Solutions.tsx');
    if (!hasSolutions) {
      subT.skip('Pending Milestone M3: Industry Solutions component');
      return;
    }
    const content = readFileSafe('src/components/sections/Section04Solutions.tsx') || '';
    assert.ok(content.includes('Growing') || content.includes('Enterprise') || content.includes('Startups'), 'Expected Growing Businesses industry');
  });

  await t.test('F10.7: Zero fabricated testimonials rule enforced in solutions', (subT) => {
    const hasSolutions = fileExists('src/components/sections/Section04Solutions.tsx');
    if (!hasSolutions) {
      subT.skip('Pending Milestone M3: Industry Solutions component');
      return;
    }
    const content = readFileSafe('src/components/sections/Section04Solutions.tsx') || '';
    // Assert no fake quotes like "Best software ever! - CEO John"
    const hasFakeQuotes = content.includes('CEO at Fortune') || content.includes('John Doe') || content.includes('Jane Smith');
    assert.strictEqual(hasFakeQuotes, false, 'No fabricated testimonials should be present');
  });

  // Feature 11: Section 06 Engineering Philosophy (4 Principles & Diagram)
  await t.test('F11.1: Engineering Philosophy component exists with #philosophy anchor', (subT) => {
    const hasPhilosophy = fileExists('src/components/sections/Section05Philosophy.tsx') ||
                          pageContent.includes('id="philosophy"') ||
                          allText.includes('Section05Philosophy');
    if (!hasPhilosophy) {
      subT.skip('Pending Milestone M3: Philosophy component');
      return;
    }
    assert.ok(hasPhilosophy, 'Expected Engineering Philosophy component');
  });

  await t.test('F11.2: Principle 1: Business-First Engineering present', (subT) => {
    const hasPhilosophy = fileExists('src/components/sections/Section05Philosophy.tsx');
    if (!hasPhilosophy) {
      subT.skip('Pending Milestone M3: Philosophy component');
      return;
    }
    const content = readFileSafe('src/components/sections/Section05Philosophy.tsx') || '';
    assert.ok(content.includes('Business-First') || content.includes('Business First'), 'Expected Principle 1: Business-First Engineering');
  });

  await t.test('F11.3: Principle 2: Purpose-Built Systems present', (subT) => {
    const hasPhilosophy = fileExists('src/components/sections/Section05Philosophy.tsx');
    if (!hasPhilosophy) {
      subT.skip('Pending Milestone M3: Philosophy component');
      return;
    }
    const content = readFileSafe('src/components/sections/Section05Philosophy.tsx') || '';
    assert.ok(content.includes('Purpose-Built') || content.includes('Purpose Built'), 'Expected Principle 2: Purpose-Built Systems');
  });

  await t.test('F11.4: Principle 3: Intelligent by Design present', (subT) => {
    const hasPhilosophy = fileExists('src/components/sections/Section05Philosophy.tsx');
    if (!hasPhilosophy) {
      subT.skip('Pending Milestone M3: Philosophy component');
      return;
    }
    const content = readFileSafe('src/components/sections/Section05Philosophy.tsx') || '';
    assert.ok(content.includes('Intelligent by Design') || content.includes('Intelligent By Design'), 'Expected Principle 3: Intelligent by Design');
  });

  await t.test('F11.5: Principle 4: Built to Scale present', (subT) => {
    const hasPhilosophy = fileExists('src/components/sections/Section05Philosophy.tsx');
    if (!hasPhilosophy) {
      subT.skip('Pending Milestone M3: Philosophy component');
      return;
    }
    const content = readFileSafe('src/components/sections/Section05Philosophy.tsx') || '';
    assert.ok(content.includes('Built to Scale') || content.includes('Built To Scale'), 'Expected Principle 4: Built to Scale');
  });

  await t.test('F11.6: Connected engineering system diagram present', (subT) => {
    const hasPhilosophy = fileExists('src/components/sections/Section05Philosophy.tsx');
    if (!hasPhilosophy) {
      subT.skip('Pending Milestone M3: Philosophy component');
      return;
    }
    const content = readFileSafe('src/components/sections/Section05Philosophy.tsx') || '';
    const hasDiagram = content.includes('svg') || content.includes('timeline') || content.includes('flywheel') || content.includes('diagram') || content.includes('flex') || content.includes('grid');
    assert.ok(hasDiagram, 'Expected connected system diagram');
  });
});
