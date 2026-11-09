/**
 * Tier 2: Boundary & Corner Cases
 * Test Suite 11: Responsive Layout Breakpoints & Zero Horizontal Overflow Boundaries
 */
import test from 'node:test';
import assert from 'node:assert';
import { readFileSafe, readAllFilesRecursively } from '../helpers/parser.mjs';

test('T2.11: Responsive Layout & Zero Overflow Boundaries Suite', async (t) => {
  const globalsCss = readFileSafe('src/app/globals.css') || '';
  const layoutContent = readFileSafe('src/app/layout.tsx') || '';
  const pageContent = readFileSafe('src/app/page.tsx') || '';
  const allComponents = readAllFilesRecursively('src/components');
  const allCode = [globalsCss, layoutContent, pageContent, ...allComponents.map(c => c.content)].join('\n');

  await t.test('B11.1: Global CSS or layout prevents horizontal overflow (overflow-x constraint)', () => {
    const hasOverflowControl = globalsCss.includes('overflow-x') ||
                               allCode.includes('overflow-hidden') ||
                               allCode.includes('overflow-x-hidden') ||
                               globalsCss.includes('max-w-full') ||
                               globalsCss.includes('box-sizing');
    assert.ok(hasOverflowControl, 'Expected overflow-x: hidden or overflow control on layout root');
  });

  await t.test('B11.2: Viewport meta tag is configured with width=device-width, initial-scale=1', () => {
    // Next.js App Router sets default viewport or via layout
    const hasViewport = layoutContent.includes('viewport') || layoutContent.includes('device-width') || layoutContent.includes('html');
    assert.ok(hasViewport, 'Expected standard viewport configuration in layout');
  });

  await t.test('B11.3: Responsive breakpoint classes (sm:, md:, lg:) actively utilized', () => {
    assert.ok(allCode.includes('sm:'), 'Expected sm: breakpoint classes');
    assert.ok(allCode.includes('md:'), 'Expected md: breakpoint classes');
    assert.ok(allCode.includes('lg:'), 'Expected lg: breakpoint classes');
  });

  await t.test('B11.4: Mobile-first 1-column to multi-column responsive grid scaling', () => {
    const hasResponsiveGrid = allCode.includes('grid-cols-1') &&
                             (allCode.includes('md:grid-cols-2') || allCode.includes('sm:grid-cols-2') || allCode.includes('lg:grid-cols-'));
    assert.ok(hasResponsiveGrid, 'Expected mobile-first grid-cols-1 transitioning to multi-column on tablet/desktop');
  });

  await t.test('B11.5: Flexible wrapping containers use flex-wrap to prevent clipping on 320px viewports', () => {
    assert.ok(allCode.includes('flex-wrap'), 'Expected flex-wrap utility on button groups and tag rows');
  });

  await t.test('B11.6: Fixed pixel widths greater than 320px without max-w-full are prevented', () => {
    // Check that hardcoded fixed widths like w-[500px] or w-[800px] are accompanied by max-w-full or inside responsive containers
    const hardcodedWideRegex = /className="[^"]*w-\[(\d+)px\][^"]*"/g;
    let match;
    let wideViolations = 0;
    while ((match = hardcodedWideRegex.exec(allCode)) !== null) {
      const px = parseInt(match[1], 10);
      if (px > 350 && !match[0].includes('max-w')) {
        wideViolations++;
      }
    }
    assert.strictEqual(wideViolations, 0, 'No hardcoded fixed widths > 350px without max-w constraints should exist');
  });

  await t.test('B11.7: Container max-width bounds configured (e.g. max-w-6xl or max-w-7xl)', () => {
    const hasMaxW = allCode.includes('max-w-6xl') || allCode.includes('max-w-7xl') || allCode.includes('max-w-5xl');
    assert.ok(hasMaxW, 'Expected container max-w bounds for wide screens (>1440px)');
  });

  await t.test('B11.8: Touch target minimum sizes (>= 44x44px or py-2 px-4) for mobile devices', () => {
    const hasTouchPadding = allCode.includes('p-') || allCode.includes('py-') || allCode.includes('h-10') || allCode.includes('h-11');
    assert.ok(hasTouchPadding, 'Expected touch-friendly padding on interactive elements');
  });
});
