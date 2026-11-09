# Dispatch: Worker for Milestone 1 (Iteration 2 Remediation)

You are the implementation worker for Milestone 1 Remediation (Iteration 2).
Read:
- `c:\Users\Code66\.antigravity-ide\Persona\portfolio\GS-Softwares\.agents\teamwork\ORIGINAL_REQUEST.md`
- `c:\Users\Code66\.antigravity-ide\Persona\portfolio\GS-Softwares\.agents\teamwork\PROJECT.md`
- Contrast Remediation Report: `c:\Users\Code66\.antigravity-ide\Persona\portfolio\GS-Softwares\.agents\teamwork\teamwork_explorer_m1_it2_1\report.md`
- UI Accessibility Report: `c:\Users\Code66\.antigravity-ide\Persona\portfolio\GS-Softwares\.agents\teamwork\teamwork_explorer_m1_it2_2\report.md`
- Test Helper Resilience Report: `c:\Users\Code66\.antigravity-ide\Persona\portfolio\GS-Softwares\.agents\teamwork\teamwork_explorer_m1_it2_3\report.md`
- Proposed mock server: `c:\Users\Code66\.antigravity-ide\Persona\portfolio\GS-Softwares\.agents\teamwork\teamwork_explorer_m1_it2_3\proposed_mock-server.mjs`
- Proposed test fixes: `c:\Users\Code66\.antigravity-ide\Persona\portfolio\GS-Softwares\.agents\teamwork\teamwork_explorer_m1_it2_3\proposed_test_fixes.md`

Your state folder: `c:\Users\Code66\.antigravity-ide\Persona\portfolio\GS-Softwares\.agents\teamwork\teamwork_worker_m1_it2`
Working directory: `c:\Users\Code66\.antigravity-ide\Persona\portfolio\GS-Softwares`

Tasks to Implement:
1. Contrast Remediation:
   - `tailwind.config.ts`: Update `brand.accent` to `#4A65DC`, `brand.accentHover` to `#3852C7`, `brand.accentLight` to `#6E85EB`.
   - `src/app/globals.css`: Update `--brand-accent` CSS variable to `#4A65DC`.
   - `src/components/ui/NeumorphicInput.tsx` & `src/components/ui/NeumorphicSelect.tsx`: Change error message color class from `text-rose-600` to `text-rose-700` (`#BE123C`).
2. UI Accessibility:
   - `src/components/ui/NeumorphicCard.tsx`: When `interactive={true}`, default to `tabIndex={props.tabIndex ?? 0}`, `role={props.role ?? "button"}`, add keyboard `onKeyDown` (Enter/Space) handler with event bubbling protection, and `focus-visible:ring-2 focus-visible:ring-brand-accent`.
   - `src/components/ui/NeumorphicButton.tsx`: Explicitly default `type={type || "button"}`.
3. Windows Test Helper Resilience:
   - Replace `tests/helpers/mock-server.mjs` with the robust implementation in `teamwork_explorer_m1_it2_3/proposed_mock-server.mjs`.
   - Apply the test lifecycle cleanups from `proposed_test_fixes.md` to `tests/tier4-scenarios/15-user-journeys.test.mjs`, `tests/tier2-boundaries/12-security-sanitization-boundaries.test.mjs`, and `tests/runner.mjs`.
4. Verification:
   - Run `npm run typecheck` (must pass 0 errors).
   - Run `npm run lint` (must pass 0 errors).
   - Run `npm run build` (must pass 0 errors).
   - Run `node tests/runner.mjs` (ALL active tests must pass with 0 failures).

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Output your completion handoff to `c:\Users\Code66\.antigravity-ide\Persona\portfolio\GS-Softwares\.agents\teamwork\teamwork_worker_m1_it2\handoff.md`.

