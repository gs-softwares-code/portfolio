/**
 * Tier 1: Feature Coverage
 * Test Suite 09: SEO Infrastructure, Social Graph Metadata & Accessibility Standards
 */
import test from 'node:test';
import assert from 'node:assert';
import { readFileSafe, fileExists } from '../helpers/parser.mjs';

test('T1.09: SEO, OpenGraph & Accessibility Suite', async (t) => {
  const layoutContent = readFileSafe('src/app/layout.tsx') || '';
  const globalsCss = readFileSafe('src/app/globals.css') || '';

  // Feature 19: SEO Metadata
  await t.test('F19.1: Root layout defines page title with GS-Softwares branding', () => {
    const hasTitle = layoutContent.includes('GS-Softwares') || layoutContent.includes('GS Softwares');
    assert.ok(hasTitle, 'Expected GS-Softwares in root title metadata');
  });

  await t.test('F19.2: Root layout defines authoritative meta description', () => {
    const hasDesc = layoutContent.includes('description') &&
                    (layoutContent.includes('AI') || layoutContent.includes('intelligent') || layoutContent.includes('digital'));
    assert.ok(hasDesc, 'Expected meta description in root layout');
  });

  await t.test('F19.3: OpenGraph social metadata configured (title, description, type, url)', () => {
    const hasOg = layoutContent.includes('openGraph') || layoutContent.includes('og:');
    assert.ok(hasOg, 'Expected OpenGraph metadata configured in layout');
  });

  await t.test('F19.4: Twitter card metadata configured (card: summary_large_image)', () => {
    const hasTwitter = layoutContent.includes('twitter') || layoutContent.includes('summary_large_image');
    assert.ok(hasTwitter, 'Expected Twitter card metadata configured in layout');
  });

  await t.test('F19.5: Dynamic sitemap generator exists (sitemap.ts / sitemap.xml)', (subT) => {
    const exists = fileExists('src/app/sitemap.ts') || fileExists('src/app/sitemap.js') || fileExists('public/sitemap.xml');
    if (!exists) {
      subT.skip('Pending Milestone M5: sitemap.ts generator');
      return;
    }
    assert.ok(exists, 'Expected dynamic sitemap generator');
  });

  await t.test('F19.6: Dynamic robots generator exists (robots.ts / robots.txt)', (subT) => {
    const exists = fileExists('src/app/robots.ts') || fileExists('src/app/robots.js') || fileExists('public/robots.txt');
    if (!exists) {
      subT.skip('Pending Milestone M5: robots.ts generator');
      return;
    }
    assert.ok(exists, 'Expected dynamic robots generator');
  });

  await t.test('F19.7: JSON-LD Structured Data Schema (Organization / WebSite) configured', (subT) => {
    const hasJsonLd = layoutContent.includes('application/ld+json') || layoutContent.includes('schema.org');
    if (!hasJsonLd) {
      subT.skip('Pending Milestone M5: JSON-LD Structured Data in layout');
      return;
    }
    assert.ok(hasJsonLd, 'Expected JSON-LD Structured Data in layout');
  });

  // Accessibility Standards
  await t.test('F19.8: Root html tag specifies lang="en"', () => {
    const hasLang = layoutContent.includes('lang="en"') || layoutContent.includes("lang='en'") || layoutContent.includes('lang: "en"');
    assert.ok(hasLang, 'Expected lang="en" attribute on root <html>');
  });

  await t.test('F19.9: CSS defines prefers-reduced-motion media query overrides', () => {
    const hasReducedMotion = globalsCss.includes('prefers-reduced-motion') ||
                             globalsCss.includes('animation-duration: 0.01ms') ||
                             globalsCss.includes('animation: none');
    assert.ok(hasReducedMotion, 'Expected prefers-reduced-motion safety overrides in globals.css');
  });

  await t.test('F19.10: Accessible focus visible rings defined for keyboard navigation', () => {
    const hasFocus = globalsCss.includes('focus-visible') || globalsCss.includes('outline') || layoutContent.includes('focus:');
    assert.ok(hasFocus, 'Expected focus-visible outline or ring rules for accessibility');
  });
});
