# Milestone 2 Iteration 2 Remediation Handoff Report — Explorer 3

**Author**: Explorer 3 (`teamwork_explorer_m2_it2_3`)  
**Role**: Teamwork Explorer (Read-Only Investigation & Synthesis)  
**Target Milestone**: Milestone 2 Iteration 2 Remediation  
**Target Areas**: Defect 3 (Scroll-Spy Bottom Boundary) & Defect 4 (Duplicate `<main>` Landmark)  
**Date**: 2026-11-09  
**Type**: Hard Handoff (Investigation Complete)  

---

## 1. Observation

Direct empirical observations from source code inspection, test suites, and browser evaluation:

1. **Defect 3 — Scroll-Spy Bottom Boundary Blind Spot in `src/components/layout/Navbar.tsx` (lines 31–45)**:
   - Verbatim code in `src/components/layout/Navbar.tsx`:
     ```typescript
     const sections = ["hero", "services", "solutions", "work", "philosophy", "contact"];
     const scrollPosition = window.scrollY + 140;

     for (let i = sections.length - 1; i >= 0; i--) {
       const sectionId = sections[i];
       const element = document.getElementById(sectionId);
       if (element) {
         const top = element.offsetTop;
         if (scrollPosition >= top) {
           setActiveSection(sectionId);
           break;
         }
       }
     }
     ```
   - Simulation in `tests/adversarial-stress-m2.test.mjs` (lines 56–81, test 1.3):
     ```javascript
     const sections = [
       { id: 'hero', offsetTop: 0 },
       { id: 'services', offsetTop: 900 },
       { id: 'solutions', offsetTop: 2100 },
       { id: 'work', offsetTop: 3200 },
       { id: 'philosophy', offsetTop: 4800 },
       { id: 'contact', offsetTop: 5600 }
     ];
     const docHeight = 6200;
     const viewportHeight = 800;
     const maxScrollY = docHeight - viewportHeight; // 5400
     const scrollPosition = maxScrollY + 140; // 5540
     // scrollPosition (5540) < contact.offsetTop (5600) -> activeSection resolves to 'philosophy'
     ```
   - When the user scrolls to the absolute bottom of the document (`scrollY = maxScrollY`), `scrollPosition` reaches only `5540px`, which is less than `#contact`'s `offsetTop` (`5600px`). The scroll-spy loop misses `#contact` and highlights `"philosophy"`.

2. **Defect 4 — Duplicate Nested `<main id="main-content">` Landmarks**:
   - `src/app/layout.tsx` (line 101):
     ```tsx
     <main id="main-content" className="relative flex min-h-screen flex-col">
       {children}
     </main>
     ```
   - `src/app/page.tsx` (line 43 and line 296):
     ```tsx
     <main id="main-content" className="space-y-16 pb-20">
       ...
     </main>
     ```
   - Measured finding in `tests/adversarial-stress-m2.test.mjs` (test 3.3):
     `[FINDING] layout.tsx has <main>: true, page.tsx has <main>: true`
   - In the rendered DOM, an inner `<main id="main-content">` is directly nested inside an outer `<main id="main-content">`. Both elements declare the identical DOM attribute `id="main-content"`.

3. **Existing Test Suite Baseline & Invariants**:
   - `node tests/runner.mjs`:
     ```
     Total Assertions / Tests : 210
     Active Tests Passed      : 143
     Pending Milestone Skipped: 67
     Failed Assertions        : 0
     Total Duration           : 3.52s
     ```
   - `tests/adversarial-stress-m1.test.mjs` (lines 313–316):
     ```javascript
     assert.ok(layoutContent.includes('href="#main-content"'), 'Expected skip link pointing to #main-content');
     assert.ok(layoutContent.includes('id="main-content"'), 'Expected <main> tag with id="main-content"');
     ```
     In order to preserve passing status for `ADV.4.2`, `<main id="main-content">` **must remain in `layout.tsx`**.
   - `npm run typecheck`: Exit code 0 (clean TypeScript check).

---

