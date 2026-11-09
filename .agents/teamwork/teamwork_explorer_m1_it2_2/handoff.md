# Handoff Report — UI Primitives Accessibility Investigation (Iteration 2)

**From**: Explorer 2 (`teamwork_explorer_m1_it2_2`)  
**To**: Parent Orchestrator (`80f74cea-dec2-4ade-a654-1a36f869e117`)  
**Timestamp**: 2026-11-09T07:12:00Z  
**Handoff Type**: Hard (Investigation complete, actionable fix strategy produced)  

---

## 1. Observation

1. **`NeumorphicCard.tsx` interactive markup & attributes**:
   - Path: `src/components/ui/NeumorphicCard.tsx`
   - Lines 30-40:
     ```typescript
     const variantClasses = {
       default: cn(
         "bg-bg-base text-text-primary neu-rim shadow-neu-flat",
         interactive &&
           "transition-all duration-300 hover:shadow-neu-flat-lg hover:-translate-y-1 cursor-pointer"
       ),
       dark: cn(
         "bg-bg-dark text-darkText-primary neu-rim-dark shadow-neu-dark-flat",
         interactive &&
           "transition-all duration-300 hover:shadow-neu-dark-flat-lg hover:-translate-y-1 cursor-pointer"
       ),
       ...
     ```
   - Lines 47-58:
     ```tsx
     return (
       <div
         ref={ref}
         className={cn(
           "rounded-2xl relative",
           paddingClasses[padding],
           variantClasses[variant],
           className
         )}
         {...props}
       >
         {children}
       </div>
     );
     ```
   - Observed: When `interactive={true}`, the rendered element is a plain `<div>` without default `tabIndex={0}`, without `role="button"` or `role="region"`, without `onKeyDown` activation handler for `Enter` or `Space`, and without `focus-visible:` keyboard focus indicators.

2. **`NeumorphicButton.tsx` default `type` attribute**:
   - Path: `src/components/ui/NeumorphicButton.tsx`
   - Lines 18-26:
     ```typescript
     (
       {
         className,
         variant = "default",
         size = "md",
         isPressed = false,
         disabled,
         children,
         ...props
       },
       ref
     )
     ```
   - Lines 63-77:
     ```tsx
     return (
       <button
         ref={ref}
         disabled={disabled}
         className={cn(
           "inline-flex items-center justify-center font-medium font-body transition-all duration-200 select-none",
           "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base",
           "disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed",
           sizeClasses[size],
           variantClasses[variant],
           className
         )}
         {...props}
       >
         {children}
       </button>
     );
     ```
   - Observed: `type` is not destructured or explicitly set. In HTML5 W3C Specification §4.10.6, `<button>` elements with missing or invalid `type` attribute default to `type="submit"`.

3. **Current usages in `src/app/page.tsx`**:
   - Lines 116, 140: `<NeumorphicCard variant="default" interactive>` and `<NeumorphicCard variant="dark" interactive>`. These cards are rendered as non-focusable `<div>` elements.
   - Line 254: `<NeumorphicButton variant="accent" type="submit">Verify Form Input Styling</NeumorphicButton>`. Explicitly uses `type="submit"`.
   - Lines 177-214: Multiple `<NeumorphicButton>` instances rendered without explicit `type` attribute.

4. **Baseline Test Suite Execution**:
   - Command: `node tests/runner.mjs`
   - Output: `Active Tests Passed: 124, Pending Milestone Skipped: 85, Failed Assertions: 0, Total Duration: 3.19s, Exit code: 0`.

---

## 2. Logic Chain

1. **Card Accessibility Breakdown (linking Observation 1 & 3)**:
   - A non-interactive container `<div>` should not be focusable.
   - However, when a consumer specifies `interactive={true}` (e.g. `src/app/page.tsx:116`), visual affordances (`cursor-pointer`, hover shadow expansion, and `-translate-y-1` elevation) communicate to sighted mouse users that the card is actionable.
   - Keyboard-only users navigating via `Tab` cannot discover or focus the card because HTML `<div>` elements have no default tab stop.
   - Screen readers traversing the DOM do not recognize the card as an operable control because it lacks semantic role classification.
   - Therefore, when `interactive={true}`, the card must default to `tabIndex={0}` and `role="button"` (unless explicitly overridden by the consumer via props).

