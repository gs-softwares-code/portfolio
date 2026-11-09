# Adversarial Challenge Report — Milestone 2 Gate

**Gate Target**: Milestone 2 (Navigation, Hero Experience & Interactive AI Systems Visualizer)  
**Challenger**: Challenger 2 (`teamwork_challenger_m2_2`)  
**Archetype**: EMPIRICAL CHALLENGER  
**Verdict**: **`REQUEST_CHANGES`**  
**Date**: 2026-11-09  

---

## Challenge Summary

**Overall risk assessment**: **HIGH**

While the core functionality passes baseline smoke tests, TypeScript compilation, and the existing 143 unit assertions in `node tests/runner.mjs`, empirical stress-testing against the live application in headless Chromium across real viewports (320px to 1440px) surfaces **two major visual/geometric defects**, **one structural scroll-spy blind spot**, and **one HTML5/WCAG compliance violation**:

1. **SVG Data Pulse Paths Miss Agent Node Centers by ~20px (Geometric Misalignment)**:
   All 6 animated vector bezier paths in `HeroVisualization.tsx` terminate **18.5px to 20.3px BELOW** the center of the node icon circles. The traveling data pulses (`animateMotion`) disappear into the label capsule rather than the center of the node circle.
2. **4 Out of 5 Agent Node Labels Are Physically Clipped on Mobile Viewports (< 640px)**:
   On mobile screens (320px - 412px), `whitespace-nowrap` on `node.role` (up to 31 characters) causes peripheral node labels to extend up to **41.9px beyond canvas boundaries**, where they are brutally sliced off by canvas `overflow-hidden`.
3. **Navbar Scroll-Spy Bottom-of-Page Blind Spot**:
   Scroll position calculation (`scrollY + 140`) cannot activate the final section (`#contact`) at document bottom because the page cannot scroll far enough for `#contact` to reach `top - 140px`.
4. **Duplicate Nested `<main id="main-content">` Landmarks**:
   `layout.tsx` wraps `{children}` in `<main id="main-content">`, and `page.tsx` declares an inner `<main id="main-content">`, violating HTML5 parsing and WCAG 4.1.1.

---

## Challenges & Empirical Findings

### [High] Challenge 1: SVG Vector Connections & Animated Pulses Misaligned by ~20px Vertically

- **Assumption challenged**: The worker assumed that setting SVG coordinates to `(node.x, node.y)` (e.g. `(50, 47)`) and setting node container style to `left: ${node.x}%; top: ${node.y}%; transform: translate(-50%, -50%)` centers the vector paths on the node icon circles.
- **Attack scenario & empirical evidence**:
  - Measured in real Chromium browser via Playwright (`tests/adversarial-stress-m2.test.mjs` test 2.2):
    - Nexus Core Orchestrator (50%, 47%): `deltaX = 0.0px`, **`deltaY = 20.3px`**
    - Perception & Analysis Agent (18%, 22%): `deltaX = 0.0px`, **`deltaY = 20.3px`**
    - Autonomous Reasoning Engine (82%, 22%): `deltaX = 0.0px`, **`deltaY = 20.3px`**
    - Action Dispatch & Execution Worker (80%, 76%): `deltaX = 0.0px`, **`deltaY = 20.3px`**
    - Sovereign Guardrail Sentinel (20%, 76%): `deltaX = 0.0px`, **`deltaY = 20.3px`**
- **Blast radius**:
  The core centerpiece of Milestone 2 is the animated AI Systems Visualization. All SVG connector lines, gradient tracks, and traveling SMIL glowing data packets (`animateMotion`) miss the node circles entirely, terminating 20px below the icons directly on top of the text label capsules.
- **Root cause in code**:
  In `src/components/ai-visualization/AgentNode.tsx` (lines 71-149):
  ```tsx
  <div style={{ left: `${node.x}%`, top: `${node.y}%`, transform: "translate(-50%, -50%)" }} className="absolute z-20">
    <div className="group relative flex flex-col items-center ...">
      {/* Node Circle: height 48px to 64px */}
      <div className={cn("relative flex items-center justify-center rounded-2xl ...", ...)}>...</div>
      {/* Node Label Capsule: height ~38px */}
      <div className={cn("mt-1.5 px-2 py-0.5 rounded-md ...")}>...</div>
    </div>
  </div>
  ```
  `translate(-50%, -50%)` calculates the midpoint of the **combined** circle + label capsule (~88px to 104px total height). This shifts the circle's center **upwards by ~20px**, while the SVG path endpoint remains at `node.y%`.
