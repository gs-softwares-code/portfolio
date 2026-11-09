/**
 * Adversarial Stress Testing Suite for Milestone 1 (Foundation & Neumorphic 2.0 Design Core)
 * Author: Challenger 1 (EMPIRICAL CHALLENGER)
 */
import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import * as jsxRuntime from 'react/jsx-runtime';
import ReactDOMServer from 'react-dom/server';
import ts from 'typescript';
import { getContrastRatio, getRelativeLuminance } from './helpers/contrast.mjs';
import { readFileSafe, fileExists, ROOT_DIR } from './helpers/parser.mjs';

// Dynamic TSX component loader
function loadTsxComponent(relPath) {
  const fullPath = path.resolve(ROOT_DIR, relPath);
  const code = fs.readFileSync(fullPath, 'utf8');
  const trans = ts.transpileModule(code, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
      target: ts.ScriptTarget.ES2022
    }
  });
  const m = { exports: {} };
  const fn = new Function('require', 'module', 'exports', trans.outputText);
  const customRequire = (id) => {
    if (id === 'react') return React;
    if (id === 'react/jsx-runtime') return jsxRuntime;
    if (id === 'lucide-react') {
      // Mock common lucide icons
      const MockIcon = (props) => React.createElement('svg', { ...props, 'data-testid': 'mock-icon' });
      return {
        ChevronDown: MockIcon,
        ArrowRight: MockIcon,
        Terminal: MockIcon,
        Cpu: MockIcon,
        Layers: MockIcon,
        ShieldCheck: MockIcon,
        Database: MockIcon,
        Sparkles: MockIcon,
      };
    }
    if (id === '@/lib/utils') {
      return {
        cn: (...args) => args.flat().filter(Boolean).join(' ')
      };
    }
    return {};
  };
  fn(customRequire, m, m.exports);
  return m.exports;
}

test('ADV.M1.1: WCAG 2.1 Contrast Mathematics & Palette Boundaries', async (t) => {
  const lightBase = '#E9EDF2';
  const darkSurface = '#171C29';

  await t.test('ADV.1.1: Primary text #151A23 on light base #E9EDF2 passes AAA (>= 7.0:1)', () => {
    const ratio = getContrastRatio('#151A23', lightBase);
    assert.ok(ratio >= 7.0, `Expected ratio >= 7.0, got ${ratio.toFixed(2)}`);
    assert.strictEqual(ratio > 14.0, true, `Calculated ratio is ${ratio.toFixed(2)}`);
  });

  await t.test('ADV.1.2: Dark primary text #F8FAFC on dark surface #171C29 passes AAA (>= 7.0:1)', () => {
    const ratio = getContrastRatio('#F8FAFC', darkSurface);
    assert.ok(ratio >= 7.0, `Expected ratio >= 7.0, got ${ratio.toFixed(2)}`);
    assert.strictEqual(ratio > 16.0, true, `Calculated ratio is ${ratio.toFixed(2)}`);
  });

  await t.test('ADV.1.3: Secondary text #687386 on light base #E9EDF2 contrast verification', () => {
    const ratio = getContrastRatio('#687386', lightBase);
    // #687386 on #E9EDF2 yields ~4.07:1
    assert.ok(ratio >= 3.0, `Must at least pass WCAG AA Large (> 3.0:1), got ${ratio.toFixed(2)}`);
    // Boundary check: verify whether it passes AA Normal (4.5:1)
    const passesNormal = ratio >= 4.5;
    // We document the exact empirical ratio: 4.07:1
    assert.strictEqual(passesNormal, false, 'Adversarial check: #687386 on #E9EDF2 is 4.07:1, which is below 4.5:1 AA Normal');
  });

  await t.test('ADV.1.4: White text #FFFFFF on Accent button #526FE5 contrast verification', () => {
    const ratio = getContrastRatio('#FFFFFF', '#526FE5');
    // #FFFFFF on #526FE5 yields ~4.41:1
    assert.ok(ratio >= 3.0, `Must at least pass WCAG AA Large (> 3.0:1), got ${ratio.toFixed(2)}`);
    // 4.41:1 is just under 4.5:1 threshold for normal text
    assert.strictEqual(ratio >= 4.0, true, `Calculated ratio is ${ratio.toFixed(2)}`);
  });

  await t.test('ADV.1.4b: White text #FFFFFF on Remediated Accent button #4A65DC contrast meets AA Normal (>= 4.5:1)', () => {
    const ratio = getContrastRatio('#FFFFFF', '#4A65DC');
    assert.ok(ratio >= 4.5, `Remediated accent ratio must meet AA Normal (>= 4.5:1), got ${ratio.toFixed(2)}`);
  });

  await t.test('ADV.1.5: Error message text rose-600 #E11D48 vs rose-700 #BE123C on light base', () => {
    const ratioRose600 = getContrastRatio('#E11D48', lightBase);
    const ratioRose700 = getContrastRatio('#BE123C', lightBase);
    // rose-600 is ~3.99:1
    assert.ok(ratioRose600 < 4.5, 'rose-600 (#E11D48) on light base fails 4.5:1');
    // rose-700 is ~5.35:1
    assert.ok(ratioRose700 >= 4.5, 'rose-700 (#BE123C) on light base passes 4.5:1');
  });

  await t.test('ADV.1.6: Dark secondary text #94A3B8 on dark surface #171C29 passes AA Normal (>= 4.5:1)', () => {
    const ratio = getContrastRatio('#94A3B8', darkSurface);
    assert.ok(ratio >= 4.5, `Expected ratio >= 4.5, got ${ratio.toFixed(2)}`);
    assert.strictEqual(ratio > 6.0, true, `Calculated ratio is ${ratio.toFixed(2)}`);
  });

  await t.test('ADV.1.7: Success indicator #36A783 contrast metrics on light and dark surfaces', () => {
    const lightRatio = getContrastRatio('#36A783', lightBase);
    const darkRatio = getContrastRatio('#36A783', darkSurface);
    // On dark surface #171C29: ratio is > 6.0:1 (passes AA)
    assert.ok(darkRatio >= 4.5, `Expected dark surface ratio >= 4.5, got ${darkRatio.toFixed(2)}`);
    // On light base #E9EDF2: ratio is ~2.55:1 (adequate for non-text graphic dot, but fails text)
    assert.ok(lightRatio < 3.0, `On light base, #36A783 is ${lightRatio.toFixed(2)}`);
  });
});

