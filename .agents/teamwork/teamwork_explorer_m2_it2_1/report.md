# Architectural Investigation Report: Defect 1 — SVG Vector Path and Node Icon Center Misalignment

**Investigator**: Explorer 1 (`teamwork_explorer_m2_it2_1`)  
**Role**: Teamwork Explorer (Read-Only Investigation & Architectural Strategy)  
**Milestone**: Milestone 2 Iteration 2 Remediation  
**Target Files**: `src/components/ai-visualization/AgentNode.tsx`, `src/components/ai-visualization/HeroVisualization.tsx`  
**Date**: 2026-11-09  

---

## Executive Summary

Challenger 2 empirically demonstrated that in `HeroVisualization.tsx` and `AgentNode.tsx`, all 6 SVG vector connector lines and traveling SMIL `animateMotion` data pulses terminate **20.3px below the geometric center** of the agent node icon circles across all 5 nodes.

This investigation confirms the root cause: **compound vertical centering coupling** in `AgentNode.tsx`. Specifically, `transform: "translate(-50%, -50%)"` is applied to an outer container whose height is computed from the flex-column combination of the icon circle (48px–80px), the top margin (6px), and the label capsule (~34.6px). Centering this compound 90px–120px element at `(node.x%, node.y%)` shifts the icon circle center upwards by `(margin + label_height) / 2 = 20.3px`, while the SVG bezier paths connect to `(node.x%, node.y%)`.

We present a **zero-regression architectural fix strategy** that decouples the icon circle center by positioning the label capsule with `position: absolute; top: 100%; left: 50%; transform: translateX(-50%)`. This ensures:
1. `deltaX = 0.0px` and `deltaY = 0.0px` across all viewports and all 5 nodes.
2. Zero changes needed to SVG coordinates in `HeroVisualization.tsx` (preserving path math and existing unit tests).
3. Complete preservation of click/touch target size (>= 44x44px), keyboard navigation (`tabIndex={0}`, Enter/Space handlers), and WCAG focus ring ergonomics.
4. Total immunity from label height variations, making the companion fix for Defect 2 (mobile label clipping) completely orthogonal and non-breaking.

---

## 1. Mathematical Anatomy of the Defect

### 1.1 Coordinate System & Rendering Pipeline

In `HeroVisualization.tsx`:
```tsx
<div className="relative w-full h-[280px] sm:h-[320px] my-2 select-none overflow-hidden rounded-2xl bg-gradient-to-b from-black/[0.01] to-black/[0.03]">
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none z-10"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
  >
    {/* 6 DataPulsePath instances with start/end at (node.x, node.y) */}
  </svg>
  {nodes.map((node) => (
    <AgentNode key={node.id} node={node} ... />
  ))}
</div>
```

The SVG viewport has `viewBox="0 0 100 100"` and `preserveAspectRatio="none"`, perfectly spanning the canvas container.
Given canvas width $W_{canvas}$ and canvas height $H_{canvas}$:
- Any SVG coordinate $(x, y)$ evaluates to pixel position:
  $$X_{svg} = \left(\frac{x}{100}\right) \cdot W_{canvas}$$
  $$Y_{svg} = \left(\frac{y}{100}\right) \cdot H_{canvas}$$

### 1.2 The DOM Hierarchy in `AgentNode.tsx` (Current Flawed Implementation)

```tsx
<div
  style={{
    left: `${node.x}%`,
    top: `${node.y}%`,
    transform: "translate(-50%, -50%)",
  }}
  className="absolute z-20"
>
  <div
    role="button"
    className="group relative flex flex-col items-center cursor-pointer select-none outline-none transition-all duration-300 ..."
  >
    {/* Node Circle: H_circle = 48px to 80px */}
    <div className="relative flex items-center justify-center rounded-2xl ...">...</div>

    {/* Node Label Capsule: mt-1.5 (6px) + H_label (~34.6px) */}
    <div className="mt-1.5 px-2 py-0.5 rounded-md neu-rim shadow-neu-flat-sm bg-bg-base text-center ... pointer-events-none">
      <p className="font-heading text-[11px] sm:text-xs font-semibold text-text-primary whitespace-nowrap leading-tight">
        {node.shortName}
      </p>
      <p className="font-mono text-[9px] sm:text-[10px] text-text-secondary whitespace-nowrap leading-tight">
        {node.role}
      </p>
    </div>
  </div>
</div>
```

### 1.3 Exact Vertical Center Derivation

Because the button container has `display: flex; flex-direction: column; align-items: center`:
1. Both the Circle and the Label are in the normal document layout flow.
2. The total height of the compound container $H_{total}$ is:
   $$H_{total} = H_{circle} + M_{top} + H_{label}$$
   where:
   - $M_{top} = 6\text{px}$ (`mt-1.5`)
   - $H_{label} = \text{padding}(4\text{px}) + \text{border}(2\text{px}) + \text{line}_1(15\text{px}) + \text{line}_2(13.6\text{px}) \approx 34.6\text{px}$
   - $M_{top} + H_{label} \approx 40.6\text{px}$