2. **Keyboard Activation & Event Bubbling (linking Observation 1)**:
   - Unlike native `<button>`, an HTML `<div>` with `role="button"` does not automatically synthesize a `click` event when `Enter` or `Space` is pressed.
   - WAI-ARIA Authoring Practices Guide (APG) for the Button Pattern requires that `Enter` and `Space` activate the button, and `Space` must prevent default window scrolling.
   - If the card contains child inputs, links, or buttons, keyboard events bubble up. If the card handler blindly captures `Space`, typing a space inside an inner input would be intercepted.
   - Therefore, the keyboard handler must verify `e.target === e.currentTarget` before executing card activation via `e.currentTarget.click()` or `props.onClick(e)`.

3. **Focus Visible Indication (linking Observation 1)**:
   - WCAG 2.1 Criterion 2.4.7 (Focus Visible) mandates that any keyboard-focusable control must display an unambiguous visible focus indicator.
   - Adding `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base` (and `focus-visible:ring-offset-bg-dark` for dark surfaces) fulfills this requirement while matching the design tokens established in `NeumorphicButton.tsx`.

4. **Form Button Default Hazard (linking Observation 2 & 3)**:
   - In HTML5, `<button>` without a `type` attribute defaults to `type="submit"`.
   - In Milestone 5 (`Section09Contact.tsx` / `Section10Contact.tsx`), dialogs, multi-step forms, and input clear buttons placed inside `<form>` elements will inadvertently trigger form submission when clicked.
   - Destructuring `type = "button"` and binding `type={type || "button"}` on the `<button>` element ensures all buttons default safely to non-submitting behavior, while callers needing submission explicitly pass `type="submit"` (as already modeled on `src/app/page.tsx:254`).

---

## 3. Caveats

1. **Card Semantic Variety**: Some cards may represent section landmarks rather than actionable buttons. The proposed implementation allows consumers to pass `role="region"` or `role="article"` and `tabIndex={-1}` to override defaults cleanly.
2. **Inner Interactive Elements**: When nesting interactive elements (e.g. external link icons) inside an interactive card, accessibility guidelines discourage nested focusable controls. The `e.target === e.currentTarget` guard prevents execution collisions, but designers should prefer distinct clickable targets.
3. **No Direct Source Mutations**: Per Explorer instructions, no project source code was modified during this turn. All code proposals are documented in `report.md` for immediate implementation by the Worker agent.

---

## 4. Conclusion

1. **`NeumorphicCard.tsx`** must be updated to:
   - Inject `tabIndex={props.tabIndex ?? (interactive ? 0 : undefined)}` and `role={props.role ?? (interactive ? "button" : undefined)}`.
   - Add `onKeyDown` handling for `Enter` and `Space` guarded by `e.target === e.currentTarget`.
   - Include high-contrast `focus-visible:` focus rings and active tactile depression classes for both light (`#E9EDF2`) and dark (`#171C29`) variants.
2. **`NeumorphicButton.tsx`** must be updated to:
   - Destructure `type = "button"`.
   - Bind `type={type || "button"}` to the native `<button>`.

Both solutions are zero-risk, backward-compatible, and resolve all UI primitives accessibility findings from Challenger 2 and Reviewer 2.

---

## 5. Verification Method

To independently verify the implementation:
1. **Source Inspection**:
   - Inspect `src/components/ui/NeumorphicCard.tsx`: verify lines contain `computedRole`, `computedTabIndex`, `handleKeyDown`, `e.target === e.currentTarget`, and `focus-visible:ring-2`.
   - Inspect `src/components/ui/NeumorphicButton.tsx`: verify line renders `<button type={buttonType} ...>`.
2. **Execution Commands**:
   - `npm run typecheck` (`tsc --noEmit`) -> Must exit code 0.
   - `npm run lint` (`next lint`) -> Must exit code 0.
   - `npm run build` (`next build`) -> Must exit code 0 with 4/4 static pages generated.
   - `node tests/runner.mjs` -> Must exit code 0 with 124+ active tests passing.
3. **DOM & Keyboard Verification**:
   - Inspect generated HTML of `<NeumorphicButton>Test</NeumorphicButton>`: must include `type="button"`.
   - Inspect generated HTML of `<NeumorphicCard interactive={true}>`: must include `role="button"` and `tabindex="0"`.
   - Pressing `Tab` in the browser must land on interactive cards with a visible accent focus outline, and pressing `Enter` or `Space` must fire click handlers.
