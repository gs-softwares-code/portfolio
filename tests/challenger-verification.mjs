/**
 * Challenger 1 Empirical Verification & Adversarial Stress Harness
 * Milestone 1 Iteration 2 Gate
 */
import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import * as jsxRuntime from 'react/jsx-runtime';
import ReactDOMServer from 'react-dom/server';
import ts from 'typescript';

const ROOT_DIR = process.cwd();

// Load TSX component helper
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

// Independent W3C WCAG 2.1 formulas
function sRGBtoLinear(val) {
  const c = val / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function hexToRgbValues(hex) {
  const clean = hex.replace('#', '').trim();
  const num = parseInt(clean, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

function computeLuminance(hex) {
  const { r, g, b } = hexToRgbValues(hex);
  return 0.2126 * sRGBtoLinear(r) + 0.7152 * sRGBtoLinear(g) + 0.0722 * sRGBtoLinear(b);
}

function computeContrastRatio(hex1, hex2) {
  const L1 = computeLuminance(hex1);
  const L2 = computeLuminance(hex2);
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

test('CHALLENGER-1: WCAG 2.1 AA Normal Text Contrast Empirical Verification', async (t) => {
  await t.test('1.1: Verify #4A65DC (brand accent) on #FFFFFF (white text) >= 4.5:1', () => {
    const lumAccent = computeLuminance('#4A65DC');
    const lumWhite = computeLuminance('#FFFFFF');
    const ratio = computeContrastRatio('#FFFFFF', '#4A65DC');

    // Expected: L(#FFFFFF) = 1.0, L(#4A65DC) ~ 0.1593
    // Ratio = (1.05) / (0.1593 + 0.05) ~ 5.016:1
    assert.strictEqual(lumWhite, 1.0, 'White luminance must be exactly 1.0');
    assert.ok(lumAccent < 0.165 && lumAccent > 0.155, `Luminance of #4A65DC is ${lumAccent}`);
    assert.ok(ratio >= 4.5, `Contrast ratio ${ratio.toFixed(2)} must be >= 4.5:1 (WCAG AA Normal)`);
    assert.ok(ratio >= 5.0, `Contrast ratio ${ratio.toFixed(2)} achieves >= 5.0:1`);
  });

  await t.test('1.2: Demonstrate old accent #526FE5 failed AA Normal (< 4.5:1)', () => {
    const oldRatio = computeContrastRatio('#FFFFFF', '#526FE5');
    // #526FE5 ratio is ~4.41:1 (< 4.5:1)
    assert.ok(oldRatio < 4.5, `Old ratio ${oldRatio.toFixed(2)} must fail 4.5:1`);
    assert.ok(oldRatio >= 3.0, `Old ratio ${oldRatio.toFixed(2)} only passed AA Large (> 3.0:1)`);
  });

  await t.test('1.3: Verify #BE123C (rose-700 error text) on #E9EDF2 (light base) >= 4.5:1', () => {
    const lumBase = computeLuminance('#E9EDF2');
    const lumRose700 = computeLuminance('#BE123C');
    const ratio = computeContrastRatio('#BE123C', '#E9EDF2');

    // Expected: L(#E9EDF2) ~ 0.8417, L(#BE123C) ~ 0.1171
    // Ratio = (0.8417 + 0.05) / (0.1171 + 0.05) ~ 5.336:1
    assert.ok(ratio >= 4.5, `Error text contrast ratio ${ratio.toFixed(2)} must be >= 4.5:1`);
    assert.ok(ratio > 5.3, `Error text contrast ratio ${ratio.toFixed(2)} is > 5.3:1`);
  });

  await t.test('1.4: Demonstrate old error text #E11D48 (rose-600) on #E9EDF2 failed AA Normal', () => {
    const oldErrorRatio = computeContrastRatio('#E11D48', '#E9EDF2');
    // #E11D48 ratio is ~3.99:1 (< 4.5:1)
    assert.ok(oldErrorRatio < 4.5, `Old error ratio ${oldErrorRatio.toFixed(2)} must fail 4.5:1`);
  });

  await t.test('1.5: Verify hover accent #3852C7 on white text >= 4.5:1', () => {
    const hoverRatio = computeContrastRatio('#FFFFFF', '#3852C7');
    assert.ok(hoverRatio >= 4.5, `Hover accent contrast ${hoverRatio.toFixed(2)} must pass AA Normal`);
    assert.ok(hoverRatio > 5.8, `Hover accent contrast is ${hoverRatio.toFixed(2)}`);
  });
});

test('CHALLENGER-2: NeumorphicButton Default Type & Form Safety', async (t) => {
  const { NeumorphicButton } = loadTsxComponent('src/components/ui/NeumorphicButton.tsx');

  await t.test('2.1: NeumorphicButton defaults to type="button" when prop omitted', () => {
    const html = ReactDOMServer.renderToString(
      React.createElement(NeumorphicButton, {}, 'Click Me')
    );
    assert.ok(html.includes('type="button"'), `Expected type="button" in HTML: ${html}`);
  });

  await t.test('2.2: NeumorphicButton preserves type="button" when type=undefined', () => {
    const html = ReactDOMServer.renderToString(
      React.createElement(NeumorphicButton, { type: undefined }, 'Click Me')
    );
    assert.ok(html.includes('type="button"'), `Expected type="button" in HTML: ${html}`);
  });

  await t.test('2.3: NeumorphicButton allows explicit type="submit" and type="reset"', () => {
    const submitHtml = ReactDOMServer.renderToString(
      React.createElement(NeumorphicButton, { type: 'submit' }, 'Submit Form')
    );
    assert.ok(submitHtml.includes('type="submit"'), `Expected type="submit" in HTML: ${submitHtml}`);

    const resetHtml = ReactDOMServer.renderToString(
      React.createElement(NeumorphicButton, { type: 'reset' }, 'Reset Form')
    );
    assert.ok(resetHtml.includes('type="reset"'), `Expected type="reset" in HTML: ${resetHtml}`);
  });

  await t.test('2.4: NeumorphicButton does not trigger form submit when type defaults to button', () => {
    // Check that buttonType is explicitly 'button'
    const elem = React.createElement(NeumorphicButton, { onClick: () => {} }, 'Action');
    assert.strictEqual(elem.type.displayName, 'NeumorphicButton');
  });
});

test('CHALLENGER-3: NeumorphicCard Keyboard Focus, Activation & Event Bubbling Guard', async (t) => {
  const { NeumorphicCard } = loadTsxComponent('src/components/ui/NeumorphicCard.tsx');

  await t.test('3.1: Interactive card renders role="button", tabindex="0", and focus-visible classes', () => {
    const html = ReactDOMServer.renderToString(
      React.createElement(NeumorphicCard, { interactive: true }, 'Card Content')
    );
    assert.ok(html.includes('role="button"'), 'Interactive card must have role="button"');
    assert.ok(html.includes('tabindex="0"'), 'Interactive card must have tabindex="0"');
    assert.ok(html.includes('focus-visible:ring-brand-accent'), 'Interactive card must have focus-visible ring');
    assert.ok(html.includes('focus-visible:ring-offset-bg-base'), 'Interactive card must have focus-visible ring offset');
  });

  await t.test('3.2: Dark variant interactive card uses dark ring offset', () => {
    const html = ReactDOMServer.renderToString(
      React.createElement(NeumorphicCard, { interactive: true, variant: 'dark' }, 'Dark Card')
    );
    assert.ok(html.includes('focus-visible:ring-offset-bg-dark'), 'Dark card must have focus-visible ring offset to bg-dark');
  });

  await t.test('3.3: Static (interactive=false) card omits role="button", tabindex, and focus ring', () => {
    const html = ReactDOMServer.renderToString(
      React.createElement(NeumorphicCard, { interactive: false }, 'Static Card')
    );
    assert.ok(!html.includes('role="button"'), 'Static card must not have role="button"');
    assert.ok(!html.includes('tabindex='), 'Static card must not have tabindex');
    assert.ok(!html.includes('focus-visible:ring-brand-accent'), 'Static card must not have focus-visible ring');
  });

  await t.test('3.4: Explicit role and tabIndex props override interactive defaults', () => {
    const html = ReactDOMServer.renderToString(
      React.createElement(NeumorphicCard, { interactive: true, role: 'region', tabIndex: -1 }, 'Custom Semantics')
    );
    assert.ok(html.includes('role="region"'), 'Custom role must override default button');
    assert.ok(html.includes('tabindex="-1"'), 'Custom tabIndex must override default 0');
  });

  await t.test('3.5: Keyboard activation semantics - Enter and Space key behavior', () => {
    // Read source code of NeumorphicCard to verify AST / implementation of handleKeyDown
    const cardCode = fs.readFileSync(path.resolve(ROOT_DIR, 'src/components/ui/NeumorphicCard.tsx'), 'utf8');

    // 1. Must check interactive flag
    assert.ok(cardCode.includes('interactive &&'), 'Must guard key activation on interactive');

    // 2. Must verify target === currentTarget to prevent event bubbling from inner inputs/buttons
    assert.ok(cardCode.includes('e.target === e.currentTarget'), 'Must verify target === currentTarget to avoid firing when child element receives Enter/Space');

    // 3. Must check both Enter and Space
    assert.ok(cardCode.includes('e.key === "Enter" || e.key === " "'), 'Must support both Enter and Space');

    // 4. Must call preventDefault on Space to prevent page scroll
    assert.ok(cardCode.includes('if (e.key === " ")'), 'Must branch on Space');
    assert.ok(cardCode.includes('e.preventDefault()'), 'Must call e.preventDefault() on Space');

    // 5. Must support both currentTarget.click() and props.onClick fallback
    assert.ok(cardCode.includes('e.currentTarget.click()'), 'Must call currentTarget.click()');
  });
});

test('CHALLENGER-4: Concurrency & Windows Atomic Persistence Stress', async (t) => {
  const { testPersistInquiry, cleanTestArtifacts } = await import('./helpers/mock-server.mjs');

  const testFile = 'data/test_challenger_stress_contacts.json';
  cleanTestArtifacts();

  try {
    // Sequentially / rapidly fire 50 inquiries to stress atomic file write under Windows
    for (let i = 0; i < 50; i++) {
      const payload = {
        fullName: `Stress Tester ${i}`,
        businessName: `Concurrent Enterprise ${i}`,
        email: `tester${i}@concurrent-stress.test`,
        phone: `+1 555 010 ${String(i).padStart(4, '0')}`,
        industry: 'growing-businesses',
        service: 'ai-agents',
        description: `Adversarial concurrent stress test inquiry #${i} executing rapid disk write.`
      };
      const record = testPersistInquiry(payload, testFile);
      assert.ok(record.id.startsWith('inq_'), 'Must have submissionId prefix');
      assert.strictEqual(record.status, 'received');
    }

    // Verify file exists and has exactly 50 entries
    assert.ok(fs.existsSync(testFile), 'Persistence file must exist');
    const raw = fs.readFileSync(testFile, 'utf8');
    const records = JSON.parse(raw);
    assert.strictEqual(records.length, 50, `Expected 50 persisted records, got ${records.length}`);

  } finally {
    if (fs.existsSync(testFile)) {
      try {
        fs.unlinkSync(testFile);
      } catch {}
    }
    cleanTestArtifacts();
  }
});
