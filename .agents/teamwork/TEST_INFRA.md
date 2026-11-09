# GS-Softwares: E2E Test Infrastructure Specification

**Document Version**: 1.0.0  
**Target Project**: GS-Softwares (`c:\Users\Code66\.antigravity-ide\Persona\portfolio\GS-Softwares`)  
**Test Suite Directory**: `tests/`  
**Integrity Mode**: Opaque-box, Requirement-Driven, Zero-Facade  
**Authoritative Specifications**: `ORIGINAL_REQUEST.md`, `PROJECT.md`, Design Survey Report  

---

## 1. Executive Summary & Testing Philosophy

This document defines the comprehensive end-to-end test infrastructure for the **GS-Softwares** production business website.

The testing methodology follows a strict **opaque-box, requirement-driven 4-tier model**:
1. **Opaque-Box Execution**: The test suite evaluates observable behavior, structural semantics, design tokens, mathematical contrast, responsive bounds, API contracts, and filesystem persistence from the outside. Tests do not depend on internal private state or non-public variables.
2. **Authoritative Derivation**: Expected values are derived strictly from `ORIGINAL_REQUEST.md`, `PROJECT.md`, and the verified repository survey (`teamwork_explorer_survey_repos`). No values or claims are fabricated.
3. **Zero-Facade Guarantee**: Every test executes authentic assertions against actual files, schemas, CSS AST rules, WCAG luminance mathematics, HTTP requests, and disk persistence. No mock assertion that unconditionally passes is permitted.
4. **Progressive Testability & Graceful Reporting**: The test runner is executable at any milestone stage. It distinguishes between currently implemented features and pending milestones, providing clear diagnostic feedback to milestone implementation workers.

---

## 2. Directory Layout & Test Suite Architecture

All test files reside inside `tests/` at the project root. Per workspace convention, `.agents/teamwork/` contains only test metadata (`TEST_INFRA.md`, `TEST_READY.md`).

```
c:\Users\Code66\.antigravity-ide\Persona\portfolio\GS-Softwares/
├── tests/
│   ├── helpers/
│   │   ├── contrast.mjs               # WCAG 2.1 relative luminance & contrast ratio engine
│   │   ├── parser.mjs                 # Source parser for tokens, AST, DOM elements, and attributes
│   │   ├── mock-server.mjs            # In-process HTTP & storage test harness for /api/contact
│   │   └── assertions.mjs             # Custom test assertion and diagnostic helpers
│   ├── tier1-features/
│   │   ├── 01-tokens-typography-contrast.test.mjs    # Features 1, 2, 3: Neumorphic tokens, fonts, contrast
│   │   ├── 02-sections-structure.test.mjs            # Features 4: 11 sections presence & semantic landmarks
│   │   ├── 03-navigation-hero.test.mjs               # Features 5, 6, 7: Floating navbar, hero layout, AI simulation
│   │   ├── 04-capabilities-services.test.mjs         # Features 8, 9: Capabilities 3 compositions & 6 Services
│   │   ├── 05-solutions-philosophy.test.mjs          # Features 10, 11: 5-tab Industry selector & 4 Philosophy laws
│   │   ├── 06-projects-showcase.test.mjs             # Features 12, 13: 4 Primary + 6 Secondary verified repos
│   │   ├── 07-process-conversion-footer.test.mjs     # Features 14, 15, 16: 5-stage timeline, dark surface, footer
│   │   ├── 08-contact-form-api.test.mjs              # Features 17, 18: 7-field form, /api/contact, JSON storage
│   │   └── 09-seo-accessibility.test.mjs             # Features 19: Sitemap, robots, OpenGraph, JSON-LD, reduced motion
│   ├── tier2-boundaries/
│   │   ├── 10-contact-boundaries.test.mjs            # Boundary values for form inputs, lengths, phone, email, rate limits
│   │   ├── 11-responsive-overflow-boundaries.test.mjs# Viewport bounds (320px, 375px, 768px, 1024px, 1440px), overflow
│   │   ├── 12-security-sanitization-boundaries.test.mjs # XSS injection, payload tampering, prototype pollution, path traversal
│   │   └── 13-motion-contrast-boundaries.test.mjs    # prefers-reduced-motion media query limits, luminance boundary edge cases
│   ├── tier3-combinations/
│   │   └── 14-cross-feature-combinations.test.mjs    # Pairwise cross-feature interactions (dark + contrast, mobile + nav, etc.)
│   ├── tier4-scenarios/
│   │   └── 15-user-journeys.test.mjs                 # 5 Real-world end-to-end user journeys
│   └── runner.mjs                     # Unified CLI runner with ANSI colorized reporting & summary
```

