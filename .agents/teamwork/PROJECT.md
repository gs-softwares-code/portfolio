# Project: GS-Softwares Premium Business Website

## Architecture
- **Framework**: Next.js 15.1.7 (or 16.4.5) with App Router, React 19, TypeScript
- **Styling**: Tailwind CSS with custom Neumorphic 2.0 dual box-shadow tokens and 1px perimeter lighting
- **Typography**: Space Grotesk (Headings), Inter (Body), IBM Plex Mono (Technical labels and metrics)
- **Palette**: Neutral background & surface `#E9EDF2`, primary text `#151A23`, secondary text `#687386`, accent `#526FE5`, dark contrast surface `#171C29`, success `#36A783`
- **Contact Backend**: Native App Router Route Handler (`src/app/api/contact/route.ts`) with Zod validation and atomic persistence to `data/contacts.json`
- **State Management & Interactions**: Clean React client components for interactive visualizers, tab switchers, and drawers; server components for static sections and SEO metadata
- **Quality & SEO**: Dynamic XML Sitemap (`sitemap.ts`), Robots (`robots.ts`), OpenGraph & Twitter Cards, JSON-LD Schema (`Organization`, `ProfessionalService`), zero console errors, zero-error production build (`next build`)

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Neumorphic 2.0 Tokens & Palette | Palette (`#E9EDF2`, `#151A23`, `#687386`, `#526FE5`, `#171C29`, `#36A783`), dual drop shadows, recessed inset shadows, dark neumorphic shadows | M1 | R1, Survey |
| 2 | Typography Hierarchy | Google Fonts (`next/font`): Space Grotesk, Inter, IBM Plex Mono with strict responsive scale | M1 | R1, Survey |
| 3 | Core Neumorphic UI Primitives | Reusable components: NeumorphicButton, NeumorphicCard, NeumorphicInput, NeumorphicSelect, StatusBadge | M1 | R1, Survey |
| 4 | Base Scaffolding & Layout | Clean Next.js + Tailwind + TypeScript setup with global CSS, accessibility landmarks, and WCAG contrast conformance | M1 | R1, R3 |
| 5 | Section 01: Floating Sticky Navbar | Sticky floating navigation with GS-Softwares brand wordmark, desktop links, CTA, active section spy, mobile drawer | M2 | R2 §01 |
| 6 | Section 02: Asymmetric Hero Layout | Asymmetric layout with headline "We Engineer Intelligence. You Build the Future.", subtext, primary/secondary CTAs, trust statement | M2 | R2 §02 |
| 7 | Section 02: Interactive AI Simulation | Central animated AI systems visualizer with connected agent nodes, central orchestrator, data flow pulses, telemetry, pause/reduce-motion | M2 | R2 §02, R5 |
| 8 | Section 03: Capability Overview | 3 distinct capability pillars (Intelligence, Automation, Engineering) using 3 varied visual compositions (wide canvas, timeline, terminal) | M3 | R2 §03 |
| 9 | Section 04: Premium Services | 6 service presentations (AI Agent Dev, Business Automation, Custom Platforms, Website Engineering, App Dev, Digital Infrastructure) | M3 | R2 §04 |
| 10 | Section 05: Industry Solutions | Interactive 5-industry selector (Hospitality, Beauty & Wellness, Legal & Professional, Retail & Commerce, Growing Businesses) | M3 | R2 §05 |
| 11 | Section 06: Engineering Philosophy | 4 principles (Business-First, Purpose-Built, Intelligent by Design, Built to Scale) with connected system diagram | M3 | R2 §06 |
| 12 | Section 07: Primary Projects Showcase | In-depth showcase for 4 verified primary repos (Off The Grid Gym, CafeOS, Rupnagar Tailors, VyaparOS) with authentic tech stacks, UI previews, GitHub links | M4 | R2 §07 |
| 13 | Section 07: Additional Projects Gallery | Extensible gallery for 6 secondary verified repos (FacultyOS, KrishiOS, MONOLITH, GuardPayOS, CampusOS, Inventory) with authentic status tags | M4 | R2 §07 |
| 14 | Section 08: Process Timeline | 5-stage engineering journey (Discover, Architect, Engineer, Deploy, Evolve) on animated connected timeline with progress indicators | M4 | R2 §08 |
| 15 | Section 09: Conversion Section | High-contrast dark neumorphic surface (`#171C29`) with headline "Your Next Competitive Advantage Starts With Better Engineering." and CTAs | M4 | R2 §09 |
| 16 | Section 11: Complete Brand Footer | Brand identity, concise description, navigation, service links, industry links, GitHub profile link (https://github.com/Gulshan-Singh-gs), copyright | M4 | R2 §11 |
| 17 | Section 10: Professional Contact Form | 7 fields (Full Name, Business Name, Email, Phone, Industry, Service, Project Description) with validation, accessibility, loading/success states | M5 | R2 §10, R4 |
| 18 | Backend Contact API & Persistence | POST `/api/contact` endpoint with Zod schema validation, status codes (200, 400, 500), and atomic append to `data/contacts.json` | M5 | R4 |
| 19 | SEO, Metadata & Accessibility | Dynamic `sitemap.ts`, `robots.ts`, OpenGraph card, JSON-LD Schema (`Organization`, `ProfessionalService`), `prefers-reduced-motion` compliance | M5 | R3, R5 |
| 20 | E2E Test Suite (Tiers 1-4) | Comprehensive opaque-box test suite verifying all 11 sections, responsive layout, form validation, backend persistence, and contrast | M6 | Acceptance Criteria |
| 21 | Adversarial Hardening (Tier 5) | Challenger stress testing of edge cases, rapid interactions, network latency, malformed inputs, and keyboard navigation | M6 | Project Pattern Final |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Foundation & Neumorphic 2.0 Design Core | Features 1, 2, 3, 4 | none | DONE |
| M2 | Navigation, Hero & Interactive AI Visualizer | Features 5, 6, 7 | M1 | DONE |
| M3 | Core Narrative & Solution Architecture | Features 8, 9, 10, 11 | M1 | PLANNED |
| M4 | Authentic Projects Showcase, Process & Conversion | Features 12, 13, 14, 15, 16 | M1 | PLANNED |
| M5 | Backend Contact API, Interactive Form & SEO | Features 17, 18, 19 | M1 | PLANNED |
| M6 | Final Milestone: E2E Test Suite Pass & Adversarial Hardening | Features 20, 21 | M1, M2, M3, M4, M5, TEST_READY.md | PLANNED |

## Interface Contracts
### Design Tokens (`tailwind.config.ts` & `globals.css`)
- Colors: `bg.base` (`#E9EDF2`), `text.primary` (`#151A23`), `text.secondary` (`#687386`), `brand.accent` (`#526FE5`), `bg.dark` (`#171C29`), `brand.success` (`#36A783`).
- Shadows: `shadow-neu-flat` (`8px 8px 20px rgba(163,177,198,0.38), -8px -8px 20px rgba(255,255,255,0.85)`), `shadow-neu-pressed` (`inset 4px 4px 8px rgba(163,177,198,0.45), inset -4px -4px 8px rgba(255,255,255,0.85)`), `shadow-neu-dark-flat` (`6px 6px 18px rgba(0,0,0,0.55), -6px -6px 18px rgba(35,42,60,0.35)`).

### Contact API Contract (`/api/contact`)
- Method: `POST`
- Payload:
  ```typescript
  interface ContactInquiryPayload {
    fullName: string;        // min 2, max 100
    businessName: string;    // min 2, max 100
    email: string;           // valid email format
    phone?: string;          // optional, regex /^[\d\+\-\s\(\)]{7,20}$/
    industry: 'hospitality' | 'beauty-wellness' | 'legal-professional' | 'retail-commerce' | 'growing-businesses' | 'other';
    service: 'ai-agents' | 'business-automation' | 'custom-platforms' | 'website-engineering' | 'application-development' | 'digital-infrastructure' | 'other';
    description: string;     // min 10, max 2000
  }
  ```
- Responses:
  - 200 OK: `{ "success": true, "message": "Inquiry received...", "submissionId": "inq_..." }`
  - 400 Bad Request: `{ "success": false, "message": "Validation failed", "errors": [...] }`
  - 500 Internal Error: `{ "success": false, "message": "Server error" }`
- Storage: Append to `data/contacts.json` with generated UUID and UTC ISO timestamp.

### Verified Projects Data Contract (`src/data/projects.ts`)
- Schema:
  ```typescript
  interface ShowcaseProject {
    id: string;
    name: string;
    tagline: string;
    description: string;
    category: 'Flagship Platform' | 'Commercial Operations' | 'Bespoke Commerce' | 'Enterprise Ledger' | 'Academic Infrastructure' | 'AgriTech Intelligence' | 'Autonomous Engine' | 'FinTech Security';
    status: 'Live Product' | 'Production Prototype' | 'In Active Development';
    githubUrl: string;
    liveUrl?: string;
    locationBadge?: string;
    techStack: string[];
    keyModules: string[];
    architectureHighlights: string[];
    uiPreview: {
      type: 'dashboard' | 'pos' | 'mobile' | 'terminal' | 'ledger';
      primaryMetric?: string;
      metricLabel?: string;
      screenElements: string[];
    };
  }
  ```

## Code Layout
```
c:\Users\Code66\.antigravity-ide\Persona\portfolio\GS-Softwares/
├── .agents/
├── data/
│   └── contacts.json
├── public/
│   ├── favicon.ico
│   └── og-image.png
├── src/
│   ├── app/
│   │   ├── api/contact/route.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/
│   │   ├── ai-visualization/
│   │   │   ├── AgentNode.tsx
│   │   │   ├── DataPulsePath.tsx
│   │   │   └── HeroVisualization.tsx
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/
│   │   │   ├── Section01Hero.tsx
│   │   │   ├── Section02Capabilities.tsx
│   │   │   ├── Section03Services.tsx
│   │   │   ├── Section04Solutions.tsx
│   │   │   ├── Section05Philosophy.tsx
│   │   │   ├── Section06Projects.tsx
│   │   │   ├── Section07Process.tsx
│   │   │   ├── Section08Conversion.tsx
│   │   │   └── Section09Contact.tsx
│   │   └── ui/
│   │       ├── NeumorphicButton.tsx
│   │       ├── NeumorphicCard.tsx
│   │       ├── NeumorphicInput.tsx
│   │       ├── NeumorphicSelect.tsx
│   │       └── StatusBadge.tsx
│   ├── data/
│   │   └── projectsData.ts
│   ├── lib/
│   │   ├── contactStore.ts
│   │   ├── validations.ts
│   │   └── utils.ts
│   └── types/
│       ├── contact.ts
│       └── project.ts
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

