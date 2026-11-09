/**
/**
 * Challenger 2 Adversarial Re-verification Harness for Milestone 1 Iteration 2 Gate
 * Tests:
 * 1. White text on brand.accent (#4A65DC) contrast ratio >= 4.5:1
 * 2. Error text (#BE123C) contrast ratio >= 4.5:1 on #E9EDF2
 * 3. NeumorphicCard keyboard accessibility: tab navigation, Enter/Space activation, child input isolation
 * 4. Windows fs.renameSync EPERM resiliency in test harness
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
import { readFileSafe, ROOT_DIR } from './helpers/parser.mjs';
import {
  safeAtomicWriteFileSync,
  safeUnlinkSync,
  cleanTestArtifacts,
  testPersistInquiry
} from './helpers/mock-server.mjs';

// Transpiling loader for React TSX components
function loadTsx(relPath) {
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
      return { ChevronDown: MockIcon };
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

// Helper to instantiate forwardRef component
function getComponentInstance(Component, props, children) {
  const element = React.createElement(Component, props, children);
  const renderFn = typeof element.type === 'function' ? element.type : element.type.render;
  return renderFn(element.props, null);
}

// -----------------------------------------------------------------------------
// Test 1: Brand Accent Contrast Ratio (#4A65DC)
// -----------------------------------------------------------------------------
test('CHALLENGER-2.1: White text on brand.accent (#4A65DC) contrast >= 4.5:1', async (t) => {
  const tailwindContent = readFileSafe('tailwind.config.ts') || '';
  
  await t.test('1.1: tailwind.config.ts defines brand.accent as #4A65DC', () => {
    assert.match(
      tailwindContent,
      /accent:\s*["']#4A65DC["']/i,
      'tailwind.config.ts must declare accent as #4A65DC'
    );
  });

  await t.test('1.2: Empirical mathematical contrast of #FFFFFF on #4A65DC >= 4.5:1', () => {
    const lWhite = getRelativeLuminance('#FFFFFF');
    const lAccent = getRelativeLuminance('#4A65DC');
    const ratio = getContrastRatio('#FFFFFF', '#4A65DC');

    assert.strictEqual(lWhite, 1.0, 'White relative luminance must be 1.0');
    // Luminance for #4A65DC is ~0.1593
    assert.ok(lAccent > 0.15 && lAccent < 0.17, `Accent luminance expected ~0.1593, got ${lAccent}`);
    // Contrast ratio: (1.0 + 0.05) / (0.1593 + 0.05) = 1.05 / 0.2093 = 5.016:1
    assert.ok(
      ratio >= 4.5,
      `WCAG AA Normal requires >= 4.5:1. Got ${ratio.toFixed(2)}:1`
    );
    assert.ok(
      ratio >= 5.0,
      `Should exceed 5.0:1 for safe margin. Got ${ratio.toFixed(2)}:1`
    );
  });

  await t.test('1.3: Hover state #3852C7 also passes WCAG AA Normal (>= 4.5:1)', () => {
    const hoverRatio = getContrastRatio('#FFFFFF', '#3852C7');
    assert.ok(
      hoverRatio >= 4.5,
      `Hover state must meet >= 4.5:1. Got ${hoverRatio.toFixed(2)}:1`
    );
  });

  await t.test('1.4: NeumorphicButton accent variant applies bg-brand-accent and text-white', () => {
    const { NeumorphicButton } = loadTsx('src/components/ui/NeumorphicButton.tsx');
    const html = ReactDOMServer.renderToString(
      React.createElement(NeumorphicButton, { variant: 'accent' }, 'Accent Action')
    );
    assert.ok(html.includes('bg-brand-accent'), 'Must include bg-brand-accent');
    assert.ok(html.includes('text-white'), 'Must include text-white');
  });
});

// -----------------------------------------------------------------------------
// Test 2: Error Text Contrast Ratio (#BE123C)
// -----------------------------------------------------------------------------
test('CHALLENGER-2.2: Error text (#BE123C) contrast >= 4.5:1 on #E9EDF2', async (t) => {
  const lightBase = '#E9EDF2';
  const errorHex = '#BE123C'; // Tailwind rose-700
  const legacyRose600 = '#E11D48';

  await t.test('2.1: Empirical mathematical contrast of #BE123C on #E9EDF2 >= 4.5:1', () => {
    const ratio = getContrastRatio(errorHex, lightBase);
    const legacyRatio = getContrastRatio(legacyRose600, lightBase);

    // Verify legacy failed
    assert.ok(
      legacyRatio < 4.5,
      `Legacy rose-600 must fail 4.5:1 (was ${legacyRatio.toFixed(2)}:1)`
    );

    // Verify remediated passes
    assert.ok(
      ratio >= 4.5,
      `Remediated rose-700 (#BE123C) must meet >= 4.5:1. Got ${ratio.toFixed(2)}:1`
    );
    // Calculated ratio is ~5.35:1
    assert.ok(
      ratio >= 5.2,
      `Expected safe margin >= 5.2:1. Got ${ratio.toFixed(2)}:1`
    );
  });

  await t.test('2.2: NeumorphicInput uses text-rose-700 for error messages', () => {
    const { NeumorphicInput } = loadTsx('src/components/ui/NeumorphicInput.tsx');
    const html = ReactDOMServer.renderToString(
      React.createElement(NeumorphicInput, { label: 'Email', error: 'Invalid email address' })
    );
    assert.ok(html.includes('text-rose-700'), 'Must use text-rose-700');
    assert.ok(!html.includes('text-rose-600'), 'Must not use low-contrast text-rose-600');
    assert.ok(html.includes('role="alert"'), 'Must have role="alert"');
  });

  await t.test('2.3: NeumorphicSelect uses text-rose-700 for error messages', () => {
    const { NeumorphicSelect } = loadTsx('src/components/ui/NeumorphicSelect.tsx');
    const html = ReactDOMServer.renderToString(
      React.createElement(NeumorphicSelect, {
        label: 'Industry',
        error: 'Please select an industry',
        options: [{ value: '1', label: 'Tech' }]
      })
    );
    assert.ok(html.includes('text-rose-700'), 'Must use text-rose-700');
    assert.ok(!html.includes('text-rose-600'), 'Must not use low-contrast text-rose-600');
    assert.ok(html.includes('role="alert"'), 'Must have role="alert"');
  });
});

// -----------------------------------------------------------------------------
// Test 3: NeumorphicCard Keyboard Accessibility & Child Input Isolation
// -----------------------------------------------------------------------------
test('CHALLENGER-2.3: NeumorphicCard keyboard accessibility and child input isolation', async (t) => {
  const { NeumorphicCard } = loadTsx('src/components/ui/NeumorphicCard.tsx');

  await t.test('3.1: Non-interactive card does not receive tabIndex or role="button"', () => {
    const html = ReactDOMServer.renderToString(
      React.createElement(NeumorphicCard, { interactive: false }, 'Static Content')
    );
    assert.ok(!html.includes('tabindex'), 'Static card must not have tabindex');
    assert.ok(!html.includes('role="button"'), 'Static card must not have role="button"');
  });

  await t.test('3.2: Interactive card defaults to tabIndex=0, role="button", and visible focus ring', () => {
    const html = ReactDOMServer.renderToString(
      React.createElement(NeumorphicCard, { interactive: true }, 'Interactive Content')
    );
    assert.ok(html.includes('tabindex="0"'), 'Interactive card must have tabindex="0"');
    assert.ok(html.includes('role="button"'), 'Interactive card must have role="button"');
    assert.ok(html.includes('focus-visible:ring-2'), 'Interactive card must have visible focus ring');
    assert.ok(html.includes('focus-visible:ring-brand-accent'), 'Focus ring must use brand-accent');
  });

  await t.test('3.3: Interactive card allows explicit tabIndex and role override', () => {
    const html = ReactDOMServer.renderToString(
      React.createElement(
        NeumorphicCard,
        { interactive: true, tabIndex: -1, role: 'region' },
        'Custom Semantics'
      )
    );
    assert.ok(html.includes('tabindex="-1"'), 'Explicit tabIndex must be respected');
    assert.ok(html.includes('role="region"'), 'Explicit role must be respected');
  });

  await t.test('3.4: Functional simulation: Enter key on card activates click', () => {
    let clickCount = 0;
    const cardProps = {
      interactive: true,
      onClick: () => { clickCount++; }
    };

    const instance = getComponentInstance(NeumorphicCard, cardProps, 'Action Card');

    const syntheticTarget = { id: 'card-div' };
    let defaultPrevented = false;

    // Simulate Enter on card itself: e.target === e.currentTarget
    const enterEvent = {
      key: 'Enter',
      target: syntheticTarget,
      currentTarget: syntheticTarget,
      defaultPrevented: false,
      preventDefault: () => { defaultPrevented = true; }
    };

    instance.props.onKeyDown(enterEvent);
    assert.strictEqual(clickCount, 1, 'Enter key on interactive card must trigger onClick');
  });

  await t.test('3.5: Functional simulation: Space key on card activates click and calls preventDefault', () => {
    let clickCount = 0;
    let spaceDefaultPrevented = false;
    const cardProps = {
      interactive: true,
      onClick: () => { clickCount++; }
    };

    const instance = getComponentInstance(NeumorphicCard, cardProps, 'Action Card');

    const syntheticTarget = { id: 'card-div' };
    const spaceEvent = {
      key: ' ',
      target: syntheticTarget,
      currentTarget: syntheticTarget,
      defaultPrevented: false,
      preventDefault: () => { spaceDefaultPrevented = true; }
    };

    instance.props.onKeyDown(spaceEvent);
    assert.strictEqual(clickCount, 1, 'Space key on interactive card must trigger onClick');
    assert.strictEqual(
      spaceDefaultPrevented,
      true,
      'Space key on interactive card must call preventDefault() to suppress page scroll'
    );
  });

  await t.test('3.6: Non-activation keys (Tab, Escape, ArrowDown) do not trigger onClick', () => {
    let clickCount = 0;
    const cardProps = {
      interactive: true,
      onClick: () => { clickCount++; }
    };

    const instance = getComponentInstance(NeumorphicCard, cardProps, 'Action Card');

    const syntheticTarget = { id: 'card-div' };
    const nonActionKeys = ['Tab', 'Escape', 'ArrowDown', 'ArrowUp', 'Shift', 'a', '1'];

    for (const key of nonActionKeys) {
      let prevented = false;
      instance.props.onKeyDown({
        key,
        target: syntheticTarget,
        currentTarget: syntheticTarget,
        defaultPrevented: false,
        preventDefault: () => { prevented = true; }
      });
      assert.strictEqual(clickCount, 0, `Key "${key}" must NOT trigger card onClick`);
      assert.strictEqual(prevented, false, `Key "${key}" must NOT be preventDefaulted`);
    }
  });

  await t.test('3.7: ADVERSARIAL ISOLATION: Child input typing Space or Enter does NOT activate card and does NOT preventDefault', () => {
    let cardClickCount = 0;
    let childSpacePrevented = false;

    const cardProps = {
      interactive: true,
      onClick: () => { cardClickCount++; }
    };

    const instance = getComponentInstance(NeumorphicCard, cardProps, 'Card With Child Input');

    const cardDivTarget = { id: 'parent-card' };
    const childInputTarget = { id: 'nested-search-input', tagName: 'INPUT' };

    // 1. User hits Space inside the child input (typing a search term with spaces)
    const childSpaceEvent = {
      key: ' ',
      target: childInputTarget,       // Key originated on input
      currentTarget: cardDivTarget,   // Event bubbled up to card
      defaultPrevented: false,
      preventDefault: () => { childSpacePrevented = true; }
    };

    instance.props.onKeyDown(childSpaceEvent);

    assert.strictEqual(
      cardClickCount,
      0,
      'Space key originating inside child input MUST NOT trigger parent card onClick'
    );
    assert.strictEqual(
      childSpacePrevented,
      false,
      'Space key originating inside child input MUST NOT call preventDefault (would prevent user typing space)'
    );

    // 2. User hits Enter inside child input (submitting input or inserting newline)
    let childEnterPrevented = false;
    const childEnterEvent = {
      key: 'Enter',
      target: childInputTarget,
      currentTarget: cardDivTarget,
      defaultPrevented: false,
      preventDefault: () => { childEnterPrevented = true; }
    };

    instance.props.onKeyDown(childEnterEvent);

    assert.strictEqual(
      cardClickCount,
      0,
      'Enter key originating inside child input MUST NOT trigger parent card onClick'
    );
    assert.strictEqual(
      childEnterPrevented,
      false,
      'Enter key inside child input must preserve default behavior'
    );
  });

  await t.test('3.8: ADVERSARIAL ISOLATION: Child button Space/Enter does NOT trigger parent card', () => {
    let cardClickCount = 0;
    const cardProps = {
      interactive: true,
      onClick: () => { cardClickCount++; }
    };

    const instance = getComponentInstance(NeumorphicCard, cardProps, 'Card With Button');

    const cardDivTarget = { id: 'parent-card' };
    const childBtnTarget = { id: 'nested-btn', tagName: 'BUTTON' };

    instance.props.onKeyDown({
      key: 'Enter',
      target: childBtnTarget,
      currentTarget: cardDivTarget,
      defaultPrevented: false,
      preventDefault: () => {}
    });

    instance.props.onKeyDown({
      key: ' ',
      target: childBtnTarget,
      currentTarget: cardDivTarget,
      defaultPrevented: false,
      preventDefault: () => {}
    });

    assert.strictEqual(
      cardClickCount,
      0,
      'Keys originating on child button must not trigger parent card onClick'
    );
  });

  await t.test('3.9: defaultPrevented in custom onKeyDown suppresses card activation', () => {
    let cardClickCount = 0;
    let customHandlerCalled = false;

    const cardProps = {
      interactive: true,
      onClick: () => { cardClickCount++; },
      onKeyDown: (e) => {
        customHandlerCalled = true;
        e.defaultPrevented = true; // Custom handler intercepted and handled it
      }
    };

    const instance = getComponentInstance(NeumorphicCard, cardProps, 'Card');

    const target = { id: 'card-div' };
    instance.props.onKeyDown({
      key: 'Enter',
      target,
      currentTarget: target,
      defaultPrevented: false,
      preventDefault: () => {}
    });

    assert.strictEqual(customHandlerCalled, true, 'Custom onKeyDown must be invoked');
    assert.strictEqual(cardClickCount, 0, 'Card activation must be cancelled when defaultPrevented is set');
  });
});

// -----------------------------------------------------------------------------
// Test 4: Windows fs.renameSync EPERM Resiliency & Zero Test Failures
// -----------------------------------------------------------------------------
test('CHALLENGER-2.4: Windows fs.renameSync EPERM resiliency in test harness', async (t) => {
  const targetFile = 'data/challenger_stress_test.json';
  const fullTarget = path.resolve(ROOT_DIR, targetFile);

  // Clean before test
  safeUnlinkSync(fullTarget);

  await t.test('4.1: Rapid 50-cycle sequential atomic persistence without EPERM', () => {
    try {
      for (let i = 0; i < 50; i++) {
        const payload = {
          iteration: i,
          timestamp: new Date().toISOString(),
          data: `Payload record test content ${i} - ${'x'.repeat(100)}`
        };
        safeAtomicWriteFileSync(fullTarget, JSON.stringify(payload, null, 2));
      }
      assert.ok(fs.existsSync(fullTarget), 'Target file must exist after 50 writes');
      const readBack = JSON.parse(fs.readFileSync(fullTarget, 'utf8'));
      assert.strictEqual(readBack.iteration, 49, 'Final write iteration must be preserved');
    } finally {
      safeUnlinkSync(fullTarget);
    }
  });

  await t.test('4.2: Rapid 20-burst inquiry persistence through testPersistInquiry without EPERM', () => {
    const burstFile = 'data/challenger_burst_contacts.json';
    const fullBurst = path.resolve(ROOT_DIR, burstFile);
    safeUnlinkSync(fullBurst);

    try {
      for (let i = 0; i < 20; i++) {
        const inquiry = {
          fullName: `Stress Client ${i}`,
          businessName: `Company ${i}`,
          email: `client${i}@example.com`,
          industry: 'hospitality',
          service: 'ai-agents',
          description: `Inquiry description for burst testing number ${i}`
        };
        const record = testPersistInquiry(inquiry, burstFile);
        assert.ok(record.id.startsWith('inq_'), 'Must return valid inq_ record');
      }

      const allRecords = JSON.parse(fs.readFileSync(fullBurst, 'utf8'));
      assert.strictEqual(allRecords.length, 20, 'All 20 burst records must be atomically persisted');
    } finally {
      safeUnlinkSync(fullBurst);
    }
  });

  await t.test('4.3: cleanTestArtifacts sweeps all test_ and .tmp_ files leaving data/ directory clean', () => {
    // Generate decoy files
    const decoy1 = path.resolve(ROOT_DIR, 'data/test_decoy_1.json');
    const decoy2 = path.resolve(ROOT_DIR, 'data/test_decoy_2.json.tmp_test123');
    fs.writeFileSync(decoy1, 'decoy', 'utf8');
    fs.writeFileSync(decoy2, 'decoy', 'utf8');

    assert.ok(fs.existsSync(decoy1), 'Decoy 1 must exist');
    assert.ok(fs.existsSync(decoy2), 'Decoy 2 must exist');

    cleanTestArtifacts('data');

    assert.ok(!fs.existsSync(decoy1), 'Decoy 1 must be wiped by cleanTestArtifacts');
    assert.ok(!fs.existsSync(decoy2), 'Decoy 2 must be wiped by cleanTestArtifacts');
  });

  await t.test('4.4: Verify data/ directory has zero orphaned test files', () => {
    const dataDir = path.resolve(ROOT_DIR, 'data');
    if (fs.existsSync(dataDir)) {
      const remaining = fs.readdirSync(dataDir).filter(f => f.startsWith('test_') || f.includes('.tmp_'));
      assert.deepStrictEqual(remaining, [], `Orphaned test files found in data: ${remaining.join(', ')}`);
    }
  });
});