## 2. Logic Chain

1. **Step 1 — Mathematical Geometry of Viewport Scrolling (Defect 3)**:
   - Based on Observation 1, the maximum scroll offset of any document is $Y_{max} = H_{doc} - H_{vp}$.
   - The scroll-spy offset formula evaluates $\text{scrollPosition} = Y + 140$. At maximum scroll, $\text{scrollPosition}_{max} = H_{doc} - H_{vp} + 140$.
   - For `#contact` to activate via this formula alone, the residual distance between the start of `#contact` and document bottom ($H_{doc} - T_{contact}$) must exceed $H_{vp} - 140$.
   - On standard screens (1080p, 1440p), $H_{vp} - 140$ is between $800\text{px}$ and $1160\text{px}$. If `#contact` plus the Footer is $< 800\text{px}$ tall, $\text{scrollPosition}_{max}$ is strictly less than $T_{contact}$.
   - Therefore, without an explicit document bottom boundary check, `#contact` cannot activate when scrolled to the end of the page.

2. **Step 2 — Boundary Conditions & False-Trigger Guard (Defect 3)**:
   - A naive check `window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60` evaluates to `true` when $H_{vp} \ge H_{doc}$ and `scrollY = 0` (e.g. on huge viewports or short pages before content expands).
   - If triggered at `scrollY = 0`, the navigation indicator would falsely switch to `"contact"` on initial page load, violating test 1.1 (`Initial scroll state at scrollY = 0 resolves to hero`).
   - Guarding the condition with `window.scrollY > 50` guarantees that:
     1. At `scrollY = 0` (and during negative rubber-band overscroll $Y < 0$), `isAtBottom` is strictly `false`, preserving `'hero'` activation.
     2. When the user scrolls to the bottom of the page ($Y \approx Y_{max} \gg 50$), `isAtBottom` evaluates to `true`, instantly activating `'contact'`.
     3. The tolerance buffer `- 60` accommodates fractional sub-pixel rendering variances on high-DPI displays (125%, 150% scaling).

3. **Step 3 — HTML5 & WCAG 2.1 SC 4.1.1 Landmark Analysis (Defect 4)**:
   - Observation 2 demonstrates that `<main id="main-content">` is declared in both `src/app/layout.tsx` (line 101) and `src/app/page.tsx` (line 43).
   - WHATWG HTML5 §4.4.14 strictly forbids nesting `<main>` within `<main>` and forbids multiple unhidden `<main>` elements in the same document.
   - WCAG 2.1 SC 4.1.1 (Parsing) forbids duplicate HTML ID attributes (`id="main-content"`).
   - From Observation 3, `tests/adversarial-stress-m1.test.mjs` explicitly asserts that `layout.tsx` contains `id="main-content"` and the skip-to-content anchor.
   - Therefore, the `<main id="main-content">` declaration must be retained in `layout.tsx`, and the inner container in `page.tsx` must be converted from `<main id="main-content" className="space-y-16 pb-20">` to a standard `<div className="space-y-16 pb-20">`.
   - This eliminates the duplicate ID, eliminates the nested landmark, satisfies HTML5 and WCAG 2.1 SC 4.1.1, and keeps all styling intact without breaking any existing tests.

---

## 3. Caveats

- **Scope Boundary**: Explorer 3 is read-only. Source code edits must be executed by the remediation implementer.
- **Next.js Production Build Invariant**: During `next build`, Next.js 15 reports `[Error: Invariant: no direct app page entry found for /_not-found]` because custom `not-found.tsx` has not yet been introduced. This is an expected artifact of milestone progression (planned for Milestone 5) and does not affect the correctness of the Navbar or Landmark remediations.
- **Section ID Presence across Milestones**: Sections `#services`, `#solutions`, `#work`, `#philosophy`, and `#contact` are implemented across Milestones 3 through 5. In Milestone 2, only `#hero` exists in DOM. Setting `activeSection = "contact"` at document bottom does not break any navigation state because `navItems` does not contain `"contact"`, cleanly deactivating all desktop nav pills when the user is below the fold.