3. The outer container applies `top: node.y%` and `transform: translate(-50%, -50%)`:
   The top coordinate of the outer container in the canvas is:
   $$Y_{top} = Y_{svg} - \frac{H_{total}}{2} = Y_{svg} - \frac{H_{circle} + 40.6\text{px}}{2} = Y_{svg} - \frac{H_{circle}}{2} - 20.3\text{px}$$

4. The geometric center of the Circle $Y_{actual}$ is:
   $$Y_{actual} = Y_{top} + \frac{H_{circle}}{2} = \left(Y_{svg} - \frac{H_{circle}}{2} - 20.3\text{px}\right) + \frac{H_{circle}}{2} = Y_{svg} - 20.3\text{px}$$

5. The vertical delta $\Delta Y$ between the SVG path endpoint ($Y_{svg}$) and the circle center ($Y_{actual}$) is:
   $$\Delta Y = |Y_{svg} - Y_{actual}| = 20.3\text{px}$$

In the horizontal direction, `align-items: center` aligns the horizontal center of the circle with the horizontal center of the container:
$$X_{actual} = X_{svg} \implies \Delta X = 0.0\text{px}$$

Thus, Challenger 2's empirical observation of `deltaX = 0.0px, deltaY = 20.3px` across all 5 nodes is verified with mathematical exactness.

---

## 2. Blast Radius & Functional Impact

1. **Visual Disconnect**: Traveling glowing data pulses (`animateMotion`) travel along bezier curves and terminate in empty space 20.3px below the icon circle, directly on top of the text label capsule. The perception of an integrated agent network is broken.
2. **Brittle Coupling**: Any change to typography, label padding, or font loading directly alters $H_{label}$, causing the icon circle and hover hitbox to jump vertically.
3. **Impediment to Mobile Remediation**: In Defect 2 (Mobile Viewport < 640px Agent Node Label Clipping), hiding `node.role` on mobile reduces $H_{label}$ from ~34.6px to ~16px. If the circle and label remain coupled, fixing Defect 2 would cause the circle center to shift vertically by ~9.3px between mobile and desktop viewports, creating viewport-dependent SVG misalignment.

---

## 3. Evaluation of Architectural Strategies

| Strategy | Implementation | $\Delta X / \Delta Y$ | Responsive Stability | Accessibility & Tests | Verdict |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Strategy 1: Absolute Label Decoupling (Recommended)** | Keep `translate(-50%, -50%)` on outer container. Make `<div role="button">` wrap only the circle in flow. Position label capsule with `absolute top-full left-1/2 -translate-x-1/2 mt-1.5`. | $\Delta X = 0\text{px}$<br>$\Delta Y = 0\text{px}$ | 100% stable across all screen widths; immune to label text changes. | Preserves all selectors (`role="button"`, `el.querySelector('div')`, `.pointer-events-none`). Focus ring hugs circle. | **ADOPT (Optimal)** |
| **Strategy 2: SVG Path Endpoint Offset** | Offset SVG `end.y` in `HeroVisualization.tsx` by fixed percentage. | Highly variable (fails between mobile 280px and desktop 320px). | Fails: 20.3px is 7.25% at 280px height, but 6.34% at 320px height. | Breaches test 2.1 (which expects exact node coordinates in `HeroVisualization.tsx`). | **REJECT** |
| **Strategy 3: Zero-Dimension Anchor Point** | Outer wrapper at `(node.x%, node.y%)` with `w-0 h-0`. Circle and label positioned as siblings. | $\Delta X = 0\text{px}$<br>$\Delta Y = 0\text{px}$ | Stable | Breaks test 3.2 selector `el.querySelector('.pointer-events-none')` because label is no longer a child of `[role="button"]`. | **REJECT** |

---

## 4. Recommended Architectural Specification (Strategy 1)

### 4.1 Proposed Code Modifications

#### Target File: `src/components/ai-visualization/AgentNode.tsx`

