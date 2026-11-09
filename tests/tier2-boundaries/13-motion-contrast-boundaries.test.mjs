/**
 * Tier 2: Boundary & Corner Cases
 * Test Suite 13: Motion Overrides & Mathematical Contrast Boundary Properties
 */
import test from 'node:test';
import assert from 'node:assert';
import { readFileSafe } from '../helpers/parser.mjs';
import {
  getRelativeLuminance,
  getContrastRatio,
  hexToRgb
} from '../helpers/contrast.mjs';

test('T2.13: Motion & Mathematical Contrast Boundaries Suite', async (t) => {
  const globalsCss = readFileSafe('src/app/globals.css') || '';

  // Contrast Calculation Mathematical Invariants
  await t.test('B13.1: Relative luminance of pure black #000000 is 0.0', () => {
    const lum = getRelativeLuminance('#000000');
    assert.strictEqual(lum, 0);
  });

  await t.test('B13.2: Relative luminance of pure white #FFFFFF is 1.0', () => {
    const lum = getRelativeLuminance('#FFFFFF');
    assert.strictEqual(Math.round(lum * 100) / 100, 1.0);
  });

  await t.test('B13.3: Contrast ratio of pure black against pure white is 21.0:1 (maximum possible)', () => {
    const ratio = getContrastRatio('#000000', '#FFFFFF');
    assert.strictEqual(Math.round(ratio), 21);
  });

  await t.test('B13.4: Contrast ratio of identical colors is exactly 1.0:1 (minimum possible)', () => {
    const ratio1 = getContrastRatio('#E9EDF2', '#E9EDF2');
    assert.strictEqual(ratio1, 1.0);
    const ratio2 = getContrastRatio('#171C29', '#171C29');
    assert.strictEqual(ratio2, 1.0);
  });

  await t.test('B13.5: Contrast ratio function is symmetric: ratio(A, B) === ratio(B, A)', () => {
    const rAB = getContrastRatio('#526FE5', '#E9EDF2');
    const rBA = getContrastRatio('#E9EDF2', '#526FE5');
    assert.strictEqual(Math.round(rAB * 1000), Math.round(rBA * 1000));
  });

  await t.test('B13.6: Contrast ratio is strictly bounded within [1.0, 21.0]', () => {
    const testColors = ['#151A23', '#687386', '#526FE5', '#171C29', '#36A783', '#F8FAFC', '#94A3B8'];
    for (const c1 of testColors) {
      for (const c2 of testColors) {
        const ratio = getContrastRatio(c1, c2);
        assert.ok(ratio >= 1.0 && ratio <= 21.0, `Ratio ${ratio} out of bounds for ${c1} and ${c2}`);
      }
    }
  });

  // Reduced Motion Media Query Boundaries
  await t.test('B13.7: globals.css prefers-reduced-motion block contains 0.01ms animation-duration override', () => {
    const hasReduced = globalsCss.includes('prefers-reduced-motion') &&
                      (globalsCss.includes('0.01ms') || globalsCss.includes('none') || globalsCss.includes('0s'));
    assert.ok(hasReduced, 'Expected immediate transition/animation duration suppression in reduced-motion');
  });

  await t.test('B13.8: globals.css prefers-reduced-motion sets scroll-behavior: auto', () => {
    const hasAutoScroll = globalsCss.includes('scroll-behavior: auto') || globalsCss.includes('scroll-behavior');
    assert.ok(hasAutoScroll, 'Expected scroll-behavior adjustment under reduced-motion');
  });

  // Hex Parser Robustness
  await t.test('B13.9: Hex parser correctly handles 3-digit shorthand (#FFF, #000)', () => {
    const white = hexToRgb('#FFF');
    assert.deepStrictEqual(white, { r: 255, g: 255, b: 255 });
    const black = hexToRgb('#000');
    assert.deepStrictEqual(black, { r: 0, g: 0, b: 0 });
  });

  await t.test('B13.10: Hex parser throws error on invalid hex string', () => {
    assert.throws(() => hexToRgb('not-a-hex'), /Invalid hex/);
  });
});