test('ADV.M1.2: Neumorphic 2.0 Shadow Coordinates & Perimeter Lighting Physics', async (t) => {
  const tailwindContent = readFileSafe('tailwind.config.ts') || '';
  const globalsCss = readFileSafe('src/app/globals.css') || '';

  await t.test('ADV.2.1: Dual box-shadow coordinates have opposite direction vectors', () => {
    // A true neumorphic dual shadow requires one positive vector (bottom-right) and one negative vector (top-left)
    assert.ok(tailwindContent.includes('8px 8px 20px rgba(163, 177, 198'), 'Expected positive bottom-right drop shadow');
    assert.ok(tailwindContent.includes('-8px -8px 20px rgba(255, 255, 255'), 'Expected negative top-left light reflection');
  });

  await t.test('ADV.2.2: Inset shadows contain inset directives with dual opposing vectors', () => {
    assert.ok(tailwindContent.includes('inset 4px 4px 8px'), 'Expected positive inset shadow');
    assert.ok(tailwindContent.includes('inset -4px -4px 8px'), 'Expected negative inset highlight');
  });

  await t.test('ADV.2.3: Dark Neumorphic shadows use subtle blue-gray highlight rather than harsh pure white', () => {
    assert.ok(tailwindContent.includes('rgba(35, 42, 60'), 'Expected dark surface blue-gray specular highlight');
    assert.ok(tailwindContent.includes('rgba(0, 0, 0, 0.55)'), 'Expected deep dark shadow for dark contrast surface');
  });

  await t.test('ADV.2.4: Neumorphic 2.0 rim utility classes provide 1px perimeter lighting', () => {
    assert.ok(globalsCss.includes('.neu-rim {'), 'Expected .neu-rim utility');
    assert.ok(globalsCss.includes('border: 1px solid rgba(255, 255, 255, 0.7);'), 'Expected light rim border');
    assert.ok(globalsCss.includes('.neu-rim-dark {'), 'Expected .neu-rim-dark utility');
    assert.ok(globalsCss.includes('border: 1px solid rgba(255, 255, 255, 0.08);'), 'Expected dark rim border');
  });
});

