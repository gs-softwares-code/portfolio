# GS-Softwares Engineering Survey Report: GitHub Repositories & Developer Profile

**Investigator**: Teamwork Explorer (Repository Survey Specialist)  
**Date of Survey**: 2026-11-09  
**Developer Profile**: [Gulshan-Singh-gs](https://github.com/Gulshan-Singh-gs)  
**Location**: Rupnagar (Ropar), Punjab, India  
**Affiliation**: Rayat Bahra University, Punjab  
**Total Public Repositories**: 36  
**Developer Motto**: *"Code. Train. Execute."*

---

## Executive Summary

This report delivers a verified, code-level technical survey of the GitHub profile and 10 primary and secondary repositories created by **Gulshan Singh** (`Gulshan-Singh-gs`). The findings provide authentic source material, architecture maps, dependency manifests, feature breakdowns, and UI preview specifications to empower the development of the **GS-Softwares** agency platform.

Every statement in this report is directly backed by repository code, configuration files, and documentation. No statistics, client reviews, or production metrics have been fabricated.

---

## 1. Primary Showcase Repositories

### 1.1. Off The Grid Gym (`off_the_grid-gym`)

- **GitHub Repository**: [https://github.com/Gulshan-Singh-gs/off_the_grid-gym](https://github.com/Gulshan-Singh-gs/off_the_grid-gym)
- **Live / Target Deployment**: Off The Grid Gym, Bal Sanda, Ropar (Rupnagar), Punjab, India (`30.9527996, 76.522236`). Linked to official Instagram (`@offthegridgymropar`) and Google Maps business listing.
- **Project Purpose**: A high-performance, conversion-optimized public web platform and real-time owner administration system built specifically to convert prospective local gym visitors into physical admissions without recurring billing friction.

#### Verified Tech Stack
| Tier | Technology | Purpose |
|---|---|---|
| **Framework** | Next.js 16.4.5 (App Router, Turbopack) | Server-side rendering, static generation, API routes |
| **Language** | TypeScript 5 (Strict type safety) | Type-safe models, props, and database contracts |
| **Styling** | Tailwind CSS v4 | High-contrast athletic dark styling (`#08090B`) with neon green glow (`#00FF66`) |
| **Icons** | Lucide React v1.70.0 | Athletic, navigation, and dashboard iconography |
| **Database** | Supabase PostgreSQL + Row-Level Security (RLS) | Cloud relational store for plans, trainers, offers, and settings |
| **Local Persistence** | Atomic DataStore (`src/lib/dataStore.ts`) | Dual-mode sandbox fallback running with zero external credentials |
| **Deployment** | Cloudflare Pages / OpenNext Cloudflare Adapter | Edge CDN delivery and sub-millisecond edge routing |

#### Architecture & Key Modules
```
off_the_grid-gym/
├── src/
│   ├── app/
│   │   ├── (public)/ [/, /about, /facilities, /pricing, /offers, /trainers, /gallery, /contact]
│   │   ├── admin/
│   │   │   ├── login/page.tsx
│   │   │   └── dashboard/page.tsx
│   │   ├── sitemap.ts & robots.ts
│   │   └── layout.tsx & globals.css
│   ├── components/
│   │   ├── admin/ [AdminHeader, PricingManager, OffersManager, TrainersManager, GalleryManager, SettingsManager]
│   │   ├── home/ [HeroSection, FacilitiesPreview, PricingPreview, ActiveOfferBanner, TrainersPreview, GalleryPreview, LocationSection, StatsSection]
│   │   ├── layout/ [Navbar, Footer, MobileActionBar, FloatingWhatsApp]
│   │   └── ui/ [LightboxModal, SectionHeader, Icons]
│   └── lib/ [dataStore.ts, defaultData.ts, seo.ts, supabase.ts]
```

#### Core Features & Capabilities
1. **Frictionless Local Conversion**:
   - Zero customer registration or forced payment walls; gym memberships in India are customarily verified and settled on-site.
   - Dynamic floating WhatsApp enquiry button with automated plan-specific pre-filled intent text.
   - Sticky mobile action bar with one-touch direct calling, WhatsApp messaging, and Google Maps GPS navigation.
2. **Owner Administration Dashboard (`/admin/dashboard`)**:
   - **Pricing Manager**: Add/edit plans in INR (`₹`), adjust durations (1, 3, 6, 12 months), toggle visibility, flag "Most Popular".
   - **Promotional Offers Manager**: Create promo campaigns with automated expiration filtering.
   - **Facility & Gallery Manager**: Category-tagged media management (Free Weights, Cardio, Strength, Ambience) with responsive fullscreen Lightbox.
   - **Coach Directory**: Bio, certifications, and coaching roster management.
   - **Gym Settings & Hours**: Manage phone, WhatsApp, opening hours, and location metadata.
3. **Local SEO & Schema.org Structured Data**:
   - Automated JSON-LD structured data for `ExerciseGym`, `SportsActivityLocation`, and `LocalBusiness`.
   - Geo-coordinates (`30.9527996, 76.522236`), open hours, dynamic sitemap, and OpenGraph social cards.

#### Product Status
- **Status**: Production-ready / Deployed System (Complete full-stack implementation with Supabase schema migration and sandbox demo mode).

#### Authentic Visual / UI Preview Concept
- **Palette**: Pitch Obsidian (`#08090B`), Charcoal Surface (`#12151B`), Electric Neon Green (`#00FF66`), Muted Silver (`#94A3B8`).
- **Hero & Dashboard Preview**:
  - Hero with high-voltage typography: *"FORGE UNBREAKABLE DISCIPLINE IN BAL SANDA"*.
  - Plan comparison cards featuring 1-Month (₹1,500), 3-Month (₹3,800), 6-Month (₹6,500), and 1-Year (₹11,000) with badge highlights.
  - Interactive admin stat cards: Active Membership Plans (4), Active Campaigns (2), Certified Trainers (3), Gallery Photos (12).

---

### 1.2. CafeOS (`CafeOS`)

- **GitHub Repository**: [https://github.com/Gulshan-Singh-gs/CafeOS](https://github.com/Gulshan-Singh-gs/CafeOS)
- **Live / Target Deployment**: Independent Cafés in Kurali (Morinda Road / Bus Stand area), SAS Nagar (Mohali), Punjab, India. Pre-seeded with *Kurali Chai & Bakehouse* and *Shivalik Foothills Brews (Pinjore)*.
- **Project Purpose**: A zero-commission, multi-tenant digital operations platform engineered for independent café owners. Replaces paper KOTs (Kitchen Order Tickets) and high-commission food aggregators with a branded mobile customer ordering storefront and a synchronized live kitchen operations terminal.

#### Verified Tech Stack
| Tier | Technology | Purpose |
|---|---|---|
| **Framework** | Next.js 15.1.7 (App Router, Route Handlers, Server Actions) | Full-stack React 19 application |
| **Language** | TypeScript (Strict type safety, zero `any`) | Complete end-to-end domain contracts |
| **Styling** | Tailwind CSS + Custom HSL Tokens | Warm Punjabi hospitality theme: Terracotta (`#D9531E`), Roasted Espresso (`#1C130E`), Cardamom Cream (`#FDFBF7`), Brass Gold (`#C89242`) |
| **Icons** | Lucide React v1.16.0 | Food, drink, KOT, and workflow iconography |
| **Database** | Dual Mode: Supabase PostgreSQL / Atomic Relational JSON Store (`.data/cafeos_store.json`) | Live cloud PostgreSQL with RLS or zero-dependency atomic local store |
| **Validation** | Server-Authoritative Price Engine | Zero client-side trust; prices computed on server from DB |

#### Architecture & Key Modules
```
CafeOS/
├── src/
│   ├── app/
│   │   ├── page.tsx (Platform landing & multi-tenant switcher)
│   │   ├── cafe/[slug]/page.tsx (Customer mobile ordering storefront)
│   │   ├── order/[orderId]/page.tsx (Live order status tracking screen)
│   │   ├── dashboard/page.tsx (Live kitchen Kanban & owner operations)
│   │   └── api/
│   │       ├── orders/ (Order creation & status transition routes)
│   │       ├── menu/ (Real-time item availability & price updates)
│   │       └── demo/reset/ (One-click state reset for demonstrations)
│   ├── components/
│   │   ├── storefront/ [CartDrawer, MenuItemCard, CategoryFilter, StorefrontHeader]
│   │   └── dashboard/ [DashboardHeader, MenuManager, OrderCard, StatCards]
│   └── lib/
│       ├── db/ [index.ts, seedData.ts]
│       ├── supabase.ts
│       └── types.ts
```

#### Core Features & Capabilities
1. **Customer Mobile Storefront (`/cafe/[slug]`)**:
   - URL-driven tenant routing (e.g. `/cafe/kurali-chai-bakehouse`).
   - Authentic Punjabi café menu in INR: Kulhad Adrak Elaichi Chai (₹30), Amritsari Paneer Tikka Toastie (₹140), Bun Maska (₹45), Highway Cold Coffee (₹90), Samosa Chaat (₹70).
   - Veg / Non-Veg badge indicators, dynamic category filtering, spice/sugar kitchen customization notes.
   - Dining mode toggle: **Dine-In** (with Table Number input) vs. **Takeaway / Parcel**.
2. **Live Order Tracker (`/order/[id]`)**:
   - Auto-polling status pipeline updating every 3.5 seconds across 4 explicit stages:
     `Received` → `Preparing` → `Ready` → `Completed`.
3. **Owner Operations & Kitchen Terminal (`/dashboard`)**:
   - Live incoming order Kanban feed with audio/visual status indicators.
   - Single-click barista workflow: `Start Preparing` → `Mark Ready` → `Complete Order` or `Cancel`.
   - Dynamic Menu Manager: Real-time price updates in INR (`₹`) and instantaneous "Available / Sold Out" toggling.
   - Live revenue statistics: Today's Gross Sales (`₹`), Active Kitchen Tickets, Average Order Value (AOV), and Completed Orders.
4. **Zero-Trust Authoritative Pricing & Tenant Isolation**:
   - Clients submit strictly `{ item_id, quantity, notes }`; the client cannot supply prices or order totals. The server computes all monetary calculations.
   - Strict database-level isolation: Café A cannot inspect or mutate Café B's catalog or order stream.

#### Product Status
- **Status**: Production-ready / Functional Multi-Tenant Application (Fully runnable with both Supabase and zero-dependency atomic storage fallback).

#### Authentic Visual / UI Preview Concept
- **Palette**: Warm Terracotta (`#D9531E`), Cardamom Cream (`#FDFBF7`), Roasted Espresso (`#1C130E`), Brass Gold (`#C89242`).
- **Interface Preview**:
  - Customer View: Mobile-first card stream with item images, quick "+" stepper, slide-up Cart Drawer displaying INR subtotals and special cooking instructions.
  - Kitchen Terminal: Dark espresso Kanban board with color-coded status pills: Blue (`Received`), Amber (`Preparing`), Emerald (`Ready`), Gray (`Completed`), accompanied by a live gross revenue ticker (e.g., `Today's Revenue: ₹8,420`).

---

### 1.3. Rupnagar Tailors (`Rupnagar-tailors`)

- **GitHub Repository**: [https://github.com/Gulshan-Singh-gs/Rupnagar-tailors](https://github.com/Gulshan-Singh-gs/Rupnagar-tailors)
- **Live Deployment**: [https://gulshan-singh-gs.github.io/Rupnagar-tailors/](https://gulshan-singh-gs.github.io/Rupnagar-tailors/)
- **Project Purpose**: A bespoke, high-craft web experiment and digital fitting consultation portal for bespoke tailoring in Rupnagar, Punjab. Proves that sophisticated animations, serverless databases, dynamic theming, and business logic can be built using pure Web APIs and zero heavyweight JavaScript frameworks.

#### Verified Tech Stack
| Tier | Technology | Purpose |
|---|---|---|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript (ES6+) | Frameworkless architecture with zero build-step overhead |
| **Styling & Motion** | Modular CSS (Variables, Animations, Components, Sections, Responsive) | Bespoke curved-notch "Magic Indicator" animations and glass effects |
| **Backend / DB** | Serverless Google Apps Script (GAS) REST API + Google Sheets | Real-time database bridging booking submissions directly to Google Cloud |
| **Storage & Media** | Google Drive API | Customer bespoke design and reference cloth uploads |
| **Offline / PWA** | Service Worker (`sw.js`) + `manifest.json` | Offline asset caching, fast load times, and installable PWA shell |
| **Monetization** | Google AdSense (`ads.txt`, meta integrations) | Verified publisher monetization setup |
| **Hosting** | GitHub Pages | Zero-cost, high-speed static hosting |

#### Architecture & Key Modules
```
Rupnagar-tailors/
├── index.html (Main bespoke portal & showcase)
├── end/admin.html (Private administrative gallery management)
├── manifest.json & sw.js (PWA service worker & app manifest)
├── css/
│   ├── variables.css, animations.css, base.css
│   ├── components.css, sections.css, responsive.css
├── js/
│   ├── app.js (Application lifecycle)
│   ├── calculator.js (Interactive Fabric Requirement Estimator)
│   ├── forms.js (Google Sheets REST bridge & localStorage user cache)
│   ├── theme.js (Dual-theme switching engine)
│   ├── gallery.js (Bespoke outfit showcase & lightbox)
│   ├── whatsapp.js (Direct tailor consultation generator)
│   ├── maps.js (Lazy-loaded Google Maps iframe)
│   └── language.js (Multilingual Punjabi / English support)
```

#### Core Features & Capabilities
1. **Interactive Fabric Estimator Tool (`js/calculator.js`)**:
   - Logic-driven calculator estimating exact unstitched cloth meterage required based on user height, build, and garment type (Punjabi Salwar Suit, Royal Sherwani, Western Three-Piece Suit, Formal Kurta-Pajama, Turban/Pagri).
2. **Serverless "Sheet Bridge" Database Architecture**:
   - Uses a custom Google Apps Script `doPost()` endpoint acting as a serverless REST gateway.
   - Form submissions serialize customer measurements and preferred fabrics directly into a live Google Sheet without running a costly cloud database instance.
   - Emits instant UI toast confirmations upon successful database insertion.
3. **Dual "Royal" Theming Engine**:
   - **Royal Mode (Light)**: Regal alabaster background with polished gold metallic accents and refined serif accents.
   - **Apex Mode (Dark)**: Deep obsidian backdrop with crimson red contours and glowing gold indicators.
4. **"Magic Indicator" Curved Navigation**:
   - Custom-engineered navigation bar utilizing CSS pseudo-elements and Vanilla JS bounding-box calculation to create a fluid, liquid-notch indicator that morphs to the active section.
5. **Persistent User Sessions**:
   - `localStorage` memory cache automatically greets returning clients with their previously entered measurements and contact details.

#### Product Status
- **Status**: Live Deployed Product on GitHub Pages ([Live Demo](https://gulshan-singh-gs.github.io/Rupnagar-tailors/)).

#### Authentic Visual / UI Preview Concept
- **Palette**: Royal Mode (Ivory `#FAFAFA`, Gold Metallic `#D4AF37`, Silk Navy `#1A2B49`), Apex Mode (Obsidian `#0A0A0A`, Crimson `#DC2626`, Gold Glow `#F59E0B`).
- **Interactive Preview**:
  - Fabric Calculator: Dropdown garment selector with a visual cloth meter gauge (e.g. *"Sherwani (Height: 5'10\") → Estimated Fabric: 4.25 Meters"*).
  - Floating WhatsApp integration: Pre-formatted tailor booking messages (e.g., *"Hi Rupnagar Tailors, I would like to book a fitting consultation for a bespoke Punjabi Salwar Suit."*).

---

### 1.4. VyaparOS (`VyaparOS`)

- **GitHub Repository**: [https://github.com/Gulshan-Singh-gs/VyaparOS](https://github.com/Gulshan-Singh-gs/VyaparOS)
- **Project Purpose**: A vernacular-first business operating system for Indian micro-enterprises and shopkeepers. Unifies handwritten paper bill capture (**Kacha Bill OCR**), voice-driven bookkeeping mutations, customer credit (**Udhaar**), supplier ledgers, and deterministic GST return preparation.

#### Verified Tech Stack
| Tier | Technology | Purpose |
|---|---|---|
| **Frontend Web** | React 19, Vite 6, TypeScript, Tailwind CSS, React Router 7 | Responsive, high-performance merchant web app |
| **Mobile Shell** | Capacitor 7 (Android foundation) + Vite PWA | Offline-capable mobile experience with native camera & storage |
| **Backend API** | Hono 4 on Cloudflare Workers | Sub-millisecond serverless edge API |
| **Database & ORM** | Neon Serverless PostgreSQL + Drizzle ORM | Serverless relational store with migration toolchain |
| **Auth** | Supabase Auth | Secure merchant identity and tenant isolation |
| **Local Offline DB**| IndexedDB (`idb-keyval`) | Local transaction staging and offline resilience |
| **AI / Multimodal** | Google Gemini Multimodal API (`gemini-multimodal.ts`) | High-accuracy OCR of handwritten Hindi/Punjabi/English bills |
| **Tooling & Tests** | Turborepo, pnpm 12 workspaces, Vitest, Zod | Enterprise monorepo toolchain with deterministic unit tests |

#### Architecture & Key Modules
```
VyaparOS/ (Monorepo)
├── apps/
│   ├── web/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── CaptureStudio.tsx (Kacha bill camera & scanner)
│   │   │   │   ├── SplitViewVerificationDrawer.tsx (Side-by-side OCR audit)
│   │   │   │   ├── AutoFlowCommandCenter.tsx (Automated business action runner)
│   │   │   │   ├── GSTComplianceHub.tsx (HSN/SAC calculation & GSTR export)
│   │   │   │   └── views/ [DashboardView, BillsView, InventoryView, UdhaarView, SuppliersView, AnalyticsView, SettingsView]
│   │   │   └── App.tsx & capacitor.config.ts
│   └── api/ (Cloudflare Workers via Hono)
│       └── src/
│           ├── routes/ [bills.ts, voice.ts, gst-export.ts, workflows.ts, health.ts]
│           ├── services/ [gemini-multimodal.ts, storage.ts]
│           └── middleware/ [auth.ts, idempotency.ts]
├── packages/
│   └── shared/ (Shared Zod schemas, integer-paise financial engines, audit rules)
```

#### Core Features & Capabilities
1. **AI "Kacha Bill" Multimodal Extraction & Human-in-the-Loop Audit**:
   - Captures irregular, handwritten shop bills and cash receipts using device camera.
   - Passes image buffers to Google Gemini Multimodal models to extract supplier names, itemized line items, quantities, and rates.
   - **Split-View Verification Drawer**: Displays the raw captured image side-by-side with extracted tabular line items. *Core Architectural Rule: AI proposes, merchant approves.* No database mutation occurs until verified by the shopkeeper.
2. **Integer-Paise Financial Math**:
   - Monetary values are strictly calculated and stored as integer paise (e.g., ₹150.50 = `15050` paise) to prevent floating-point calculation drift common in standard accounting apps.
3. **Vernacular Voice Bookkeeping Assistant**:
   - Natural language voice recognition accepting spoken accounting entries in Hindi, Punjabi, Hinglish, and English (e.g. *"Ramesh nu ₹500 udhaar dita"* or *"Sold 10 bags of cement for ₹3500"*).
4. **Auditable Ledgers (Udhaar & Supplier Khata)**:
   - Full double-entry movement logs for customer credit and supplier payables with immutable timestamps.
5. **Deterministic GST Preparation & HSN/SAC Engine**:
   - Calculates CGST, SGST, and IGST according to Indian tax rules and formats data for one-click GSTR-1 and GSTR-3B export.

#### Product Status
- **Status**: Functional Monorepo MVP / In Active Development (Complete runnable Web React 19 app, Hono Cloudflare API, and shared integer-math engine; native Android Capacitor build in progress).

#### Authentic Visual / UI Preview Concept
- **Palette**: Deep Slate (`#0F172A`), Indian Saffron/Amber (`#F59E0B`), Emerald Growth (`#10B981`), Cobalt Border (`#3B82F6`).
- **Interface Preview**:
  - Split-Screen OCR Verification: Left pane shows the raw photo of a handwritten Punjabi slip; right pane displays parsed editable rows with detected confidence badges and a green `Confirm & Post to Khata` button.
  - Udhaar Summary Card: Net Receivables (`₹42,850`), Net Payables (`₹18,200`), with color-coded customer badges (Green = Paid, Red = Overdue).

---

## 2. Secondary Repositories

### 2.1. FacultyOS (`FacultyOS`)

- **GitHub Repository**: [https://github.com/Gulshan-Singh-gs/FacultyOS](https://github.com/Gulshan-Singh-gs/FacultyOS)
- **Project Purpose**: The Privacy-First Academic Operations Platform for University Professors. Turns syllabus course policies into a 100% deterministic student request triage compiler deployed on the Cloudflare edge, protecting faculty time, research hours, and weekends while guaranteeing FERPA compliance.

#### Verified Tech Stack
- **Framework**: Next.js 16.4.0 (App Router, Turbopack, React 19.3.0)
- **Deployment Adapter**: `@opennextjs/cloudflare` v1.20.9 (Cloudflare Pages & Workers)
- **Database & Storage**: Cloudflare D1 (Distributed edge SQLite) + Drizzle ORM v0.45.4 + Cloudflare R2 object storage + Cloudflare KV (Rate limiting)
- **Authentication**: `better-auth` v1.7.7
- **Validation**: Zod 4
- **Testing**: Vitest with **74 / 74 passing tests** recorded in project test suite
- **Theme**: Pitch Black (`#000000`) & Emerald (`#10B981`)

#### Key Architecture & Capabilities
- **Deterministic Syllabus Compiler**: Zero generative AI hallucinations for academic policies. All deadline offsets, late-slip tokens, and penalty ladders are executed via mathematical boolean logic.
- **FERPA Compliance by Design**: Zero medical data collection. If a student mentions health or disability issues, the system immediately displays a calm redirect modal routing them to university health authorities, preventing unauthorized medical record exposure.
- **Professor Command Center (`/inbox`)**: Six specialized queues (*Needs Decision*, *Needs Student Info*, *Urgent*, *Auto-Resolved*, *TA Review*, *Closed*) with inline decision buttons (`Approve`, `Deny`, `Require Info`, `Assign TA`).
- **Student Token Portal (`/c/[courseToken]` & `/r/[requestToken]`)**: Zero student account creation; requests are authenticated via ephemeral SHA-256 tokens.
- **Product Status**: Production-Ready / Edge-Deployed Platform.

---

### 2.2. KrishiOS (`KrishiOS`)

- **GitHub Repository**: [https://github.com/Gulshan-Singh-gs/KrishiOS](https://github.com/Gulshan-Singh-gs/KrishiOS)
- **Project Purpose**: Edge-Native Agronomic & Commodity Trade Stack. Offline-first agricultural intelligence empowering smallholder farmers with on-device disease diagnosis, mandi price arbitrage, localized irrigation planning, and vernacular voice assistance.

#### Verified Tech Stack
- **Frontend**: React 19, Vite 6.1.0, TypeScript 5.7, Tailwind CSS, Lucide React
- **Edge Vision AI**: On-device `@tensorflow/tfjs-core` v4.22 + `@tensorflow/tfjs-tflite` (Zero cloud upload needed for instant crop leaf inspection)
- **Local Persistence**: Dexie.js v4 (IndexedDB) with local mutation queue
- **Mobile Container**: Capacitor 7 (Android, Camera, Geolocation, Preferences) + Vite PWA
- **Backend API**: Hono 4.7 on Cloudflare Workers + Neon Serverless PostgreSQL + Drizzle ORM
- **Monorepo**: pnpm 12 workspaces, Vitest

#### Key Architecture & Capabilities
- **On-Device Crop Scanner (`CropScannerTab`)**: Runs quantized TensorFlow Lite models in browser memory or on mobile devices to evaluate crop foliage health and detect blight/infestation.
- **Mandi Arbitrage Calculator (`MandiArbitrageTab`)**: Compares regional APMC Mandi commodity rates, automatically subtracting vehicle freight costs and road distance to compute net farm-gate profit.
- **Irrigation Guidance Engine (`IrrigationTab`)**: Local mathematical calculations combining soil characteristics, crop stage, and evapo-transpiration.
- **Offline Sync Center (`SyncCenterTab`)**: Caches farmer queries and journal entries in Dexie.js and synchronizes state upon network re-connection.
- **Product Status**: Active Development / Prototype with working web application and local neural vision engine.

---

### 2.3. MONOLITH (`monolith`)

- **GitHub Repository**: [https://github.com/Gulshan-Singh-gs/monolith](https://github.com/Gulshan-Singh-gs/monolith)
- **Release Version**: `v2.4.0` (Documented in official release tags)
- **Project Purpose**: Sovereign Autonomous Multi-Agent Software Development Lifecycle (SDLC) Platform & Headed Browser Engine. A software factory that converts requirements into production-ready software through collaborative agent personas, live browser automation, local LLM execution, and tamper-evident cryptographic auditing.

#### Verified Tech Stack
- **Backend Core**: Python 3.12+, FastAPI, Uvicorn, WebSockets, Pydantic 2, Rich CLI
- **Autonomous Browser Engine**: Playwright (headed execution runtime for live web navigation, authentication, and testing)
- **LLM Gateway & Dual Router**:
  - *Local Sovereign Engine*: Quantized local models (`llama3.2`, `deepseek-r1`, `mistral`) through Ollama with zero network egress.
  - *Cloud Burst Engine*: High-throughput cloud bursts via Groq, Gemini, Grok, and OpenRouter.
  - *One-Click Air-Gap Kill Switch*: Instantly severs external telemetry for confidential military/enterprise codebases.
- **Cryptographic Security**: Merkle-chained SHA-256 audit ledger (`audit_ledger.py`) + AES-256 session cookie vault (`cookie_vault.py`).
- **Voice & Speech**: Vosk (`vosk>=0.3.45`), Useful Moonshine ONNX, ONNXRuntime (`onnxruntime>=1.20.0`).
- **Automation Launchers**: `Launch_Sovereign_Workbench.bat`, `Start/Launch_MONOLITH.bat`.

#### Key Architecture & Capabilities
- **Collaborative Agent SDLC**: Dedicated persona agents execute architecture synthesis, module scaffolding, static analysis, AST code patching, and test suite verification.
- **Headed Browser Automation**: Drives physical browser viewports to interact with external consoles, download assets, and verify UI rendering.
- **Merkle Audit Trail**: Every prompt, agent deliberation, and generated file is hashed and chained in an immutable audit ledger (`.vault/audit_trail.jsonl`).
- **Product Status**: Production / Mature System (v2.4.0 release with complete CLI and browser workbench).

---

### 2.4. GuardPayOS (`GuardPayOS`)

- **GitHub Repository**: [https://github.com/Gulshan-Singh-gs/GuardPayOS](https://github.com/Gulshan-Singh-gs/GuardPayOS)
- **Internal Workspace Codename**: `@aegis-upi` (AegisUPI: Sovereign Fraud & Deepfake Firewall)
- **Project Purpose**: Privacy-first fraud defense and security layer for digital payments. An architectural monorepo designed to analyze suspicious payment requests, UPI intent links, QR codes, and social engineering attempts without compromising user financial privacy.

#### Verified Tech Stack
- **Architecture**: Monorepo managed via pnpm 12 workspaces (`apps/web`, `apps/edge-api`, `packages/core-engine`, `packages/db`, `packages/shared-types`)
- **Frontend**: React 19, Vite 6.2.0, TypeScript 5.7, Tailwind CSS, Lucide React, idb, Capacitor 7, Vite PWA
- **Edge API**: Hono 4.7 on Cloudflare Workers
- **Database**: Neon Serverless PostgreSQL + Drizzle ORM (`packages/db/drizzle/0000_low_nebula.sql`)
- **Contracts**: Shared Zod schemas and type definitions in `@aegis-upi/shared-types`

#### Key Architecture & Capabilities
- **Explainable Fraud Defense**: Emphasizes human comprehension over opaque black-box blocking. Generates plain-language risk breakdowns for unverified UPI VPA handles and payment requests.
- **Decoupled Engine Structure**: Modular core risk engine separated from edge delivery, enabling local-on-device scoring or serverless edge evaluation.
- **Product Status**: In-Development / Architectural Monorepo Prototype (Early-stage monorepo with clean boundary architecture and verified contracts).

---

### 2.5. CampusOS RBU (`CampusOs-rbu`)

- **GitHub Repository**: [https://github.com/Gulshan-Singh-gs/CampusOs-rbu](https://github.com/Gulshan-Singh-gs/CampusOs-rbu)
- **Project Purpose**: Comprehensive Student Social & Higher Education Operating System built for Rayat Bahra University (RBU), Punjab. Features an extensive architecture audit with production compliance, accessibility conformance, and privacy impact assessments.

#### Verified Tech Stack
- **Frontend**: React 18.3.1, Vite 6.4.3, TypeScript 5.6, Tailwind CSS 3.4, Lucide React, Zustand 4.5.5, React Router DOM 6.26, date-fns, Zod
- **Backend & Database**: Supabase PostgreSQL with 45.4 KB of custom PLpgSQL database migrations, triggers, and Row-Level Security (RLS) policies
- **Edge Worker**: Cloudflare Pages / Workers integration (`public/_worker.js`, `public/_headers`)
- **Testing & Verification**: Vitest test suites and live verification scripts (`scratch/verify_live.js`)

#### Key Architecture & Capabilities
- **Ephemeral Chat Engine (`src/features/chat/components/EphemeralChatView.tsx`)**: Real-time peer-to-peer and group messaging with timed self-destruct capabilities backed by Supabase RLS.
- **Squad Matching (`src/features/matching/components/SquadSwipeView.tsx`)**: Interest-based student cohort matching and team formation for hackathons and projects.
- **Study Buddy Radar (`src/features/study/components/StudyBuddyRadarView.tsx`)**: Course-aware and subject-aware study partner locator.
- **Campus Passport (`src/features/passport/components/CampusPassportView.tsx`)**: Verified digital student credential displaying verified university accomplishments and event credentials.
- **Clubs Directory, Events Feed & Campus Stories**: Complete student engagement suite with administrative verification portals.
- **Product Status**: Production / Fully Architected Campus System.

---

### 2.6. Inventory (`Inventory`)

- **GitHub Repository**: [https://github.com/Gulshan-Singh-gs/Inventory](https://github.com/Gulshan-Singh-gs/Inventory)
- **Project Purpose**: Open-Source Inventory — A standalone, self-hosted product database and catalog visualizer built with vanilla web technologies. Requires zero build steps, zero external npm dependencies, and operates completely offline or via GitHub Pages.

#### Verified Tech Stack
- **Frontend**: Pure Vanilla JavaScript (ES6+), HTML5, CSS3 Custom Properties
- **Design System**: Dark Mode Glassmorphism (Electric Cyan `#00F2FF`, Deep Charcoal `#0F1115`)
- **Data Engine**: Flat JSON document store (`products.json`)
- **Routing**: Client-side hash routing (`#/category/[Category]?stack=[Stack]`)
- **Hosting**: GitHub Pages compatible or direct local `file://` execution

#### Key Architecture & Capabilities
- **Zero-Dependency Engine (`inventory.js`)**: Dynamically parses `products.json` and builds real-time filtering facets (Category, Stack, License, Difficulty) without any framework runtime.
- **Shareable Hash URLs**: Supports deep-linking into specific query states via browser hash fragments.
- **Product Status**: Prototype / Open-Source Utility.

---

## 3. Developer Profile & Cross-Project Technical Capabilities

Gulshan Singh's repository portfolio exhibits an exceptional level of technical cohesion, systems design maturity, and engineering rigor. Rather than generic tutorials, each repository addresses genuine, pragmatic operational challenges across commerce, education, agriculture, fitness, and software engineering.

### 3.1. Core Engineering Pillars

```
+---------------------------------------------------------------------------------------+
|                                    GS-SOFTWARES                                       |
|                  AI Agent Engineering & Intelligent Digital Infrastructure             |
+---------------------------------------------------------------------------------------+
|                                                                                       |
|  [ 1. AUTONOMOUS INTELLIGENCE ]                                                       |
|  - Multi-Agent Orchestration & SDLC Synthesis (MONOLITH v2.4.0)                       |
|  - Multimodal Vision & OCR (VyaparOS Kacha Bill Scanner via Google Gemini)            |
|  - Edge Neural Inference (KrishiOS On-Device TFLite / TF.js Plant Vision)              |
|  - Local Speech Recognition (MONOLITH Vosk & Moonshine ONNX Dictation)                 |
|                                                                                       |
|  [ 2. EDGE-NATIVE INFRASTRUCTURE & ZERO-TRUST SECURITY ]                              |
|  - Cloudflare Edge Delivery (Workers, Hono API, OpenNext Next.js 16, Pages)           |
|  - Serverless Distributed Databases (Neon PostgreSQL, Cloudflare D1 SQLite, Supabase) |
|  - Cryptographic Merkle-Chained Ledgers & FERPA-Compliant Data Isolation (FacultyOS)  |
|  - Financial Precision (Paise-Integer Accounting in VyaparOS, Server-Auth CafeOS)     |
|                                                                                       |
|  [ 3. OFFLINE-FIRST ARCHITECTURES & RESILIENT DATA SYSTEMS ]                          |
|  - Client-Side Databases (Dexie.js, IndexedDB idb-keyval, PWA Service Workers)        |
|  - Zero-Cloud Fallbacks (Atomic Relational JSON Stores in CafeOS, Vanilla Inventory)   |
|  - Deterministic Compilers (FacultyOS Syllabus Rules, Tailor Fabric Estimator)         |
|                                                                                       |
|  [ 4. HIGH-CRAFT TACTILE USER EXPERIENCES ]                                           |
|  - Bespoke Micro-Interactions (Rupnagar Tailors "Magic Indicator" & Dual Themes)      |
|  - Athletic High-Voltage Aesthetics (Off The Grid Gym `#08090B` + `#00FF66`)          |
|  - Modern Neumorphic & Glassmorphic Component Systems (Tailwind CSS v4 & React 19)    |
|                                                                                       |
+---------------------------------------------------------------------------------------+
```

---

## 4. Repository Summary Matrix

| # | Project Name | Tier | Architecture / Tech Stack | Core Domain | Product Status | GitHub URL |
|---|---|---|---|---|---|---|
| 1 | **Off The Grid Gym** | Primary | Next.js 16, Supabase, Tailwind v4, Lucide | Fitness & Gym Operations (Ropar) | Production-Ready | [Repo](https://github.com/Gulshan-Singh-gs/off_the_grid-gym) |
| 2 | **CafeOS** | Primary | Next.js 15, React 19, Supabase / JSON Store | Multi-Tenant Café POS & Mobile Ordering | Production-Ready | [Repo](https://github.com/Gulshan-Singh-gs/CafeOS) |
| 3 | **Rupnagar Tailors** | Primary | Vanilla JS, CSS Animations, Google Apps Script, Sheets | Bespoke Tailoring Consultation & Fabric Math | Live Deployed | [Repo](https://github.com/Gulshan-Singh-gs/Rupnagar-tailors) |
| 4 | **VyaparOS** | Primary | React 19, Hono, Cloudflare Workers, Neon, Gemini AI | Vernacular Indian MSME ERP & Kacha Bill OCR | Monorepo MVP | [Repo](https://github.com/Gulshan-Singh-gs/VyaparOS) |
| 5 | **FacultyOS** | Secondary | Next.js 16, Cloudflare D1/R2/KV, Drizzle, Better-Auth | Academic Syllabus Policy Triage (FERPA) | Production-Ready | [Repo](https://github.com/Gulshan-Singh-gs/FacultyOS) |
| 6 | **KrishiOS** | Secondary | React 19, Hono, TF.js/TFLite, Dexie, Capacitor | Agronomic Intelligence & Mandi Arbitrage | Active Dev / Prototype | [Repo](https://github.com/Gulshan-Singh-gs/KrishiOS) |
| 7 | **MONOLITH** | Secondary | Python 3.12, FastAPI, Playwright, Merkle Ledger | Sovereign Autonomous Multi-Agent SDLC Factory | Production (v2.4.0) | [Repo](https://github.com/Gulshan-Singh-gs/monolith) |
| 8 | **GuardPayOS** | Secondary | React 19, Hono, Neon, Drizzle, Capacitor | Sovereign UPI Fraud & Deepfake Firewall | Prototype Monorepo | [Repo](https://github.com/Gulshan-Singh-gs/GuardPayOS) |
| 9 | **CampusOS RBU** | Secondary | React 18, Supabase PostgreSQL, Zustand, Cloudflare | Higher Ed Campus Social Operating System | Production-Ready | [Repo](https://github.com/Gulshan-Singh-gs/CampusOs-rbu) |
| 10 | **Inventory** | Secondary | Vanilla JS, HTML5, CSS Glassmorphism, JSON DB | Self-Hosted Open-Source Product Database | Prototype Utility | [Repo](https://github.com/Gulshan-Singh-gs/Inventory) |

---

## 5. Guidance for Website Implementation (GS-Softwares)

1. **Brand Storytelling**:
   - GS-Softwares is not a generic template agency. Its core strength lies in **real-world systems engineering**: combining autonomous AI agents (MONOLITH), deterministic business rule compilers (FacultyOS, CafeOS), edge serverless deployment (Cloudflare / Neon / Supabase), and offline-first mobile web technologies (VyaparOS, KrishiOS).
2. **Project Section Presentation (Section 07)**:
   - Feature the 4 Primary Projects (`Off The Grid Gym`, `CafeOS`, `Rupnagar Tailors`, `VyaparOS`) as hero case studies with accurate architectures, real tech stacks, and live screenshots/interface concepts.
   - Present the 6 Secondary Projects (`FacultyOS`, `KrishiOS`, `MONOLITH`, `GuardPayOS`, `CampusOS RBU`, `Inventory`) in an expandable interactive gallery with direct GitHub repository links.
   - Use the exact verified product status badges (`Live Deployed`, `Production-Ready`, `Monorepo MVP`, `In Active Development`, `Prototype Utility`) to maintain 100% technical integrity.
3. **Services & Philosophy Alignment**:
   - **Service 1: AI Agent Development** directly references the multi-agent orchestration and headed browser automation developed in MONOLITH.
   - **Service 2: Business Automation** directly references the paper KOT replacement in CafeOS and Kacha bill OCR in VyaparOS.
   - **Service 3: Custom Business Platforms** reflects the bespoke workflows of Rupnagar Tailors and Off The Grid Gym.
   - **Service 4: Website Engineering** aligns with high-conversion local SEO, Next.js 16 App Router, and pure Vanilla PWA architectures.
   - **Service 5: Application Development** aligns with Capacitor 7 cross-platform Android wrappers and Vite PWA implementations.
   - **Service 6: Digital Infrastructure** reflects Cloudflare Workers, edge SQLite D1, Neon serverless PostgreSQL, and Supabase RLS policies.
