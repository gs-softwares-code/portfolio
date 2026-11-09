/**
 * WCAG 2.1 Contrast Calculation Utilities
 * Implements authoritative mathematical formulas for relative luminance and contrast ratios.
 */

export function hexToRgb(hex) {
  let cleaned = hex.replace(/^#/, '').trim();
  if (cleaned.length === 3) {
    cleaned = cleaned.split('').map(c => c + c).join('');
  }
  if (cleaned.length !== 6) {
    throw new Error(`Invalid hex color: "${hex}"`);
  }
  const num = parseInt(cleaned, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

export function sRgbToLinear(c) {
  const norm = c / 255;
  return norm <= 0.04045
    ? norm / 12.92
    : Math.pow((norm + 0.055) / 1.055, 2.4);
}

export function getRelativeLuminance(hexOrRgb) {
  const rgb = typeof hexOrRgb === 'string' ? hexToRgb(hexOrRgb) : hexOrRgb;
  const rLin = sRgbToLinear(rgb.r);
  const gLin = sRgbToLinear(rgb.g);
  const bLin = sRgbToLinear(rgb.b);
  return 0.2126 * rLin + 0.7152 * gLin + 0.0722 * bLin;
}

export function getContrastRatio(foregroundHex, backgroundHex) {
  const l1 = getRelativeLuminance(foregroundHex);
  const l2 = getRelativeLuminance(backgroundHex);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export function passesWCAG_AA_Normal(fgHex, bgHex) {
  return getContrastRatio(fgHex, bgHex) >= 4.5;
}

export function passesWCAG_AA_Large(fgHex, bgHex) {
  return getContrastRatio(fgHex, bgHex) >= 3.0;
}

export function passesWCAG_AAA_Normal(fgHex, bgHex) {
  return getContrastRatio(fgHex, bgHex) >= 7.0;
}

export function passesWCAG_AAA_Large(fgHex, bgHex) {
  return getContrastRatio(fgHex, bgHex) >= 4.5;
}