---

## 3. 4-Tier Test Methodology & Coverage Matrix

### Tier 1: Feature Coverage (≥5 Tests Per Feature)
Tier 1 ensures baseline functional correctness across every individual feature from `PROJECT.md` and `ORIGINAL_REQUEST.md`:

| Feature # | Feature Description | Target Scope | Min Tests | Test Suite |
| :--- | :--- | :--- | :--- | :--- |
| **F01** | Neumorphic 2.0 Design Tokens | Palette (`#E9EDF2`, `#151A23`, `#687386`, `#526FE5`, `#171C29`, `#36A783`), dual shadows, inset shadows, dark shadows | 8 | `01-tokens-typography-contrast` |
| **F02** | Typography Hierarchy | Space Grotesk (headings), Inter (body), IBM Plex Mono (technical labels) font bindings | 6 | `01-tokens-typography-contrast` |
| **F03** | Core Neumorphic UI Primitives | NeumorphicButton, NeumorphicCard, NeumorphicInput, NeumorphicSelect, StatusBadge | 8 | `01-tokens-typography-contrast` |
| **F04** | Base Scaffolding & 11 Sections | HTML landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`), all 11 section IDs | 12 | `02-sections-structure` |
| **F05** | Section 01: Floating Sticky Navbar | Sticky floating position, brand wordmark, desktop links, active section spy, mobile drawer toggle | 8 | `03-navigation-hero` |
| **F06** | Section 02: Asymmetric Hero Layout | 55/45 asymmetrical grid, headline, narrative, primary CTA, secondary CTA, trust statement & metrics | 7 | `03-navigation-hero` |
| **F07** | Section 02: Interactive AI Simulation | Central orchestrator, 5 peripheral agent nodes, SVG pulse vectors, interactive telemetry HUD, pause/reduce-motion | 8 | `03-navigation-hero` |
| **F08** | Section 03: Capability Overview | 3 distinct visual compositions (Intelligence decision tree, Automation pipeline, Engineering terminal) | 6 | `04-capabilities-services` |
| **F09** | Section 04: Premium Services | 6 service presentations (AI Agent Dev, Automation, Custom Platforms, Web, App, Infrastructure) | 7 | `04-capabilities-services` |
| **F10** | Section 05: Industry Solutions | 5-tab selector (Hospitality, Beauty & Wellness, Legal, Retail, Growing Businesses) with coordinated facets | 6 | `05-solutions-philosophy` |
| **F11** | Section 06: Engineering Philosophy | 4 principles (Business-First, Purpose-Built, Intelligent by Design, Built to Scale) + connected diagram | 6 | `05-solutions-philosophy` |
| **F12** | Section 07: Primary Projects Showcase | 4 primary repos (Off The Grid Gym, CafeOS, Rupnagar Tailors, VyaparOS) with authentic tech stacks, status tags, GitHub links | 8 | `06-projects-showcase` |
| **F13** | Section 07: Additional Projects Gallery| 6 secondary repos (FacultyOS, KrishiOS, MONOLITH, GuardPayOS, CampusOS, Inventory) with direct GitHub links | 8 | `06-projects-showcase` |
| **F14** | Section 08: Process Timeline | 5-stage engineering journey (Discover, Architect, Engineer, Deploy, Evolve) with connected progress markers | 6 | `07-process-conversion-footer` |
| **F15** | Section 09: Conversion Section | High-contrast dark neumorphic surface (`#171C29`), headline, dual CTAs, trust badges | 6 | `07-process-conversion-footer` |
| **F16** | Section 11: Complete Brand Footer | Brand identity, description, directory links, GitHub profile link (`https://github.com/Gulshan-Singh-gs`), copyright | 7 | `07-process-conversion-footer` |
| **F17** | Section 10: Contact Form | 7 fields (FullName, BusinessName, Email, Phone, Industry, Service, Description), validation errors, accessible labels | 9 | `08-contact-form-api` |
| **F18** | Backend Contact API & Persistence | POST `/api/contact` route handler, Zod schema validation, HTTP 200/400/500, atomic append to `data/contacts.json` | 9 | `08-contact-form-api` |
| **F19** | SEO, Metadata & Accessibility | Dynamic `sitemap.ts`, `robots.ts`, OpenGraph social metadata, JSON-LD Schema (`Organization`, `WebSite`), reduced motion | 8 | `09-seo-accessibility` |

