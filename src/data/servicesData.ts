// Six primary service divisions for GS-Softwares.
// Each division has a slug, icon key, headline, description, and service list.

export type ServiceStatus = "available" | "coming-soon";

export interface ServiceItem {
  name: string;
  description: string;
  status: ServiceStatus;
}

export interface ServiceDivision {
  id: string;
  slug: string;
  number: string;
  name: string;
  shortName: string;
  iconKey: string;
  accentColor: string;
  tagline: string;
  headline: string;
  description: string;
  whyItMatters: string;
  services: ServiceItem[];
  technologies: string[];
  whoNeedsThis: string[];
  relatedIndustries: string[];
}

export const serviceDivisions: ServiceDivision[] = [
  {
    id: "digital-presence",
    slug: "digital-presence",
    number: "01",
    name: "Digital Presence & Branding",
    shortName: "Digital Presence",
    iconKey: "monitor",
    accentColor: "#4A65DC",
    tagline: "Your first impression, engineered.",
    headline: "Websites & Digital Identities That Work as Hard as You Do",
    description:
      "A professional digital presence is the foundation of every modern business. We design and develop websites that communicate your brand clearly, convert visitors into customers, and represent your business with the credibility it deserves.",
    whyItMatters:
      "Most customers research a business online before making contact. A slow, outdated, or poorly designed website loses that opportunity. We engineer websites that are fast, visually authoritative, and built to convert.",
    services: [
      {
        name: "Business Website Development",
        description:
          "Custom multi-page websites that communicate your services, build trust, and drive customer inquiries. Designed for your industry, not from a template.",
        status: "available",
      },
      {
        name: "Landing Page Development",
        description:
          "High-converting single-page experiences built for specific campaigns, promotions, or lead-generation objectives.",
        status: "available",
      },
      {
        name: "Ecommerce Website Development",
        description:
          "Complete online stores with product catalogues, shopping carts, payment processing, and order management.",
        status: "available",
      },
      {
        name: "Website Redesign",
        description:
          "Modernize an existing website without losing its content or SEO history. Faster, cleaner, and more effective.",
        status: "available",
      },
      {
        name: "Brand Identity & Digital Design Systems",
        description:
          "Logo design, color systems, typography, and consistent visual guidelines that make your business recognizable across every platform.",
        status: "available",
      },
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Vercel",
      "Cloudflare",
    ],
    whoNeedsThis: [
      "Businesses launching for the first time online",
      "Businesses with outdated or underperforming websites",
      "Companies entering new markets",
      "Professionals establishing a credible online identity",
    ],
    relatedIndustries: [
      "hospitality",
      "beauty-wellness",
      "professional-services",
      "retail-commerce",
      "health-fitness",
    ],
  },
  {
    id: "applications",
    slug: "applications",
    number: "02",
    name: "Applications & Business Systems",
    shortName: "Applications",
    iconKey: "layout-dashboard",
    accentColor: "#36A783",
    tagline: "Software built around how your business actually works.",
    headline: "Custom Applications That Run Your Business Operations",
    description:
      "Generic software rarely fits the way real businesses operate. We engineer bespoke applications — from customer-facing portals to internal management dashboards — built precisely around your workflows, your team, and your customers.",
    whyItMatters:
      "Off-the-shelf software comes with features you don't need and misses the ones you do. Custom-built applications align with your actual processes, reduce friction for your team, and deliver better experiences to your customers.",
    services: [
      {
        name: "Progressive Web Applications (PWA)",
        description:
          "Installable web applications that work in any browser and can be added to a user's home screen — no app store submission required. Ideal for customer portals and business tools requiring broad accessibility.",
        status: "available",
      },
      {
        name: "Android Application Development",
        description:
          "Native Android applications distributed as APK packages. Android packaging requires device compatibility testing, signing, and appropriate distribution through the Play Store or direct installation.",
        status: "available",
      },
      {
        name: "Admin Dashboards",
        description:
          "Internal control panels for business owners and managers to view data, manage content, and control operations — no technical knowledge required.",
        status: "available",
      },
      {
        name: "Custom CRM Systems",
        description:
          "Customer relationship management systems designed around your sales process, inquiry tracking, and customer communication workflows.",
        status: "available",
      },
      {
        name: "Business Management Systems",
        description:
          "Integrated platforms combining multiple operations — staff, inventory, customers, finances — into one cohesive system.",
        status: "available",
      },
      {
        name: "Inventory Management Systems",
        description:
          "Real-time stock tracking, supplier management, and low-stock alerts — keeping your operations running without manual spreadsheet work.",
        status: "available",
      },
      {
        name: "Booking & Appointment Systems",
        description:
          "Online booking for services, consultations, or appointments. Reduces no-shows and eliminates back-and-forth scheduling.",
        status: "available",
      },
      {
        name: "Customer Portals",
        description:
          "Secure self-service interfaces where customers can track orders, manage memberships, access documents, or communicate with your team.",
        status: "available",
      },
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Capacitor",
      "Tailwind CSS",
      "Cloudflare Workers",
    ],
    whoNeedsThis: [
      "Businesses with complex internal operations",
      "Companies managing large customer bases",
      "Service businesses that rely on scheduling and bookings",
      "Retail businesses needing inventory control",
      "Organizations replacing manual or spreadsheet-based processes",
    ],
    relatedIndustries: [
      "hospitality",
      "health-fitness",
      "beauty-wellness",
      "retail-commerce",
      "education",
    ],
  },
  {
    id: "ai-automation",
    slug: "ai-automation",
    number: "03",
    name: "AI & Automation",
    shortName: "AI & Automation",
    iconKey: "cpu",
    accentColor: "#7C5CFC",
    tagline: "Intelligent systems that work while you sleep.",
    headline: "Automation & AI Tools That Eliminate Repetitive Work",
    description:
      "Repetitive tasks consume time that your team should spend on high-value work. We engineer automation systems — from structured rule-based workflows to AI-powered processes — that handle the routine, so your business can focus on growth.",
    whyItMatters:
      "Every hour spent on manual follow-ups, data entry, or routine communication is an hour not spent serving customers or developing the business. Well-designed automation systems recover that time and reduce errors simultaneously.",
    services: [
      {
        name: "AI Chatbots",
        description:
          "Conversational interfaces that answer customer questions, qualify leads, and collect information — available 24/7 without staff overhead.",
        status: "available",
      },
      {
        name: "AI Business Assistants",
        description:
          "AI-powered tools that help your team write, summarize, categorize, or process information faster. Practical tools, not experimental projects.",
        status: "available",
      },
      {
        name: "Workflow Automation",
        description:
          "Connect your existing tools and automate multi-step processes. When an event occurs in one system, the right action happens automatically in another.",
        status: "available",
      },
      {
        name: "Lead Capture & Management Automation",
        description:
          "Automated systems to collect, organize, and follow up with business leads — using Google Maps data, Apps Script, and Google Sheets pipelines.",
        status: "available",
      },
      {
        name: "Appointment Reminders",
        description:
          "Automated WhatsApp, SMS, or email reminders that reduce no-shows and keep your schedule full.",
        status: "available",
      },
      {
        name: "Email Automation",
        description:
          "Trigger-based email sequences for onboarding new customers, following up after inquiries, or re-engaging inactive clients.",
        status: "available",
      },
      {
        name: "Document Generation Automation",
        description:
          "Automatically generate invoices, quotes, contracts, or reports from templates — eliminating manual document preparation.",
        status: "available",
      },
      {
        name: "Business Process Automation",
        description:
          "Map and automate multi-step internal processes — from order confirmation to staff notification to customer communication.",
        status: "available",
      },
      {
        name: "Third-Party API Integrations",
        description:
          "Connect your website, application, or internal systems to external services — payment gateways, messaging platforms, analytics tools, and more.",
        status: "available",
      },
    ],
    technologies: [
      "Google Apps Script",
      "Google Sheets API",
      "WhatsApp Business API",
      "Zapier",
      "Make (Integromat)",
      "OpenAI API",
      "Resend",
      "Twilio",
    ],
    whoNeedsThis: [
      "Businesses spending significant time on repetitive communication",
      "Teams manually transferring data between systems",
      "Service businesses with high appointment volume",
      "Companies losing leads due to slow follow-up",
      "Organizations generating high volumes of routine documents",
    ],
    relatedIndustries: [
      "hospitality",
      "beauty-wellness",
      "health-fitness",
      "professional-services",
      "retail-commerce",
    ],
  },
  {
    id: "analytics",
    slug: "analytics",
    number: "04",
    name: "Analytics & Business Intelligence",
    shortName: "Analytics",
    iconKey: "bar-chart-3",
    accentColor: "#F59E0B",
    tagline: "Turn your data into decisions.",
    headline: "Business Intelligence That Tells You What's Actually Happening",
    description:
      "Most businesses have data — in spreadsheets, POS systems, booking tools, and websites — but no clear view of what it means. We build analytics dashboards and reporting systems that transform scattered information into clear, actionable business insight.",
    whyItMatters:
      "Business decisions made without data are expensive guesses. Knowing which products sell, when customers arrive, where revenue comes from, and how operations are performing allows you to make faster, more accurate decisions.",
    services: [
      {
        name: "Business Analytics Dashboards",
        description:
          "Custom visual dashboards that display your key business metrics in one place — revenue, customers, operations — updated in real time or on a schedule.",
        status: "available",
      },
      {
        name: "Website Analytics",
        description:
          "Setup and configuration of Google Analytics and Search Console. Regular reporting on traffic, user behavior, and conversion performance.",
        status: "available",
      },
      {
        name: "Sales Reporting",
        description:
          "Automated sales reports showing daily, weekly, or monthly revenue, average order value, top products, and revenue trends.",
        status: "available",
      },
      {
        name: "Customer Analytics",
        description:
          "Understand your customer base — who they are, how often they return, what they spend, and which customer segments drive the most value.",
        status: "available",
      },
      {
        name: "Automated Reporting",
        description:
          "Reports that generate and deliver themselves — to your email, WhatsApp, or dashboard — on the schedule you need.",
        status: "available",
      },
      {
        name: "Operational Performance Dashboards",
        description:
          "Real-time operational views for restaurant kitchens, gym front desks, salon appointment books, and retail floors.",
        status: "available",
      },
    ],
    technologies: [
      "Google Analytics",
      "Google Sheets",
      "Google Apps Script",
      "Looker Studio",
      "Custom Dashboard (React/Next.js)",
      "Supabase",
      "PostgreSQL",
    ],
    whoNeedsThis: [
      "Business owners who rely on intuition instead of data",
      "Managers who need operational visibility across locations",
      "Teams spending hours manually compiling reports",
      "Companies wanting to understand their customer behavior",
      "Businesses preparing for growth or investment",
    ],
    relatedIndustries: [
      "hospitality",
      "retail-commerce",
      "health-fitness",
      "education",
      "professional-services",
    ],
  },
  {
    id: "digital-growth",
    slug: "digital-growth",
    number: "05",
    name: "Digital Growth & Visibility",
    shortName: "Digital Growth",
    iconKey: "trending-up",
    accentColor: "#10B981",
    tagline: "Get found by the customers who matter.",
    headline: "Technical SEO & Digital Visibility That Builds Long-Term Growth",
    description:
      "Being discoverable online is not an accident. We implement technical SEO foundations, Google Business Profile optimization, and digital visibility infrastructure that helps your business get found by the right people at the right time.",
    whyItMatters:
      "Customers searching for your type of business in your area should find you easily. Without proper SEO foundations and Google Business Profile management, that traffic goes to competitors who have set these systems up.",
    services: [
      {
        name: "Local SEO",
        description:
          "Optimization strategies that help your business rank in local search results — Google Maps, local pack listings, and location-based queries.",
        status: "available",
      },
      {
        name: "Technical SEO",
        description:
          "Website structure, speed, metadata, semantic markup, sitemap, and crawlability improvements that make your site easier for search engines to index correctly.",
        status: "available",
      },
      {
        name: "Google Business Profile Setup & Optimization",
        description:
          "Complete setup and optimization of your Google Business Profile — categories, description, photos, hours, services, and Q&A management.",
        status: "available",
      },
      {
        name: "Review Collection Workflows",
        description:
          "Systematic processes for collecting genuine customer reviews on Google and other platforms — improving trust signals and local search rankings.",
        status: "available",
      },
      {
        name: "Social Media Creative Design",
        description:
          "Professionally designed social media graphics, templates, and visual content that maintain brand consistency across your channels.",
        status: "available",
      },
      {
        name: "Digital Marketing Infrastructure",
        description:
          "Setup of the technical systems that support digital marketing — tracking, attribution, landing pages, and conversion measurement.",
        status: "available",
      },
      {
        name: "Conversion Optimization",
        description:
          "Analysis and improvement of your website's ability to convert visitors into customers — through UX improvements, clearer calls to action, and faster load times.",
        status: "available",
      },
    ],
    technologies: [
      "Google Search Console",
      "Google Analytics",
      "Google Business Profile",
      "Schema.org Structured Data",
      "Open Graph Protocol",
      "Core Web Vitals",
      "Screaming Frog",
    ],
    whoNeedsThis: [
      "Local businesses not appearing in nearby search results",
      "New businesses establishing their online presence",
      "Companies with websites that receive little organic traffic",
      "Businesses with poor or no Google reviews",
      "Organizations preparing to launch digital marketing campaigns",
    ],
    relatedIndustries: [
      "hospitality",
      "beauty-wellness",
      "health-fitness",
      "retail-commerce",
      "real-estate",
    ],
  },
  {
    id: "infrastructure",
    slug: "infrastructure",
    number: "06",
    name: "Infrastructure & Technical Support",
    shortName: "Infrastructure",
    iconKey: "server",
    accentColor: "#64748B",
    tagline: "Reliable systems. Dependable support.",
    headline: "Technical Infrastructure That Keeps Your Business Running",
    description:
      "Digital infrastructure is not a one-time setup. Hosting, domains, security, performance, and ongoing maintenance require consistent attention. We handle the technical foundation so your business never goes offline unexpectedly.",
    whyItMatters:
      "A slow or unavailable website costs real revenue. Security vulnerabilities put customer data and business reputation at risk. Proper infrastructure management ensures your digital systems remain reliable, secure, and performant.",
    services: [
      {
        name: "Hosting & Deployment",
        description:
          "Setup and configuration of hosting environments on Vercel, Cloudflare, or other appropriate platforms — optimized for performance and reliability.",
        status: "available",
      },
      {
        name: "Domain Configuration",
        description:
          "Domain registration, DNS configuration, SSL certificate setup, and email domain verification — done correctly from the start.",
        status: "available",
      },
      {
        name: "Website Maintenance",
        description:
          "Regular content updates, plugin updates, compatibility checks, and minor modifications — keeping your website current and functional.",
        status: "available",
      },
      {
        name: "Application Maintenance",
        description:
          "Ongoing technical support for custom applications — dependency updates, bug fixes, feature adjustments, and performance monitoring.",
        status: "available",
      },
      {
        name: "Security Improvements",
        description:
          "Security audits and hardening — input validation, rate limiting, authentication improvements, and protection against common vulnerabilities.",
        status: "available",
      },
      {
        name: "Backup Management",
        description:
          "Automated backup systems for databases and content — ensuring business continuity and fast recovery in the event of data loss.",
        status: "available",
      },
      {
        name: "Performance Optimization",
        description:
          "Speed improvements for websites and applications — image optimization, caching, code splitting, and Core Web Vitals improvements.",
        status: "available",
      },
      {
        name: "Technical Troubleshooting",
        description:
          "Diagnosis and resolution of technical problems — form errors, broken integrations, display issues, and unexpected behavior.",
        status: "available",
      },
      {
        name: "System Monitoring",
        description:
          "Uptime monitoring and performance alerting — so issues are identified and addressed before they affect your customers.",
        status: "available",
      },
    ],
    technologies: [
      "Vercel",
      "Cloudflare",
      "Namecheap",
      "Let's Encrypt",
      "Uptime Robot",
      "Supabase",
      "GitHub Actions",
    ],
    whoNeedsThis: [
      "Businesses that have experienced website downtime",
      "Companies without in-house technical staff",
      "Organizations using aging or unmaintained digital infrastructure",
      "Businesses that handle customer data online",
      "Any organization wanting reliable, maintained digital systems",
    ],
    relatedIndustries: ["hospitality", "retail-commerce", "education", "professional-services", "sme"],
  },
];

export const getDivisionBySlug = (slug: string) =>
  serviceDivisions.find((d) => d.slug === slug);