- **Mitigation**:
  Decouple the circle center from the label height. Either position the label capsule with `absolute top-full left-1/2 -translate-x-1/2 mt-1.5 pointer-events-none` so that the primary translated container is strictly the icon circle, or offset the SVG path endpoints by the vertical label compensation.

---

### [High] Challenge 2: Agent Node Labels Clipped and Cut Off on Mobile Viewports (< 640px)

- **Assumption challenged**: The worker claimed full responsiveness across all mobile viewports down to 320px with zero overflow.
- **Attack scenario & empirical evidence**:
  - Measured in real Chromium browser via Playwright (`tests/adversarial-stress-m2.test.mjs` test 3.2):
    - **320px Viewport**: 4 out of 5 node labels are clipped by canvas `overflow-hidden`.
      - Sentinel (`x: 20%`): clipped by **41.9px** on the left (extends to `-8.9px`, beyond screen).
      - Analysis Agent (`x: 18%`): clipped by **36.2px** on the left (extends to `-3.2px`).
      - Reasoning Engine (`x: 82%`): clipped by **36.2px** on the right.
      - Execution Worker (`x: 80%`): clipped by **14.9px** on the right.
    - **360px Viewport**: 4 out of 5 nodes clipped (max clip: **33.9px**).
    - **375px Viewport**: 4 out of 5 nodes clipped (max clip: **30.9px**).
    - **390px Viewport**: 4 out of 5 nodes clipped (max clip: **27.9px**).
    - **412px Viewport**: 3 out of 5 nodes clipped (max clip: **23.5px**).
    - **480px Viewport**: 3 out of 5 nodes clipped (max clip: **9.9px**).
- **Blast radius**:
  On every single mobile smartphone viewport (< 640px), the user sees fragmented, chopped-off text ("elemetry & Zero-Trust", "ecision & Policy") in the interactive visualization.
- **Root cause in code**:
  In `src/components/ai-visualization/AgentNode.tsx` (lines 141-146):
  ```tsx
  <p className="font-heading text-[11px] sm:text-xs font-semibold text-text-primary whitespace-nowrap leading-tight">
    {node.shortName}
  </p>
  <p className="font-mono text-[9px] sm:text-[10px] text-text-secondary whitespace-nowrap leading-tight">
    {node.role}
  </p>
  ```
  `node.role` contains strings up to 31 characters (e.g. `"Telemetry & Zero-Trust Sentinel"`). With `whitespace-nowrap`, the label capsule is 164px wide. On a 254px mobile canvas, centering a 164px element at 18% (45.7px) results in a left coordinate of `45.7 - 82 = -36.3px`, which gets clipped by `.overflow-hidden`.
- **Mitigation**:
  On mobile viewports (`< sm` / `< 640px`), hide `node.role` using `hidden sm:block` and only render `node.shortName`, OR hide the floating label capsule on mobile entirely and let the live telemetry HUD below present the node role upon touch.

---

### [Medium] Challenge 3: Navbar Scroll-Spy Fails to Activate the Bottom-Most Section (`#contact`)

- **Assumption challenged**: The worker assumed `scrollPosition = window.scrollY + 140 >= section.offsetTop` correctly highlights the active section throughout the page.
- **Attack scenario & empirical evidence**:
  - Tested in `tests/adversarial-stress-m2.test.mjs` test 1.3:
    In any document where the last section (`#contact`) has an `offsetTop` greater than `(scrollHeight - innerHeight) + 140`, `scrollPosition` never reaches `contact.offsetTop`.
    When the user scrolls to the absolute bottom of the document (`scrollY = maxScrollY`), the scroll-spy remains stuck on `"philosophy"` and never switches to `"contact"`.
