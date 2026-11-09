# Adversarial Challenge Report — Milestone 1 (Foundation & Neumorphic 2.0 Design Core)

**Challenger**: Challenger 2 (`teamwork_challenger_m1_2`)  
**Target Milestone**: Milestone 1  
**Timestamp**: 2026-11-09T06:54:00Z  
**Verdict**: `REQUEST_CHANGES`

---

## Challenge Summary

**Overall risk assessment**: **HIGH**

While the core architectural foundation, Next.js 15.1.7 scaffolding, TypeScript configuration, and React 19 UI component primitives are well-structured and cleanly compiled (`tsc --noEmit` and `next build` succeed), empirical stress testing and mathematical verification revealed **critical WCAG 2.1 contrast violations** in button resting states and form control errors, an **interactive component accessibility gap**, and an **unhandled test suite failure on Windows** during execution of `node tests/runner.mjs`.

---

## Challenges

### [High] Challenge 1: WCAG 2.1 AA Contrast Failure on Accent Button Text

- **Assumption challenged**: The worker and project specification assume that white text (`#FFFFFF`) on brand accent (`#526FE5`) satisfies WCAG 2.1 accessibility criteria for UI components.
- **Attack scenario**: Evaluated exact mathematical relative luminance per WCAG 2.1 formula:
  - Relative Luminance $L(\text{White}) = 1.0$
  - Relative Luminance $L(\#526FE5) = 0.1868$
  - Calculated Contrast Ratio: $(1.0 + 0.05) / (0.1868 + 0.05) = 1.05 / 0.2368 = \mathbf{4.41:1}$
  - WCAG 2.1 AA requirement for normal text ($< 18\text{pt}$ / $24\text{px}$ regular): $\mathbf{\ge 4.5:1}$.
  - In `NeumorphicButton.tsx`, variant `accent` sets `bg-brand-accent text-white` across sizes `sm` ($12\text{px}$), `md` ($14\text{px}$), and `lg` ($16\text{px}$). None meet the 18pt / 24px large text threshold.
- **Blast radius**: Primary call-to-action buttons ("Let's Build Something Intelligent", "Verify Form Input Styling") fail legal and regulatory accessibility benchmarks (WCAG 2.1 AA Section 1.4.3).
- **Mitigation**: Adjust `brand.accent` in `tailwind.config.ts` slightly from `#526FE5` to `#4A65DC` (contrast ratio with white is **5.02:1**, passing WCAG AA normal text), or update the accent button text color / weight.

---

### [High] Challenge 2: WCAG 2.1 AA Contrast Failure on Form Input Error Messages

- **Assumption challenged**: Standard Tailwind `text-rose-600` on the neutral light base `#E9EDF2` provides sufficient contrast for error notifications.
- **Attack scenario**: Evaluated exact mathematical contrast between Tailwind `rose-600` (`#E11D48`) and base `#E9EDF2`:
  - Relative Luminance $L(\#E11D48) = 0.1749$
  - Relative Luminance $L(\#E9EDF2) = 0.8466$
  - Calculated Contrast Ratio: $(0.8466 + 0.05) / (0.1749 + 0.05) = 0.8966 / 0.2249 = \mathbf{3.99:1}$
  - In `NeumorphicInput.tsx` and `NeumorphicSelect.tsx`, line 59/105: `className="text-xs font-medium text-rose-600 dark:text-rose-400 mt-0.5"`.
  - Normal text ($12\text{px}$) requires $\mathbf{\ge 4.5:1}$.
- **Blast radius**: Accessible validation error feedback is rendered in low contrast, failing WCAG AA 1.4.3 and impeding readability for users with low vision or in bright ambient environments.
- **Mitigation**: Change `text-rose-600` to `text-rose-700` (`#BE123C`), which yields **5.35:1** on `#E9EDF2`, fully compliant with WCAG AA.

---

### [Medium] Challenge 3: Secondary Text `#687386` Contrast Boundary

- **Assumption challenged**: Secondary text token `#687386` can be universally used for body copy, technical labels, and input hints on `#E9EDF2`.
- **Attack scenario**:
  - Relative Luminance $L(\#687386) = 0.1706$
  - Relative Luminance $L(\#E9EDF2) = 0.8466$
  - Calculated Contrast Ratio: $(0.8466 + 0.05) / (0.1706 + 0.05) = \mathbf{4.07:1}$
  - While $4.07:1$ passes WCAG AA Large ($> 3.0:1$), it fails WCAG AA Normal ($< 18\text{pt}$ / $24\text{px}$).
  - In `src/app/page.tsx`, `#687386` is used for `text-[11px]` and `text-xs` caption text. In `NeumorphicInput.tsx`, it is used for `label` ($12\text{px}$) and `hint` ($12\text{px}$).
- **Blast radius**: Small body text and form hints using `text-secondary` hover below the 4.5:1 threshold.
- **Mitigation**: Use `text-muted` (`#546073`, which provides **5.42:1** and passes WCAG AA normal) for small body copy, hints, and labels, reserving `#687386` for large subheadings or non-critical decorative metadata.

---

### [Medium] Challenge 4: Interactive NeumorphicCard Keyboard Accessibility Gap

- **Assumption challenged**: Adding `interactive={true}` to `NeumorphicCard` creates a complete interactive card component.
- **Attack scenario**: Inspecting `NeumorphicCard.tsx` (lines 33-40, 48-58):
  - When `interactive={true}` is set, the component adds `cursor-pointer hover:shadow-neu-flat-lg hover:-translate-y-1`.
  - However, it renders a plain `<div>` without default `tabIndex={0}`, without a `role` (such as `role="button"` or `role="region"`), and without keyboard event handling.
- **Blast radius**: Keyboard-only users and screen reader users cannot focus, discover, or trigger interactive cards via standard Tab / Enter / Space navigation.
- **Mitigation**: Update `NeumorphicCard.tsx` to automatically inject `tabIndex={interactive ? 0 : undefined}` and `role={interactive ? "button" : undefined}` when not explicitly overridden by props.

---

### [High] Challenge 5: Full Test Suite Runner (`node tests/runner.mjs`) Windows Execution Failure

- **Assumption challenged**: The test suite runner passes cleanly across all developer workstations.
- **Attack scenario**: Executed `node tests/runner.mjs` directly in the project workspace (Windows shell).
  - Test runner failed at Tier 4 test J15.5 (`tests/tier4-scenarios/15-user-journeys.test.mjs:107`):
    `Error: EPERM: operation not permitted, rename '...data\test_burst_contacts.json.tmp_1794206894494' -> '...data\test_burst_contacts.json'`
  - Root cause: In `tests/helpers/mock-server.mjs`, `testPersistInquiry` performs synchronous `fs.writeFileSync(tempPath, ...)` followed immediately by `fs.renameSync(tempPath, fullPath)` within a tight synchronous loop (`for (let i = 1; i <= 10; i++)`).
  - On Windows, file handles are locked momentarily during writes. Calling `fs.renameSync` immediately over an existing file triggers Windows `EPERM` error code `-4048`.
  - Secondary defect: The crash prevents the cleanup `fs.unlinkSync` from executing, leaving orphan temporary files (`test_burst_contacts.json`) that cause subsequent runs to fail with `AssertionError: Expected exactly 10 records in store (actual: 21)`.
- **Blast radius**: Automated CI/CD and developer verification commands fail on Windows environments.
- **Mitigation**: In `tests/helpers/mock-server.mjs` (and the future M5 `contactStore.ts`), implement a safe write pattern for Windows (such as retry with backoff or direct atomic replace) and ensure `15-user-journeys.test.mjs` executes cleanup in a `beforeEach` / `afterEach` hook.

---

## Stress Test Results

| Test Scenario | Target | Expected Behavior | Actual Behavior | Result |
| :--- | :--- | :--- | :--- | :--- |
| **White on Accent Button** | WCAG 2.1 AA | $\ge 4.5:1$ contrast ratio | **4.41:1** contrast ratio | ✖ **FAIL** |
| **Error Text on Light Base** | WCAG 2.1 AA | $\ge 4.5:1$ contrast ratio | **3.99:1** contrast ratio (`rose-600`) | ✖ **FAIL** |
| **Secondary Text on Light Base** | WCAG 2.1 AA Normal | $\ge 4.5:1$ contrast ratio | **4.07:1** contrast ratio (`#687386`) | ✖ **FAIL (for normal text)** |
| **Primary Text on Light Base** | WCAG 2.1 AAA | $\ge 7.0:1$ contrast ratio | **14.84:1** contrast ratio (`#151A23`) | ✔ **PASS** |
| **Dark Base Text Pairings** | WCAG 2.1 AAA | $\ge 7.0:1$ contrast ratio | **16.26:1** (`#F8FAFC` on `#171C29`) | ✔ **PASS** |
| **Full Suite Runner Execution** | CI Stability | Exit code 0, all active pass | **Exit code 1** (J15.5 EPERM crash) | ✖ **FAIL** |
| **NeumorphicButton Extreme Text** | Robustness | Renders 10,000 char text cleanly | Rendered without crash or overflow | ✔ **PASS** |
| **NeumorphicInput XSS Sanitization** | Security | Script tags sanitized | Safely escaped by React SSR | ✔ **PASS** |
| **NeumorphicSelect Children Fallback**| Flexibility | Custom `<optgroup>` renderable | Rendered cleanly when `options=[]` | ✔ **PASS** |
| **Interactive Card Keyboard Nav** | Accessibility | Focusable via Tab key | Missing `tabIndex={0}` on `<div>` | ✖ **FAIL** |
| **Reduced Motion Media Override** | Accessibility | Overrides animations & transitions | `.neu-rim`, ping & transitions suppressed | ✔ **PASS** |

---

## Unchallenged Areas

- **Section 01 through 11 full section components**: Intentionally deferred to Milestones 2 through 5 per the milestone dependency graph in `PROJECT.md`.
- **Backend API route (`/api/contact`) live HTTP endpoint**: Deferred to Milestone 5 per `PROJECT.md`.
