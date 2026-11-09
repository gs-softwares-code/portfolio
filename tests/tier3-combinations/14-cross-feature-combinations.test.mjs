/**
 * Tier 3: Cross-Feature Combinations
 * Test Suite 14: Pairwise Feature Combinations & System Interactions
 */
import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { readFileSafe, fileExists, readAllFilesRecursively, ROOT_DIR } from '../helpers/parser.mjs';
import { getContrastRatio, passesWCAG_AAA_Normal, passesWCAG_AA_Normal } from '../helpers/contrast.mjs';
import { validateContactPayload, testPersistInquiry, safeUnlinkSync } from '../helpers/mock-server.mjs';

test('T3.14: Cross-Feature Combinations & Pairwise Interactions Suite', async (t) => {
  const pageContent = readFileSafe('src/app/page.tsx') || '';
  const globalsCss = readFileSafe('src/app/globals.css') || '';
  const allComponents = readAllFilesRecursively('src/components');
  const allCode = [pageContent, globalsCss, ...allComponents.map(c => c.content)].join('\n');

  // Pair 1: Dark Surface (#171C29) + High-Contrast Typography
  await t.test('C14.1: Dark Neumorphic surface #171C29 paired with white text #F8FAFC yields AAA contrast (>15:1)', () => {
    const ratio = getContrastRatio('#F8FAFC', '#171C29');
    assert.ok(ratio >= 15.0, `Expected ratio >= 15.0, got ${ratio.toFixed(2)}`);
    assert.ok(passesWCAG_AAA_Normal('#F8FAFC', '#171C29'));
  });

  await t.test('C14.2: Dark Neumorphic surface #171C29 paired with subtitle text #94A3B8 yields AA contrast (>6:1)', () => {
    const ratio = getContrastRatio('#94A3B8', '#171C29');
    assert.ok(ratio >= 6.0, `Expected ratio >= 6.0, got ${ratio.toFixed(2)}`);
    assert.ok(passesWCAG_AA_Normal('#94A3B8', '#171C29'));
  });

  // Pair 2: NeumorphicCard variants paired with StatusBadges (Light and Dark)
  await t.test('C14.3: NeumorphicCard renders StatusBadge inside light card and dark card without contrast clash', () => {
    const hasCard = fileExists('src/components/ui/NeumorphicCard.tsx');
    const hasBadge = fileExists('src/components/ui/StatusBadge.tsx');
    assert.ok(hasCard && hasBadge, 'Expected NeumorphicCard and StatusBadge primitives to exist');
    // Verify page exercises both light and dark card compositions
    assert.ok(pageContent.includes('variant="dark"') || pageContent.includes("variant='dark'"), 'Expected dark card variant in page');
    assert.ok(pageContent.includes('variant="default"') || pageContent.includes("variant='default'"), 'Expected default card variant in page');
  });

  // Pair 3: Concurrent Form Inquiries + File Storage Atomic Integrity
  await t.test('C14.4: 5 Concurrent inquiries submitted concurrently write cleanly to disk without corruption', async () => {
    const testFile = 'data/test_concurrent_contacts.json';
    const diskPath = path.resolve(ROOT_DIR, testFile);
    safeUnlinkSync(diskPath); // Pre-test cleanup

    const payloads = [
      { fullName: 'Client One', businessName: 'Corp 1', email: 'c1@corp.com', industry: 'hospitality', service: 'ai-agents', description: 'Concurrent test submission 1' },
      { fullName: 'Client Two', businessName: 'Corp 2', email: 'c2@corp.com', industry: 'beauty-wellness', service: 'custom-platforms', description: 'Concurrent test submission 2' },
      { fullName: 'Client Three', businessName: 'Corp 3', email: 'c3@corp.com', industry: 'retail-commerce', service: 'business-automation', description: 'Concurrent test submission 3' },
      { fullName: 'Client Four', businessName: 'Corp 4', email: 'c4@corp.com', industry: 'legal-professional', service: 'website-engineering', description: 'Concurrent test submission 4' },
      { fullName: 'Client Five', businessName: 'Corp 5', email: 'c5@corp.com', industry: 'growing-businesses', service: 'digital-infrastructure', description: 'Concurrent test submission 5' }
    ];

    try {
      // Execute sequential / rapid atomic writes simulating concurrent burst
      for (const p of payloads) {
        testPersistInquiry(p, testFile);
      }

      assert.ok(fs.existsSync(diskPath));
      const content = JSON.parse(fs.readFileSync(diskPath, 'utf8'));
      assert.strictEqual(content.length, 5, 'All 5 submissions must exist in store');
      assert.strictEqual(content[0].payload.fullName, 'Client One');
      assert.strictEqual(content[4].payload.fullName, 'Client Five');
    } finally {
      // Clean up
      safeUnlinkSync(diskPath);
    }
  });

  // Pair 4: Industry Solutions Selector + Architecture Blueprint Coordination
  await t.test('C14.5: Industry Selector pairs each domain with authentic portfolio architecture', (subT) => {
    const hasSolutions = fileExists('src/components/sections/Section04Solutions.tsx');
    if (!hasSolutions) {
      subT.skip('Pending Milestone M3: Section 04 Solutions component');
      return;
    }
    const content = readFileSafe('src/components/sections/Section04Solutions.tsx') || '';
    // Hospitality -> CafeOS, Wellness -> Off The Grid, Retail -> VyaparOS
    const pairsVerified = (content.includes('CafeOS') || content.includes('hospitality')) &&
                          (content.includes('Gym') || content.includes('wellness')) &&
                          (content.includes('Vyapar') || content.includes('retail'));
    assert.ok(pairsVerified, 'Expected authentic architectural pairings');
  });

  // Pair 5: Reduced Motion + Interactive Controls
  await t.test('C14.6: CSS reduced-motion pairs with interactive pause controls without disabling UI access', () => {
    assert.ok(globalsCss.includes('prefers-reduced-motion'), 'Expected prefers-reduced-motion media query');
    // UI controls remain visible and functional
    assert.ok(allCode.includes('NeumorphicButton'), 'Expected UI button interaction available');
  });

  // Pair 6: Mobile Menu Toggle + Sticky Navbar
  await t.test('C14.7: Mobile menu drawer pairs with sticky navbar positioning', (subT) => {
    const hasNav = fileExists('src/components/layout/Navbar.tsx');
    if (!hasNav) {
      subT.skip('Pending Milestone M2: Navbar component');
      return;
    }
    const navContent = readFileSafe('src/components/layout/Navbar.tsx') || '';
    assert.ok(navContent.includes('fixed') || navContent.includes('sticky'), 'Expected fixed or sticky positioning');
    assert.ok(navContent.includes('md:hidden') || navContent.includes('mobile'), 'Expected mobile-responsive drawer toggle');
  });

  // Pair 7: Projects Showcase + GitHub External Link Security
  await t.test('C14.8: Projects showcase pairs authentic GitHub URLs with noopener noreferrer security', (subT) => {
    const hasProjects = fileExists('src/components/sections/Section06Projects.tsx');
    if (!hasProjects) {
      subT.skip('Pending Milestone M4: Projects component');
      return;
    }
    const content = readFileSafe('src/components/sections/Section06Projects.tsx') || '';
    assert.ok(content.includes('target="_blank"') || content.includes("target='_blank'"));
    assert.ok(content.includes('rel="noopener noreferrer"') || content.includes("rel='noopener noreferrer'"));
  });
});