test('ADV.M1.3: Component Props Fuzzing & SSR Verification', async (t) => {
  const { NeumorphicButton } = loadTsxComponent('src/components/ui/NeumorphicButton.tsx');
  const { NeumorphicCard } = loadTsxComponent('src/components/ui/NeumorphicCard.tsx');
  const { NeumorphicInput } = loadTsxComponent('src/components/ui/NeumorphicInput.tsx');
  const { NeumorphicSelect } = loadTsxComponent('src/components/ui/NeumorphicSelect.tsx');
  const { StatusBadge } = loadTsxComponent('src/components/ui/StatusBadge.tsx');

  // NeumorphicButton Fuzzing
  await t.test('ADV.3.1: NeumorphicButton renders all 5 variants and 3 sizes', () => {
    const variants = ['default', 'accent', 'dark', 'ghost', 'pressed'];
    const sizes = ['sm', 'md', 'lg'];

    for (const v of variants) {
      for (const s of sizes) {
        const html = ReactDOMServer.renderToString(
          React.createElement(NeumorphicButton, { variant: v, size: s }, `Btn-${v}-${s}`)
        );
        assert.ok(html.includes(`<button`), `Expected button element for ${v}-${s}`);
        assert.ok(html.includes(`Btn-${v}-${s}`), `Expected label in button`);
      }
    }
  });

  await t.test('ADV.3.1b: NeumorphicButton defaults type to "button" to prevent inadvertent form submission', () => {
    const html = ReactDOMServer.renderToString(
      React.createElement(NeumorphicButton, {}, 'Default Type Test')
    );
    assert.ok(html.includes('type="button"'), 'Button must default to type="button"');
  });

  await t.test('ADV.3.2: NeumorphicButton disabled state prevents user interaction and applies disabled classes', () => {
    const html = ReactDOMServer.renderToString(
      React.createElement(NeumorphicButton, { disabled: true }, 'Disabled Action')
    );
    assert.ok(html.includes('disabled=""') || html.includes('disabled'), 'Expected disabled attribute on button');
    assert.ok(html.includes('disabled:opacity-50'), 'Expected opacity modifier on disabled button');
    assert.ok(html.includes('disabled:pointer-events-none'), 'Expected pointer-events-none on disabled button');
  });

  await t.test('ADV.3.3: NeumorphicButton handles extreme children (long strings, nested tags)', () => {
    const longString = 'A'.repeat(1000);
    const html = ReactDOMServer.renderToString(
      React.createElement(NeumorphicButton, {}, longString)
    );
    assert.ok(html.includes(longString), 'Expected long string to render safely');
  });

  // NeumorphicCard Fuzzing
  await t.test('ADV.3.4: NeumorphicCard renders all variants and paddings', () => {
    const variants = ['default', 'dark', 'inset', 'dark-inset'];
    const paddings = ['none', 'sm', 'md', 'lg'];

    for (const v of variants) {
      for (const p of paddings) {
        const html = ReactDOMServer.renderToString(
          React.createElement(NeumorphicCard, { variant: v, padding: p, interactive: true }, 'Card Content')
        );
        assert.ok(html.includes('<div'), `Expected div for card ${v}-${p}`);
        assert.ok(html.includes('Card Content'), 'Expected content rendered');
      }
    }
  });

  await t.test('ADV.3.4b: NeumorphicCard accessibility: interactive card defaults to role="button", tabIndex=0, and focus ring', () => {
    const htmlInteractive = ReactDOMServer.renderToString(
      React.createElement(NeumorphicCard, { interactive: true }, 'Actionable Card')
    );
    assert.ok(htmlInteractive.includes('role="button"'), 'Interactive card must have role="button"');
    assert.ok(htmlInteractive.includes('tabindex="0"'), 'Interactive card must have tabindex="0"');
    assert.ok(htmlInteractive.includes('focus-visible:ring-brand-accent'), 'Interactive card must have focus-visible ring');

    const htmlNonInteractive = ReactDOMServer.renderToString(
      React.createElement(NeumorphicCard, { interactive: false }, 'Static Card')
    );
    assert.ok(!htmlNonInteractive.includes('role="button"'), 'Static card must not default to role="button"');
    assert.ok(!htmlNonInteractive.includes('tabindex='), 'Static card must not have tabindex');
  });

  // NeumorphicInput Fuzzing
  await t.test('ADV.3.5: NeumorphicInput binds label to input id with generated useId() or custom id', () => {
    // Case 1: Custom explicit id
    const customIdHtml = ReactDOMServer.renderToString(
      React.createElement(NeumorphicInput, { id: 'test-field', label: 'Company Name' })
    );
    assert.ok(customIdHtml.includes('for="test-field"'), 'Expected htmlFor matching test-field');
    assert.ok(customIdHtml.includes('id="test-field"'), 'Expected id matching test-field');

    // Case 2: Generated id (fallback when id not provided)
    const autoIdHtml = ReactDOMServer.renderToString(
      React.createElement(NeumorphicInput, { label: 'Automated Field' })
    );
    assert.ok(autoIdHtml.includes('for="'), 'Expected htmlFor on label');
    assert.ok(autoIdHtml.includes('id="'), 'Expected id on input');
  });

  await t.test('ADV.3.6: NeumorphicInput error state renders alert role and sets aria-invalid', () => {
    const errorMsg = 'Invalid domain name specified.';
    const html = ReactDOMServer.renderToString(
      React.createElement(NeumorphicInput, { id: 'err-field', label: 'Domain', error: errorMsg })
    );
    assert.ok(html.includes('aria-invalid="true"'), 'Expected aria-invalid="true" on error');
    assert.ok(html.includes('aria-describedby="err-field-error"'), 'Expected aria-describedby referencing error');
    assert.ok(html.includes('role="alert"'), 'Expected role="alert" on error container');
    assert.ok(html.includes(errorMsg), 'Expected error message text rendered');
  });

  await t.test('ADV.3.7: NeumorphicInput hint state without error renders hint with matching aria-describedby', () => {
    const hintMsg = 'Enter your corporate organization handle.';
    const html = ReactDOMServer.renderToString(
      React.createElement(NeumorphicInput, { id: 'hint-field', label: 'Org', hint: hintMsg })
    );
    assert.ok(html.includes('aria-invalid="false"'), 'Expected aria-invalid="false"');
    assert.ok(html.includes('aria-describedby="hint-field-hint"'), 'Expected aria-describedby referencing hint');
    assert.ok(html.includes(hintMsg), 'Expected hint message rendered');
  });

  // NeumorphicSelect Fuzzing
  await t.test('ADV.3.8: NeumorphicSelect renders options array with disabled flags and placeholder', () => {
    const options = [
      { value: 'opt1', label: 'Option One' },
      { value: 'opt2', label: 'Option Two (Disabled)', disabled: true }
    ];
    const html = ReactDOMServer.renderToString(
      React.createElement(NeumorphicSelect, {
        id: 'sel-field',
        label: 'Select Service',
        placeholder: 'Choose one...',
        options
      })
    );
    assert.ok(html.includes('Choose one...'), 'Expected placeholder option');
    assert.ok(html.includes('value="opt1"'), 'Expected option 1 value');
    assert.ok(html.includes('value="opt2"'), 'Expected option 2 value');
    assert.ok(html.includes('disabled'), 'Expected disabled attribute on option 2');
    assert.ok(html.includes('aria-hidden="true"'), 'Expected chevron icon with aria-hidden="true"');
  });

  // StatusBadge Fuzzing
  await t.test('ADV.3.9: StatusBadge renders pulse ping animation and handles dark surface variant', () => {
    const lightHtml = ReactDOMServer.renderToString(
      React.createElement(StatusBadge, { variant: 'success', pulse: true }, 'Online')
    );
    assert.ok(lightHtml.includes('motion-safe:animate-ping'), 'Expected motion-safe animate-ping on pulse');
    assert.ok(lightHtml.includes('bg-bg-base'), 'Expected light base background');

    const darkHtml = ReactDOMServer.renderToString(
      React.createElement(StatusBadge, { variant: 'accent', dark: true, pulse: false }, 'Telemetry')
    );
    assert.ok(!darkHtml.includes('animate-ping'), 'Pulse false should omit ping element');
    assert.ok(darkHtml.includes('bg-bg-dark'), 'Expected dark background on dark badge');
  });
});