```tsx
<<<<
      <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        }}
        aria-label={`${node.name} (${node.role}) - Status: ${node.status}`}
        className={cn(
          "group relative flex flex-col items-center cursor-pointer select-none outline-none transition-all duration-300",
          "focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg-base rounded-2xl"
        )}
      >
        {/* Node Circle */}
        <div
          className={cn(
            "relative flex items-center justify-center rounded-2xl transition-all duration-300",
            isOrch
              ? "h-16 w-16 sm:h-20 sm:w-20 bg-bg-base neu-rim shadow-neu-flat"
              : "h-12 w-12 sm:h-14 sm:w-14 bg-bg-base neu-rim shadow-neu-flat hover:-translate-y-0.5",
            isSelected && (isOrch ? "ring-2 ring-brand-accent shadow-neu-accent scale-105" : "ring-2 ring-brand-accent shadow-neu-accent scale-110"),
            !isSelected && "hover:shadow-neu-flat-lg hover:scale-105 active:shadow-neu-pressed active:scale-95"
          )}
        >
          {/* Active Pulse Ring */}
          ...
          {/* Central Icon */}
          {getIcon()}
        </div>

        {/* Node Label Capsule */}
        <div
          className={cn(
            "mt-1.5 px-2 py-0.5 rounded-md neu-rim shadow-neu-flat-sm bg-bg-base text-center transition-all duration-200 pointer-events-none",
            isSelected ? "shadow-neu-pressed border-brand-accent/40" : "bg-bg-base/90"
          )}
        >
          <p className="font-heading text-[11px] sm:text-xs font-semibold text-text-primary whitespace-nowrap leading-tight">
            {node.shortName}
          </p>
          <p className="font-mono text-[9px] sm:text-[10px] text-text-secondary whitespace-nowrap leading-tight">
            {node.role}
          </p>
        </div>
      </div>
====
      <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        }}
        aria-label={`${node.name} (${node.role}) - Status: ${node.status}`}
        className={cn(
          "group relative flex items-center justify-center cursor-pointer select-none outline-none transition-all duration-300",
          "focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg-base rounded-2xl"
        )}
      >
        {/* Node Circle */}
        <div
          className={cn(
            "relative flex items-center justify-center rounded-2xl transition-all duration-300",
            isOrch
              ? "h-16 w-16 sm:h-20 sm:w-20 bg-bg-base neu-rim shadow-neu-flat"
              : "h-12 w-12 sm:h-14 sm:w-14 bg-bg-base neu-rim shadow-neu-flat hover:-translate-y-0.5",
            isSelected && (isOrch ? "ring-2 ring-brand-accent shadow-neu-accent scale-105" : "ring-2 ring-brand-accent shadow-neu-accent scale-110"),
            !isSelected && "hover:shadow-neu-flat-lg hover:scale-105 active:shadow-neu-pressed active:scale-95"
          )}
        >
          {/* Active Pulse Ring */}
          ...
          {/* Central Icon */}
          {getIcon()}
        </div>

        {/* Node Label Capsule */}
        <div
          className={cn(
            "absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2 py-0.5 rounded-md neu-rim shadow-neu-flat-sm bg-bg-base text-center transition-all duration-200 pointer-events-none whitespace-nowrap",
            isSelected ? "shadow-neu-pressed border-brand-accent/40" : "bg-bg-base/90"
          )}
        >
          <p className="font-heading text-[11px] sm:text-xs font-semibold text-text-primary whitespace-nowrap leading-tight">
            {node.shortName}
          </p>
          <p className="font-mono text-[9px] sm:text-[10px] text-text-secondary whitespace-nowrap leading-tight hidden sm:block">
            {node.role}
          </p>
        </div>
      </div>
>>>>
```

### 4.2 Key Invariants Preserved

1. **Mathematical Invariant**:
   - In-flow children of `<div role="button">`: ONLY the Node Circle.
   - Height of `<div role="button">` = $H_{circle}$.
   - Width of `<div role="button">` = $W_{circle}$.
   - Outer container height = $H_{circle}$, width = $W_{circle}$.
   - Center of outer container = $\left(\text{node.x}\%, \text{node.y}\%\right)$.
   - Center of Node Circle = $\left(\text{node.x}\%, \text{node.y}\%\right)$.
   - $\Delta X = 0.0\text{px}$, $\Delta Y = 0.0\text{px}$.

2. **Test Harness Compatibility**:
   - `parent = el.closest('.absolute')`: Still possesses `left: ${node.x}%; top: ${node.y}%; transform: translate(-50%, -50%)`.
   - `circle = el.querySelector('div')`: Selects the Node Circle (first child `div` of `el`).
   - `label = el.querySelector('.pointer-events-none')`: Selects the Label Capsule.
   - Zero test selector breakage.

3. **Accessibility & Usability**:
   - Keyboard Tab navigation order is unchanged.
   - Focus ring now precisely hugs the squircle icon circle instead of a vertically stretched compound box.
   - Interactive hitbox remains $> 44\text{px} \times 44\text{px}$ (exceeding WCAG 2.5.5).

4. **Defect 2 Symbiosis**:
   - Because the label capsule is `absolute`, adding `hidden sm:block` to `node.role` resolves the mobile text clipping defect without shifting the circle center by even a fraction of a pixel.

---

## 5. Verification Plan

1. **Adversarial Geometric Verification**:
   Execute browser evaluation matching `tests/adversarial-stress-m2.test.mjs` test 2.2:
   Verify `deltaX === 0` and `deltaY === 0` for all 5 nodes:
   - Nexus Core Orchestrator (50%, 47%): `deltaX = 0.0px, deltaY = 0.0px`
   - Perception & Analysis Agent (18%, 22%): `deltaX = 0.0px, deltaY = 0.0px`
   - Autonomous Reasoning Engine (82%, 22%): `deltaX = 0.0px, deltaY = 0.0px`
   - Action Dispatch & Execution Worker (80%, 76%): `deltaX = 0.0px, deltaY = 0.0px`
   - Sovereign Guardrail Sentinel (20%, 76%): `deltaX = 0.0px, deltaY = 0.0px`

2. **TypeScript & Production Build Verification**:
   ```powershell
   npm run typecheck
   npm run build
   ```
   Both must exit with status code 0.

3. **Full Test Suite Verification**:
   ```powershell
   node tests/runner.mjs
   ```
   All 143 active assertions must pass.