---

### Tier 2: Boundary & Corner Cases (≥5 Tests Per Boundary Category)
Tier 2 exercises extreme bounds, invalid inputs, edge-condition formatting, and hostile payloads:

1. **Form Validation Boundaries (`10-contact-boundaries.test.mjs`)**:
   - `fullName` boundary checks (1 char rejected, 2 chars accepted, 100 chars accepted, 101 chars rejected).
   - `businessName` boundary checks (1 char rejected, 2 chars accepted, 100 chars accepted, 101 chars rejected).
   - `email` RFC 5322 compliance (missing `@`, missing domain, multiple `@`, extra-long TLD, valid plus-aliased address).
   - `phone` format tolerance (empty string allowed, minimum 7 digits accepted, international prefix `+91`, parentheses/dashes accepted, alphabet characters rejected).
   - `description` length boundaries (9 chars rejected, 10 chars accepted, 2000 chars accepted, 2001 chars rejected).
   - `industry` & `service` invalid enum rejection (unknown slugs return 400 Bad Request).
   - Blank / whitespace-only string rejection.

2. **Responsive & Viewport Overflow Boundaries (`11-responsive-overflow-boundaries.test.mjs`)**:
   - Narrow mobile viewport boundary (320px minimum screen width).
   - Standard mobile viewport boundary (375px / 390px).
   - Tablet transition boundary (768px breakpoint).
   - Desktop boundary (1024px and 1440px editorial grid).
   - CSS zero horizontal overflow validation (`max-w-full`, `overflow-x-hidden`, `break-words`).

3. **Security, Sanitization & Tampering Boundaries (`12-security-sanitization-boundaries.test.mjs`)**:
   - XSS script tag injection in `fullName` and `description` (`<script>alert(1)</script>`).
   - HTML markup stripping in stored contact records.
   - Prototype pollution prevention (`__proto__`, `constructor` payloads).
   - Path traversal defense in storage module.
   - Malformed JSON body in POST requests (returns clean 400 Bad Request without unhandled exception).

4. **Motion & Accessibility Boundaries (`13-motion-contrast-boundaries.test.mjs`)**:
   - `prefers-reduced-motion: reduce` CSS override rules verification.
   - Math verification of minimum WCAG contrast for all text tokens against light and dark surfaces.
   - Boundary checks for focus visible outlines on buttons, links, and inputs.

---

### Tier 3: Cross-Feature Combinations (Pairwise Coverage)
Tier 3 tests how independent features behave when activated simultaneously:

1. **Dark Neumorphic Surface + WCAG AAA Text Contrast**: Verifies `#171C29` background maintains $\ge 14:1$ contrast against `#F8FAFC` headings and $\ge 6.8:1$ against `#94A3B8` subtitles.
2. **Sticky Navigation + Active Scroll Spy + Mobile Drawer**: Verifies mobile drawer state does not desynchronize active section indicators.
3. **Contact Form Submission + Atomic Storage File Creation**: Verifies that submitting an inquiry when `data/contacts.json` is missing automatically initializes the directory and file without error.
4. **Concurrent Inquiries + DataStore Race Condition Resistance**: Verifies multiple simulated concurrent POST submissions are appended atomically without JSON corruption.
5. **Interactive Industry Tab Switching + UI Preview Coordination**: Verifies selecting Hospitality, Beauty, Legal, Retail, or Enterprise displays the matching verified architecture (CafeOS, Off The Grid Gym, Rupnagar Tailors, VyaparOS, FacultyOS).
6. **AI Systems Visualization + prefers-reduced-motion**: Verifies that when reduced motion is preferred, telemetry cards and nodes remain accessible while continuous CSS/SVG animations are suppressed.
7. **Verified Projects Filter Tabs + External Link Security**: Verifies all project cards carry authentic GitHub URLs, status badges, and secure external link attributes (`target="_blank"`, `rel="noopener noreferrer"`).

---

### Tier 4: Real-World Application Scenarios (Realistic User Journeys)
Tier 4 executes complete multi-step journeys simulating actual visitors:

1. **Scenario 1: Enterprise Prospect Evaluation & Consultation Flow**:
   - User lands on Hero $\rightarrow$ observes telemetry $\rightarrow$ clicks "Explore Our Solutions" $\rightarrow$ switches industry tab to "Hospitality" $\rightarrow$ examines CafeOS architecture $\rightarrow$ scrolls to Contact form $\rightarrow$ fills valid inquiry $\rightarrow$ submits and verifies 200 OK + `inq_...` ID.
2. **Scenario 2: Technical Architect Audit & GitHub Verification Flow**:
   - User inspects Engineering Philosophy $\rightarrow$ reviews 4 principles $\rightarrow$ scrolls to Verified Projects $\rightarrow$ filters by "AI & Automation" $\rightarrow$ inspects MONOLITH and FacultyOS repositories $\rightarrow$ verifies authentic repository URLs and status tags.
3. **Scenario 3: Mobile Visitor On-The-Go Discovery Flow**:
   - User opens site on 375px viewport $\rightarrow$ verifies 0 horizontal overflow $\rightarrow$ opens mobile hamburger menu $\rightarrow$ taps "Services" $\rightarrow$ reviews 6 services $\rightarrow$ clicks "Initiate Consultation" $\rightarrow$ navigates to contact form.
4. **Scenario 4: Screen Reader / Accessibility User Navigation Flow**:
   - User navigates through landmark hierarchy (`header`, `nav`, `main`, `section`, `footer`) $\rightarrow$ verifies explicit `<label htmlFor="...">` associations on all 7 form inputs $\rightarrow$ triggers invalid form submission $\rightarrow$ verifies error feedback in `aria-live` region.
5. **Scenario 5: High-Concurrency Burst & Storage Integrity Flow**:
   - Rapid multi-client submission burst simulating multiple prospective clients submitting inquiries within milliseconds $\rightarrow$ verifies all submissions exist in `data/contacts.json` with valid timestamps and IDs.

---

## 4. Requirements Traceability Matrix