- **Blast radius**:
  The user reaches the contact section at the bottom of the page, but the navigation indicator fails to acknowledge it.
- **Root cause in code**:
  In `src/components/layout/Navbar.tsx` (lines 31-45):
  No check exists for `window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50`.
- **Mitigation**:
  Add an explicit bottom-of-page check at the start of `handleScroll`:
  ```ts
  const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;
  if (isAtBottom) {
    setActiveSection("contact");
    return;
  }
  ```

---

### [Low] Challenge 4: Duplicate Nested `<main id="main-content">` Landmarks

- **Assumption challenged**: Codebase complies with semantic HTML and accessibility guidelines.
- **Attack scenario & empirical evidence**:
  - Tested in `tests/adversarial-stress-m2.test.mjs` test 3.3:
    `src/app/layout.tsx` line 101: `<main id="main-content" className="relative flex min-h-screen flex-col">`
    `src/app/page.tsx` line 43: `<main id="main-content" className="space-y-16 pb-20">`
  - In rendered HTML, an inner `<main id="main-content">` is directly nested inside an outer `<main id="main-content">`.
- **Blast radius**:
  Violates WCAG 2.1 SC 4.1.1 (Parsing - duplicate IDs) and HTML5 specification (disallows nested `<main>` elements). Screen readers announce conflicting landmarks.
- **Mitigation**:
  Change the outer container in `src/app/page.tsx` line 43 from `<main id="main-content" ...>` to `<div className="space-y-16 pb-20">`.

---

## Stress Test Results

| Test Scenario | Expected Behavior | Actual Behavior | Result |
| :--- | :--- | :--- | :--- |
| **Navbar Top Scroll (scrollY = 0)** | "Home" active | "Home" active | **PASS** |
| **Navbar Rubber-Band (scrollY = -100)** | Does not crash, keeps "Home" | No crash, retains "Home" | **PASS** |
| **Navbar Bottom of Page Scroll** | Bottom section activates at scroll bottom | Stuck on previous section ("philosophy") | **FAIL (Finding 3)** |
| **Navbar Rapid Scroll (1,000 events)** | Sub-50ms execution, 0 runtime exceptions | 0 uncaught errors, sub-25ms | **PASS** |
| **Mobile Drawer Escape Dismiss** | Escape closes drawer, aria-expanded=false | Verified closes cleanly | **PASS** |
| **SVG Bezier Path Curves Math** | Continuous smooth curves within [0,100] | Valid quadratic curves | **PASS** |
| **SVG Endpoints vs Node Centers** | Vector lines connect to node circle center | Lines miss circle center by 20.3px | **FAIL (Finding 1)** |
| **SMIL animateMotion Controls** | 12 instances at 1x (3s), 0 on pause, 1.5s at 2x | Exactly 12 -> 0 -> 12, dur=1.5s | **PASS** |
| **CPU Throttling (CDP 6x Slowdown)** | Real-time telemetry updates without NaN/crash | Verified jitter updates cleanly | **PASS** |
| **Window Resize (50 rapid resizes)** | Responsive scaling without uncaught errors | 0 errors in 1.1s | **PASS** |
| **Mobile Document Horizontal Scroll** | `docScrollWidth <= clientWidth` on 320px-768px | Document scrollWidth === clientWidth | **PASS** |
| **Mobile Node Label Visibility (<640px)** | All node labels legible and fully within canvas | 4/5 node labels clipped by up to 41.9px | **FAIL (Finding 2)** |
| **HTML Semantic Landmarks** | Exactly 1 unique `<main id="main-content">` | 2 duplicate nested `<main id="main-content">` | **FAIL (Finding 4)** |
| **Test Suite Runner** | `node tests/runner.mjs` exits with code 0 | 143 passed, 67 skipped, 0 failed | **PASS** |

---

## Unchallenged Areas

- **Milestones 3, 4, 5 Features**: Capabilities (Section 03), Services (Section 04), Solutions (Section 05), Philosophy (Section 06), Projects Showcase (Section 07), Process (Section 08), Conversion (Section 09), Contact Form Backend (Section 10), and Footer (Section 11). These components are planned for subsequent milestones and were out of scope for the Milestone 2 Gate.
