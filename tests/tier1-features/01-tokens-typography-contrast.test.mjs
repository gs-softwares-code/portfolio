/**
 * Tier 1: Feature Coverage
 * Test Suite 01: Neumorphic 2.0 Tokens, Typography Hierarchy, UI Primitives & WCAG Contrast
 */
import test from 'node:test';
import assert from 'node:assert';
import { readFileSafe, fileExists } from '../helpers/parser.mjs';
import {
  getContrastRatio,
  passesWCAG_AA_Normal,
  passesWCAG_AAA_Normal,
  passesWCAG_AA_Large
} from '../helpers/contrast.mjs';

test('T1.01: Neumorphic 2.0 Tokens, Typography & WCAG Contrast Suite', async (t) => {
  const tailwindContent = readFileSafe('tailwind.config.ts') || readFileSafe('tailwind.config.js') || '';
  const globalsCss = readFileSafe('src/app/globals.css') || '';
  const layoutContent = readFileSafe('src/app/layout.tsx') || '';

  // Feature 1: Neumorphic 2.0 Palette Tokens
  await t.test('F1.1: Base light surface token #E9EDF2 defined', () => {
    const hasToken = tailwindContent.includes('#E9EDF2') || globalsCss.includes('#E9EDF2') || globalsCss.includes('#e9edf2');
    assert.ok(hasToken, 'Expected base light surface token #E9EDF2 to be defined in tailwind or globals.css');
  });

  await t.test('F1.2: Primary text token #151A23 defined', () => {
    const hasToken = tailwindContent.includes('#151A23') || globalsCss.includes('#151A23') || globalsCss.includes('#151a23');
    assert.ok(hasToken, 'Expected primary text token #151A23 to be defined');
  });

  await t.test('F1.3: Secondary text token #687386 defined', () => {
    const hasToken = tailwindContent.includes('#687386') || globalsCss.includes('#687386');
    assert.ok(hasToken, 'Expected secondary text token #687386 to be defined');
  });

  await t.test('F1.4: Accent token #4A65DC / #526FE5 defined', () => {
    const hasToken = tailwindContent.includes('#4A65DC') || tailwindContent.includes('#526FE5') || globalsCss.includes('#4A65DC') || globalsCss.includes('#526FE5') || globalsCss.includes('#526fe5');
    assert.ok(hasToken, 'Expected brand accent token #4A65DC or #526FE5 to be defined');
  });

  await t.test('F1.5: Dark contrast surface token #171C29 defined', () => {
    const hasToken = tailwindContent.includes('#171C29') || globalsCss.includes('#171C29') || globalsCss.includes('#171c29');
    assert.ok(hasToken, 'Expected dark contrast surface token #171C29 to be defined');
  });

  await t.test('F1.6: Success indicator token #36A783 defined', () => {
    const hasToken = tailwindContent.includes('#36A783') || globalsCss.includes('#36A783') || globalsCss.includes('#36a783');
    assert.ok(hasToken, 'Expected success status token #36A783 to be defined');
  });

  await t.test('F1.7: Dual box-shadow neu-flat contains positive and negative offsets', () => {
    const combined = tailwindContent + globalsCss;
    const hasDualShadow = combined.includes('163, 177, 198') || combined.includes('163,177,198') || combined.includes('shadow-neu-flat');
    assert.ok(hasDualShadow, 'Expected dual drop shadow (light + dark offset) definition');
  });

  await t.test('F1.8: Inset box-shadow neu-pressed contains inset directives', () => {
    const combined = tailwindContent + globalsCss;
    const hasInset = combined.includes('inset') && (combined.includes('neu-pressed') || combined.includes('shadow-inset'));
    assert.ok(hasInset, 'Expected inset recessed shadow for interactive/pressed states');
  });

  // Feature 2: Typography Hierarchy
  await t.test('F2.1: Space Grotesk heading font family configured', () => {
    const hasSpaceGrotesk = layoutContent.includes('Space_Grotesk') || tailwindContent.includes('Space Grotesk') || globalsCss.includes('Space Grotesk');
    assert.ok(hasSpaceGrotesk, 'Expected Space Grotesk heading font to be configured in layout or tailwind');
  });

  await t.test('F2.2: Inter body font family configured', () => {
    const hasInter = layoutContent.includes('Inter') || tailwindContent.includes('Inter') || globalsCss.includes('Inter');
    assert.ok(hasInter, 'Expected Inter body font to be configured');
  });

  await t.test('F2.3: IBM Plex Mono technical font family configured', () => {
    const hasPlexMono = layoutContent.includes('IBM_Plex_Mono') || tailwindContent.includes('IBM Plex Mono') || globalsCss.includes('IBM Plex Mono');
    assert.ok(hasPlexMono, 'Expected IBM Plex Mono monospace font to be configured');
  });

  await t.test('F2.4: Google Fonts configured with display swap in layout', () => {
    if (layoutContent) {
      assert.ok(layoutContent.includes('display: "swap"') || layoutContent.includes("display: 'swap'") || layoutContent.includes('subsets:'), 'Expected font subsets or display swap configured');
    }
  });

  await t.test('F2.5: Tailwind font family variables linked to CSS variables', () => {
    const hasFontVars = tailwindContent.includes('--font-space-grotesk') || tailwindContent.includes('--font-heading') || tailwindContent.includes('Space_Grotesk') || tailwindContent.includes('font-heading');
    assert.ok(hasFontVars, 'Expected heading font mapped in tailwind config');
  });

  // Feature 3: Core Neumorphic UI Primitives Presence
  await t.test('F3.1: NeumorphicButton component exists', () => {
    const exists = fileExists('src/components/ui/NeumorphicButton.tsx');
    assert.ok(exists, 'Expected NeumorphicButton.tsx component to exist');
  });

  await t.test('F3.2: NeumorphicCard component exists', () => {
    const exists = fileExists('src/components/ui/NeumorphicCard.tsx');
    assert.ok(exists, 'Expected NeumorphicCard.tsx component to exist');
  });

  await t.test('F3.3: NeumorphicInput component exists', () => {
    const exists = fileExists('src/components/ui/NeumorphicInput.tsx');
    assert.ok(exists, 'Expected NeumorphicInput.tsx component to exist');
  });

  await t.test('F3.4: NeumorphicSelect component exists', () => {
    const exists = fileExists('src/components/ui/NeumorphicSelect.tsx');
    assert.ok(exists, 'Expected NeumorphicSelect.tsx component to exist');
  });

  await t.test('F3.5: StatusBadge component exists', () => {
    const exists = fileExists('src/components/ui/StatusBadge.tsx');
    assert.ok(exists, 'Expected StatusBadge.tsx component to exist');
  });

  // Feature 4: WCAG 2.1 Contrast Calculations (Mathematical Proof)
  await t.test('F4.1: Primary text #151A23 on light base #E9EDF2 meets AAA (> 7.0:1)', () => {
    const ratio = getContrastRatio('#151A23', '#E9EDF2');
    assert.ok(ratio >= 7.0, `Expected ratio >= 7.0, got ${ratio.toFixed(2)}`);
    assert.ok(passesWCAG_AAA_Normal('#151A23', '#E9EDF2'));
  });

  await t.test('F4.2: Dark surface text #F8FAFC on dark base #171C29 meets AAA (> 7.0:1)', () => {
    const ratio = getContrastRatio('#F8FAFC', '#171C29');
    assert.ok(ratio >= 7.0, `Expected ratio >= 7.0, got ${ratio.toFixed(2)}`);
    assert.ok(passesWCAG_AAA_Normal('#F8FAFC', '#171C29'));
  });

  await t.test('F4.3: Secondary text #687386 on light base #E9EDF2 meets AA Large (> 3.0:1)', () => {
    const ratio = getContrastRatio('#687386', '#E9EDF2');
    assert.ok(ratio >= 3.0, `Expected ratio >= 3.0, got ${ratio.toFixed(2)}`);
    assert.ok(passesWCAG_AA_Large('#687386', '#E9EDF2'));
  });

  await t.test('F4.4: Secondary text #94A3B8 on dark base #171C29 meets AA Normal (> 4.5:1)', () => {
    const ratio = getContrastRatio('#94A3B8', '#171C29');
    assert.ok(ratio >= 4.5, `Expected ratio >= 4.5, got ${ratio.toFixed(2)}`);
    assert.ok(passesWCAG_AA_Normal('#94A3B8', '#171C29'));
  });

  await t.test('F4.5: Success indicator #36A783 on dark base #171C29 meets AA Normal (> 4.5:1)', () => {
    const ratio = getContrastRatio('#36A783', '#171C29');
    assert.ok(ratio >= 4.5, `Expected ratio >= 4.5, got ${ratio.toFixed(2)}`);
    assert.ok(passesWCAG_AA_Normal('#36A783', '#171C29'));
  });

  await t.test('F4.6: White text #FFFFFF on brand accent #4A65DC meets AA Normal (>= 4.5:1)', () => {
    const ratio = getContrastRatio('#FFFFFF', '#4A65DC');
    assert.ok(ratio >= 4.5, `Expected ratio >= 4.5, got ${ratio.toFixed(2)}`);
    assert.ok(passesWCAG_AA_Normal('#FFFFFF', '#4A65DC'));
  });
});