| Requirement | Description | Verified By Test File | Verification Method |
| :--- | :--- | :--- | :--- |
| **R1** | Modern Neumorphic 2.0 Design System | `01-tokens-typography-contrast.test.mjs` | Tailwind config, CSS variables, dual box-shadow tokens, inset shadows |
| **R1** | Typography (Space Grotesk, Inter, IBM Plex Mono)| `01-tokens-typography-contrast.test.mjs` | `layout.tsx` font definitions, Tailwind font families |
| **R1** | WCAG 2.1 AA/AAA Contrast Compliance | `01-tokens-typography-contrast.test.mjs` | Mathematical luminance calculation ($\ge 14:1$ headings, $\ge 4.5:1$ body) |
| **R2 §01** | Navigation (Sticky, Spy, Mobile Menu) | `03-navigation-hero.test.mjs` | Floating pill navbar, anchor links, drawer controls |
| **R2 §02** | Hero Experience & Interactive AI Simulation | `03-navigation-hero.test.mjs` | Headline, CTAs, trust statement, orchestrator nodes, data pulses |
| **R2 §03** | Capability Overview (3 Distinct Compositions)| `04-capabilities-services.test.mjs` | Intelligence tree, Automation pipeline, Engineering terminal |
| **R2 §04** | Services (6 Premium Offerings) | `04-capabilities-services.test.mjs` | AI Agents, Automation, Platforms, Web, Apps, Infrastructure |
| **R2 §05** | Industry Solutions (5-Tab Selector) | `05-solutions-philosophy.test.mjs` | 5 industries, dynamic facets, verified previews (CafeOS, VyaparOS, etc.) |
| **R2 §06** | Engineering Philosophy (4 Principles + Diagram)| `05-solutions-philosophy.test.mjs` | Business-First, Purpose-Built, Intelligent, Built to Scale, diagram |
| **R2 §07** | Projects Showcase (4 Primary + 6 Secondary) | `06-projects-showcase.test.mjs` | Off The Grid Gym, CafeOS, Rupnagar Tailors, VyaparOS + 6 secondary repos |
| **R2 §08** | Process (5-Stage Connected Timeline) | `07-process-conversion-footer.test.mjs` | Discover, Architect, Engineer, Deploy, Evolve stages |
| **R2 §09** | Conversion Section (Dark Neumorphic Surface)| `07-process-conversion-footer.test.mjs` | `#171C29` surface, headline, CTAs, trust badges |
| **R2 §10** | Contact Form (7 Fields, Real Validation) | `08-contact-form-api.test.mjs` | 7 required fields, Zod schema, accessible error alerts |
| **R2 §11** | Footer (Brand, Links, GitHub, Copyright) | `07-process-conversion-footer.test.mjs` | GitHub URL `https://github.com/Gulshan-Singh-gs`, copyright, navigation |
| **R3** | Responsiveness & Zero Horizontal Overflow | `11-responsive-overflow-boundaries.test.mjs` | Viewports 320px to 1440px, layout bounds, wrap utilities |
| **R3** | SEO, OpenGraph, Sitemap, Robots | `09-seo-accessibility.test.mjs` | `sitemap.ts`, `robots.ts`, OpenGraph metadata, JSON-LD schema |
| **R4** | Functional Contact Backend Integration | `08-contact-form-api.test.mjs` | POST `/api/contact`, atomic JSON persistence in `data/contacts.json` |
| **R5** | Interaction Design & Reduced Motion | `09-seo-accessibility.test.mjs` | CSS `@media (prefers-reduced-motion: reduce)`, animation gates |

---

## 5. Test Execution Guide

### 5.1 Running the Complete Test Suite
Run the unified test runner:
```bash
node tests/runner.mjs
```

### 5.2 Running Individual Test Tiers
Run specific test files with Node.js built-in test runner:
```bash
# Tier 1: Feature Coverage
node --test tests/tier1-features/*.test.mjs

# Tier 2: Boundaries & Edge Cases
node --test tests/tier2-boundaries/*.test.mjs

# Tier 3: Cross-Feature Combinations
node --test tests/tier3-combinations/*.test.mjs

# Tier 4: User Journeys
node --test tests/tier4-scenarios/*.test.mjs
```

### 5.3 Runner Output Format
The test runner reports:
- Test file and test case names
- Tier-by-tier grouping
- Pass/Fail indicators with execution timing
- Comprehensive summary with total assertions, pass counts, fail counts, and duration
- Exit code `0` on 100% pass; non-zero exit code on failures.