---

## 4. Conclusion

The exact technical remediations for Defect 3 and Defect 4 are finalized, fully specified, and ready for immediate application:

### Remediation 1: Navbar Scroll-Spy Bottom Boundary (`src/components/layout/Navbar.tsx`)
In `src/components/layout/Navbar.tsx`, add the bottom boundary check at the start of `handleScroll`:
```tsx
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Document bottom boundary detection: reliably activate contact at page bottom
      // Guarded by window.scrollY > 50 to prevent false triggers on short pages or at scrollY = 0
      const isAtBottom =
        window.scrollY > 50 &&
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;

      if (isAtBottom) {
        setActiveSection("contact");
        return;
      }

      // Section spy based on viewport scroll position
      const sections = ["hero", "services", "solutions", "work", "philosophy", "contact"];
      const scrollPosition = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
```

### Remediation 2: Remove Duplicate `<main>` Landmark (`src/app/page.tsx`)
In `src/app/page.tsx`:
- Line 43: Change `<main id="main-content" className="space-y-16 pb-20">` to `<div className="space-y-16 pb-20">`.
- Line 296: Change `</main>` to `</div>`.

---

## 5. Verification Method

To independently verify the implementation:

1. **Verify Single Landmark & Clean ID Hygiene**:
   Run the following verification script in PowerShell:
   ```powershell
   node -e "
     const fs = require('fs');
     const layout = fs.readFileSync('src/app/layout.tsx', 'utf8');
     const page = fs.readFileSync('src/app/page.tsx', 'utf8');
     const assert = require('assert');
     assert.strictEqual(layout.includes('<main id=\"main-content\"'), true, 'layout.tsx must contain <main id=\"main-content\">');
     assert.strictEqual(page.includes('<main'), false, 'page.tsx must NOT contain <main>');
     assert.strictEqual(page.includes('id=\"main-content\"'), false, 'page.tsx must NOT contain id=\"main-content\"');
     console.log('PASS: Single unique <main id=\"main-content\"> landmark verified.');
   "
   ```

2. **Verify Scroll-Spy Bottom Boundary Logic**:
   Simulate the bottom boundary math:
   ```powershell
   node -e "
     const assert = require('assert');
     const checkBottom = (scrollY, innerHeight, scrollHeight) => {
       return scrollY > 50 && (innerHeight + scrollY >= scrollHeight - 60);
     };
     // Test 1: Page at top (scrollY = 0)
     assert.strictEqual(checkBottom(0, 800, 6200), false, 'scrollY = 0 must NOT trigger bottom');
     // Test 2: Rubber-band negative scroll (scrollY = -100)
     assert.strictEqual(checkBottom(-100, 800, 6200), false, 'Negative scroll must NOT trigger bottom');
     // Test 3: Short document (scrollHeight = 800, innerHeight = 800, scrollY = 0)
     assert.strictEqual(checkBottom(0, 800, 800), false, 'Short doc at scrollY=0 must NOT trigger bottom');
     // Test 4: Document bottom (docHeight = 6200, innerHeight = 800, maxScrollY = 5400)
     assert.strictEqual(checkBottom(5400, 800, 6200), true, 'maxScrollY must trigger bottom');
     // Test 5: Subpixel variance (scrollY = 5350, within 60px of bottom)
     assert.strictEqual(checkBottom(5350, 800, 6200), true, 'Within 60px of bottom must trigger bottom');
     console.log('PASS: Scroll-spy bottom boundary threshold logic verified.');
   "
   ```

3. **Execute Full Test Suite**:
   ```powershell
   node tests/runner.mjs
   ```
   *Expected*: All 143 tests pass, 67 skipped, 0 failures.

4. **Execute Adversarial Stress Harness**:
   ```powershell
   node tests/adversarial-stress-m2.test.mjs
   ```
   *Expected*: 16 passing tests.

5. **Typecheck Integrity**:
   ```powershell
   npm run typecheck
   ```
   *Expected*: Clean exit code 0.