test('ADV.M1.4: Accessibility & Reduced Motion Compliance', async (t) => {
  const globalsCss = readFileSafe('src/app/globals.css') || '';
  const layoutContent = readFileSafe('src/app/layout.tsx') || '';

  await t.test('ADV.4.1: Reduced-motion media query suppresses animations to 0.01ms and resets scroll-behavior', () => {
    assert.ok(globalsCss.includes('@media (prefers-reduced-motion: reduce)'), 'Expected prefers-reduced-motion media query');
    assert.ok(globalsCss.includes('animation-duration: 0.01ms !important;'), 'Expected animation-duration override');
    assert.ok(globalsCss.includes('transition-duration: 0.01ms !important;'), 'Expected transition-duration override');
    assert.ok(globalsCss.includes('scroll-behavior: auto !important;'), 'Expected scroll-behavior reset to auto');
  });

  await t.test('ADV.4.2: Root layout contains skip-to-content landmark', () => {
    assert.ok(layoutContent.includes('href="#main-content"'), 'Expected skip link pointing to #main-content');
    assert.ok(layoutContent.includes('id="main-content"'), 'Expected <main> tag with id="main-content"');
  });

  await t.test('ADV.4.3: Root layout includes structured Organization JSON-LD', () => {
    assert.ok(layoutContent.includes('application/ld+json'), 'Expected application/ld+json script');
    assert.ok(layoutContent.includes('https://schema.org'), 'Expected schema.org context');
    assert.ok(layoutContent.includes('GS-Softwares'), 'Expected GS-Softwares brand name in schema');
  });
});
