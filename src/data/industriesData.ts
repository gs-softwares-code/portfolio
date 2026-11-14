// Industry solution data for GS-Softwares.
// Eight primary industries, each with problems, solutions, and recommended services.

export interface IndustrySolution {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  iconKey: string;
  accentColor: string;
  tagline: string;
  headline: string;
  description: string;
  galleryImages?: { url: string; alt: string; caption?: string }[];
  problems: string[];
  solutions: {
    name: string;
    description: string;
    serviceSlug: string;
  }[];
  automationOpportunities: string[];
  analyticsOpportunities: string[];
  recommendedDivisions: string[];
  implementationRoadmap: {
    phase: string;
    title: string;
    description: string;
  }[];
  relatedProjectId?: string;
}

export const industrySolutions: IndustrySolution[] = [
  {
    id: "hospitality",
    slug: "hospitality",
    name: "Hospitality",
    shortName: "Hospitality",
    iconKey: "utensils",
    accentColor: "#F59E0B",
    tagline: "From reservation to review — engineered.",
    headline: "Digital Systems for Cafes, Restaurants & Hotels",
    description:
      "The hospitality industry runs on speed, experience, and repeat customers. We build the digital infrastructure that helps hospitality businesses serve customers faster, reduce operational friction, and understand what's working.",
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        alt: "Modern Cafe & Restaurant Dining Ambiance",
        caption: "Dining & POS System",
      },
      {
        url: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80",
        alt: "Live Commercial Kitchen Operations",
        caption: "Kitchen Kanban Flow",
      },
      {
        url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
        alt: "Restaurant Table Reservation Setup",
        caption: "Direct Table Booking",
      },
    ],
    problems: [
      "No professional digital presence to attract new customers",
      "Paper-based order systems slowing down kitchen operations",
      "No online reservation system — bookings happen only by phone",
      "No visibility into daily revenue, top items, or peak hours",
      "Paying high commissions to aggregator platforms",
      "Customer data trapped in paper records with no follow-up system",
      "Staff spending time on manual order taking and reconciliation",
    ],
    solutions: [
      {
        name: "Restaurant or Cafe Website",
        description:
          "A professional website with your menu, location, hours, and contact information — giving customers what they need before they visit.",
        serviceSlug: "digital-presence",
      },
      {
        name: "Digital QR Menu",
        description:
          "A mobile-friendly digital menu accessible by scanning a QR code on each table — always up to date without printing costs.",
        serviceSlug: "applications",
      },
      {
        name: "Kitchen Operations Terminal",
        description:
          "A live dashboard for your kitchen team showing incoming orders, their status, and completion tracking — replacing paper kots.",
        serviceSlug: "applications",
      },
      {
        name: "Reservation Management System",
        description:
          "Online table reservation that lets customers book directly — with confirmation emails and reminders sent automatically.",
        serviceSlug: "applications",
      },
      {
        name: "Sales Analytics Dashboard",
        description:
          "Daily revenue tracking, top-selling items, peak hours, and order patterns — giving you the data to make better operational decisions.",
        serviceSlug: "analytics",
      },
    ],
    automationOpportunities: [
      "Automated booking confirmations and table reminders",
      "Post-visit review request messages",
      "Daily sales summary delivered to your WhatsApp",
      "Low-inventory alerts for kitchen supplies",
      "Automated staff schedule notifications",
    ],
    analyticsOpportunities: [
      "Daily gross revenue vs target tracking",
      "Top-selling items and categories by time of day",
      "Average order value trends",
      "Customer return rate analysis",
      "Peak hour identification for staffing optimization",
    ],
    recommendedDivisions: [
      "digital-presence",
      "applications",
      "ai-automation",
      "analytics",
    ],
    implementationRoadmap: [
      {
        phase: "Phase 1",
        title: "Digital Foundation",
        description:
          "Professional website with menu, location, hours, and inquiry form. Google Business Profile optimized for local search.",
      },
      {
        phase: "Phase 2",
        title: "Operations System",
        description:
          "Digital menu and kitchen terminal to replace paper-based order management. Reservation system for direct bookings.",
      },
      {
        phase: "Phase 3",
        title: "Intelligence Layer",
        description:
          "Sales analytics dashboard and automated reports. Customer communication automation for follow-ups and reminders.",
      },
    ],
    relatedProjectId: "cafeos",
  },
  {
    id: "health-fitness",
    slug: "health-fitness",
    name: "Health & Fitness",
    shortName: "Health & Fitness",
    iconKey: "dumbbell",
    accentColor: "#10B981",
    tagline: "Build your members. Build your business.",
    headline: "Digital Systems for Gyms, Studios & Fitness Businesses",
    description:
      "Fitness businesses grow on member satisfaction and retention. We engineer platforms that help gym owners manage memberships, reduce manual work, and keep members engaged — from inquiry to renewal.",
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
        alt: "Modern Gym Training Floor & Equipment",
        caption: "Facility & Weight Zone",
      },
      {
        url: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=800&q=80",
        alt: "Strength Training & Coach Guidance",
        caption: "Trainer & Member Plans",
      },
      {
        url: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80",
        alt: "Fitness Studio Cardio & Conditioning",
        caption: "Renewal & Retention Telemetry",
      },
    ],
    problems: [
      "Membership records kept in notebooks or basic spreadsheets",
      "No way for prospects to explore membership options or enquire online",
      "Staff manually tracking attendance and membership expiry",
      "No automated reminders for membership renewals — revenue lost to lapsed memberships",
      "No insight into membership trends, peak hours, or revenue patterns",
      "No app or portal for members to check their membership status",
    ],
    solutions: [
      {
        name: "Gym Website with Membership Showcase",
        description:
          "A professional website displaying your facilities, membership plans, trainer profiles, and class schedule — with clear calls to action.",
        serviceSlug: "digital-presence",
      },
      {
        name: "Member Management System",
        description:
          "A dedicated platform for managing member records, tracking membership status, recording attendance, and monitoring renewals.",
        serviceSlug: "applications",
      },
      {
        name: "Member Portal",
        description:
          "A secure self-service area where members can check their membership details, attendance, and renewal dates without calling the front desk.",
        serviceSlug: "applications",
      },
      {
        name: "Admin Dashboard",
        description:
          "A complete operational control panel for gym owners and managers — membership overview, revenue, attendance, and content management.",
        serviceSlug: "applications",
      },
    ],
    automationOpportunities: [
      "Automated membership renewal reminders via WhatsApp",
      "New member welcome messages",
      "Lapsed membership re-engagement messages",
      "Daily attendance summary delivered to management",
      "New inquiry notification to front desk staff",
    ],
    analyticsOpportunities: [
      "Active vs expired membership counts",
      "Monthly and annual revenue tracking",
      "Peak attendance hours and days",
      "Member acquisition and retention trends",
      "Revenue per membership type analysis",
    ],
    recommendedDivisions: [
      "digital-presence",
      "applications",
      "ai-automation",
      "analytics",
    ],
    implementationRoadmap: [
      {
        phase: "Phase 1",
        title: "Website & Online Presence",
        description:
          "Professional gym website with pricing, facilities, trainers, and inquiry form. Google Maps integration and local SEO optimization.",
      },
      {
        phase: "Phase 2",
        title: "Member Management Platform",
        description:
          "Digital member database replacing spreadsheets. Attendance tracking, membership status, and admin dashboard.",
      },
      {
        phase: "Phase 3",
        title: "Automation & Retention",
        description:
          "Automated renewal reminders, lapsed member re-engagement, and revenue reporting delivered automatically to management.",
      },
    ],
    relatedProjectId: "off-the-grid-gym",
  },
  {
    id: "beauty-wellness",
    slug: "beauty-wellness",
    name: "Beauty & Wellness",
    shortName: "Beauty & Wellness",
    iconKey: "sparkles",
    accentColor: "#EC4899",
    tagline: "Every appointment. Every customer. Perfectly managed.",
    headline: "Digital Solutions for Salons, Spas & Wellness Businesses",
    description:
      "Beauty and wellness businesses depend on appointment management, customer experience, and repeat bookings. We build the digital systems that make running a salon or spa simpler, more professional, and more profitable.",
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
        alt: "Luxury Salon & Spa Interior Styling",
        caption: "Salon Interior & Styling",
      },
      {
        url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
        alt: "Cosmetics & Skincare Treatment Station",
        caption: "Treatment & Care Stations",
      },
      {
        url: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80",
        alt: "Spa Wellness Aromatherapy Lounge",
        caption: "Online Booking Calendar",
      },
    ],
    problems: [
      "Appointment scheduling done manually by phone or WhatsApp",
      "No-shows with no prior reminder system in place",
      "Client history and preferences tracked in notebooks",
      "No professional online presence to attract new customers",
      "Staff management done through informal communication",
      "No insight into service popularity, peak days, or revenue patterns",
    ],
    solutions: [
      {
        name: "Salon or Spa Website",
        description:
          "A polished website showcasing your services, pricing, gallery, and team — designed to attract new customers and communicate your quality.",
        serviceSlug: "digital-presence",
      },
      {
        name: "Online Appointment Booking System",
        description:
          "Let clients book appointments 24/7 through your website — selecting services, staff member, and preferred time slot.",
        serviceSlug: "applications",
      },
      {
        name: "Client Records System",
        description:
          "A digital record of each client's service history, preferences, and contact information — building a business asset you own.",
        serviceSlug: "applications",
      },
      {
        name: "Staff Management Dashboard",
        description:
          "Schedule management, appointment allocation, and staff performance overview for owners and managers.",
        serviceSlug: "applications",
      },
    ],
    automationOpportunities: [
      "Appointment confirmation messages sent automatically",
      "Reminder messages 24 hours and 2 hours before each appointment",
      "Post-visit thank-you messages with review request",
      "Re-booking prompts for clients who haven't returned in 30+ days",
      "Staff schedule notification system",
    ],
    analyticsOpportunities: [
      "Most popular services by day and time",
      "Revenue by service category",
      "Client retention and return frequency",
      "Staff performance and appointment volume",
      "No-show rate tracking and trend analysis",
    ],
    recommendedDivisions: [
      "digital-presence",
      "applications",
      "ai-automation",
      "analytics",
    ],
    implementationRoadmap: [
      {
        phase: "Phase 1",
        title: "Professional Online Presence",
        description:
          "Polished website with service menu, gallery, team profiles, and inquiry form. Google Business Profile for local visibility.",
      },
      {
        phase: "Phase 2",
        title: "Booking & Client Management",
        description:
          "Online booking system with client records. Automated appointment reminders to reduce no-shows.",
      },
      {
        phase: "Phase 3",
        title: "Retention & Revenue Intelligence",
        description:
          "Automated re-engagement messages, review collection, and revenue analytics dashboard for owners.",
      },
    ],
  },
  {
    id: "professional-services",
    slug: "professional-services",
    name: "Professional Services",
    shortName: "Professional Services",
    iconKey: "briefcase",
    accentColor: "#4A65DC",
    tagline: "Build the digital credibility your expertise deserves.",
    headline: "Digital Solutions for Lawyers, Consultants & Service Firms",
    description:
      "Professional service firms win business on credibility and trust. We build the digital infrastructure that communicates expertise, manages client inquiries, and supports efficient service delivery.",
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
        alt: "Corporate Office Conference & Strategy Room",
        caption: "Firm Authority & Portal",
      },
      {
        url: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
        alt: "Legal & Consulting Case Documentation",
        caption: "Intake & Matter Tracking",
      },
      {
        url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
        alt: "Executive Business Discussion & Advisory",
        caption: "Document & Invoice Vault",
      },
    ],
    problems: [
      "Website doesn't accurately reflect the firm's expertise or credibility",
      "Inquiry management happens through email chains with no structure",
      "No system for tracking client communications and case history",
      "Document workflows done manually — quotes, contracts, reports",
      "Consultation scheduling done through back-and-forth messages",
      "No digital showcase of past work, case studies, or testimonials",
    ],
    solutions: [
      {
        name: "Professional Portfolio Website",
        description:
          "A authoritative website that positions your firm's expertise, services, case studies, and credentials with clarity and confidence.",
        serviceSlug: "digital-presence",
      },
      {
        name: "Inquiry Management System",
        description:
          "A structured system for capturing, tracking, and responding to client inquiries — no more lost emails or missed opportunities.",
        serviceSlug: "applications",
      },
      {
        name: "Client Portal",
        description:
          "A secure area where clients can submit documents, track progress, and communicate with your team — professionally branded.",
        serviceSlug: "applications",
      },
      {
        name: "Document Generation Automation",
        description:
          "Automatically generate proposals, quotes, engagement letters, and reports from templates — saving hours of manual preparation.",
        serviceSlug: "ai-automation",
      },
      {
        name: "Appointment Booking System",
        description:
          "Online booking for consultations and meetings — integrated with calendar systems and confirmation workflows.",
        serviceSlug: "applications",
      },
    ],
    automationOpportunities: [
      "Automated inquiry acknowledgment and follow-up",
      "Consultation reminder emails and messages",
      "Document delivery and signature request automation",
      "Client onboarding workflow automation",
      "Automated invoice generation and delivery",
    ],
    analyticsOpportunities: [
      "Inquiry source and conversion tracking",
      "Client acquisition cost analysis",
      "Service revenue breakdown",
      "Consultation-to-client conversion rates",
      "Client retention and repeat engagement rates",
    ],
    recommendedDivisions: [
      "digital-presence",
      "applications",
      "ai-automation",
      "digital-growth",
    ],
    implementationRoadmap: [
      {
        phase: "Phase 1",
        title: "Credibility Foundation",
        description:
          "Authoritative professional website with services, expertise, case studies, and inquiry form. LinkedIn and Google presence optimization.",
      },
      {
        phase: "Phase 2",
        title: "Client Operations Platform",
        description:
          "Inquiry management system, appointment booking, and client portal for structured professional communication.",
      },
      {
        phase: "Phase 3",
        title: "Workflow Automation",
        description:
          "Document generation, automated follow-ups, and client communication workflows that reduce administrative overhead.",
      },
    ],
  },
  {
    id: "retail-commerce",
    slug: "retail-commerce",
    name: "Retail & Commerce",
    shortName: "Retail & Commerce",
    iconKey: "shopping-bag",
    accentColor: "#F97316",
    tagline: "Sell more. Manage better. Grow faster.",
    headline: "Digital Commerce Infrastructure for Retailers & Online Sellers",
    description:
      "Retail businesses need digital systems that drive sales, control inventory, and understand customer behavior. We engineer commerce platforms — from online stores to inventory management — that keep operations running and revenue growing.",
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
        alt: "Retail Boutique Display & Commerce Setup",
        caption: "Storefront & Retail Floor",
      },
      {
        url: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80",
        alt: "POS Checkout & Card Payment Terminal",
        caption: "POS & Billing Checkout",
      },
      {
        url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
        alt: "Retail Stock Warehouse & Fulfillment",
        caption: "Inventory & Dispatch Hub",
      },
    ],
    problems: [
      "No online presence — missing customers who search before they shop",
      "Inventory tracked manually in notebooks or basic spreadsheets",
      "No insight into which products sell, when, and to whom",
      "No way to sell online — business limited to foot traffic only",
      "Customer data not captured — no way to bring customers back",
      "Order management handled through WhatsApp with no tracking",
    ],
    solutions: [
      {
        name: "Ecommerce Website",
        description:
          "A fully functional online store with product catalogue, shopping cart, payment processing, and order management.",
        serviceSlug: "digital-presence",
      },
      {
        name: "Inventory Management System",
        description:
          "Real-time stock tracking, low-stock alerts, supplier management, and purchase order logging.",
        serviceSlug: "applications",
      },
      {
        name: "Customer Database & CRM",
        description:
          "A structured customer record system capturing purchase history and enabling targeted follow-up and re-engagement.",
        serviceSlug: "applications",
      },
      {
        name: "Sales Analytics Dashboard",
        description:
          "Revenue trends, top products, customer segments, and inventory turnover — giving you the data to stock and sell smarter.",
        serviceSlug: "analytics",
      },
    ],
    automationOpportunities: [
      "Order confirmation and dispatch notifications",
      "Low-stock alerts sent to purchasing manager",
      "Customer re-engagement messages for repeat purchases",
      "Abandoned cart follow-up for online store",
      "Automated review request after order completion",
    ],
    analyticsOpportunities: [
      "Top-selling products by revenue and volume",
      "Customer purchase frequency and average basket size",
      "Inventory turnover rates",
      "Revenue trends by day, week, and month",
      "Online vs in-store sales comparison",
    ],
    recommendedDivisions: [
      "digital-presence",
      "applications",
      "analytics",
      "ai-automation",
    ],
    implementationRoadmap: [
      {
        phase: "Phase 1",
        title: "Digital Storefront",
        description:
          "Professional ecommerce website or product catalogue. Google Business Profile and local SEO for nearby customers.",
      },
      {
        phase: "Phase 2",
        title: "Operations Platform",
        description:
          "Inventory management and customer database replacing manual tracking. Order management system with status tracking.",
      },
      {
        phase: "Phase 3",
        title: "Intelligence & Growth",
        description:
          "Sales analytics dashboard, inventory alerts, and customer re-engagement automation to drive repeat business.",
      },
    ],
    relatedProjectId: "vyaparos",
  },
  {
    id: "education",
    slug: "education",
    name: "Education",
    shortName: "Education",
    iconKey: "graduation-cap",
    accentColor: "#8B5CF6",
    tagline: "Modernize your institution's digital operations.",
    headline: "Digital Solutions for Coaching Institutes, Schools & Academies",
    description:
      "Educational institutions operate complex systems — admissions, attendance, fees, communication, and performance tracking. We build the digital platforms that make running an educational institution more efficient and professional.",
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
        alt: "Modern Education Campus & Students Learning",
        caption: "Academy Campus & Classes",
      },
      {
        url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
        alt: "Classroom Lecture & Digital Learning Board",
        caption: "Student & Batch Management",
      },
      {
        url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
        alt: "Academic Exam Assessment & Results",
        caption: "Fee & Exam Performance Vault",
      },
    ],
    problems: [
      "Admission inquiries handled informally with no tracking system",
      "Student attendance and records managed in paper registers",
      "Fee collection tracking done in spreadsheets with errors",
      "No way for parents or students to access their information digitally",
      "Communication with students and parents through informal channels",
      "No visibility into student performance trends across batches",
    ],
    solutions: [
      {
        name: "Institution Website",
        description:
          "A professional website for your institution with programme details, faculty, fees, results, and admission inquiry form.",
        serviceSlug: "digital-presence",
      },
      {
        name: "Admission Inquiry System",
        description:
          "A structured intake system to capture, track, and manage admission inquiries through the entire enrollment process.",
        serviceSlug: "applications",
      },
      {
        name: "Student Management Platform",
        description:
          "Digital records for all students — enrolment, batch, attendance, fees, and performance — in one organized system.",
        serviceSlug: "applications",
      },
      {
        name: "Parent / Student Portal",
        description:
          "A self-service area where parents and students can check attendance, fee status, results, and announcements.",
        serviceSlug: "applications",
      },
    ],
    automationOpportunities: [
      "Automated fee payment reminders to parents",
      "Attendance alerts for consistent absences",
      "Result and assessment notifications",
      "Admission inquiry follow-up sequences",
      "Class schedule and event announcements",
    ],
    analyticsOpportunities: [
      "Batch-wise attendance and performance tracking",
      "Fee collection and outstanding balance reports",
      "Admission funnel conversion rates",
      "Student retention rates across academic years",
      "Subject-wise performance analysis",
    ],
    recommendedDivisions: [
      "digital-presence",
      "applications",
      "ai-automation",
      "analytics",
    ],
    implementationRoadmap: [
      {
        phase: "Phase 1",
        title: "Institution Website",
        description:
          "Professional website with programmes, faculty, admissions process, and inquiry form. Local search optimization.",
      },
      {
        phase: "Phase 2",
        title: "Student & Operations Platform",
        description:
          "Student management system, attendance tracking, fee management, and admin dashboard for staff.",
      },
      {
        phase: "Phase 3",
        title: "Communication & Analytics",
        description:
          "Parent portal, automated communications, and performance analytics to support better educational outcomes.",
      },
    ],
    relatedProjectId: "campusos",
  },
  {
    id: "real-estate",
    slug: "real-estate",
    name: "Real Estate",
    shortName: "Real Estate",
    iconKey: "building-2",
    accentColor: "#0EA5E9",
    tagline: "Every property. Every lead. Under control.",
    headline: "Digital Solutions for Property Agents, Developers & Brokers",
    description:
      "Real estate businesses live and die by their lead management. We build digital platforms that showcase properties professionally, capture and manage leads systematically, and convert inquiries into transactions.",
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
        alt: "Luxury Architecture & Real Estate Development",
        caption: "Property Portfolio & Listings",
      },
      {
        url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
        alt: "Modern Villa & Residence Showcase",
        caption: "Virtual Walkthrough Showcase",
      },
      {
        url: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80",
        alt: "Commercial Real Estate & Office Towers",
        caption: "Broker Lead Pipeline & CRM",
      },
    ],
    problems: [
      "Property listings managed in spreadsheets with no customer-facing catalogue",
      "Leads arriving through multiple channels with no central tracking",
      "No professional digital presence to build credibility with buyers",
      "Follow-up with prospects happening inconsistently",
      "No way to schedule and manage property viewing appointments online",
      "No visibility into which listings generate the most inquiry activity",
    ],
    solutions: [
      {
        name: "Property Catalogue Website",
        description:
          "A professional property showcase with filterable listings, high-quality images, pricing, and location details.",
        serviceSlug: "digital-presence",
      },
      {
        name: "Lead CRM System",
        description:
          "A structured lead management platform that captures inquiries from all sources, tracks follow-up, and stages deals through the pipeline.",
        serviceSlug: "applications",
      },
      {
        name: "Appointment Scheduling System",
        description:
          "Online booking for property viewings and consultations — with automated reminders to reduce no-shows.",
        serviceSlug: "applications",
      },
      {
        name: "Agent Dashboard",
        description:
          "A management view for agency owners tracking agent performance, listing activity, inquiry volume, and deal pipeline.",
        serviceSlug: "applications",
      },
    ],
    automationOpportunities: [
      "Automated lead acknowledgment when inquiry is submitted",
      "Property viewing reminder messages",
      "Follow-up sequences for warm leads who haven't responded",
      "New listing notification to interested buyers",
      "Deal milestone notifications to relevant team members",
    ],
    analyticsOpportunities: [
      "Lead source analysis — where inquiries originate",
      "Listing performance — which properties attract the most interest",
      "Inquiry-to-viewing conversion rates",
      "Agent performance metrics",
      "Deal velocity and pipeline value",
    ],
    recommendedDivisions: [
      "digital-presence",
      "applications",
      "ai-automation",
      "analytics",
    ],
    implementationRoadmap: [
      {
        phase: "Phase 1",
        title: "Property Catalogue & Presence",
        description:
          "Professional website with property listings, filters, and inquiry forms. Google Business Profile and local SEO.",
      },
      {
        phase: "Phase 2",
        title: "Lead Management System",
        description:
          "CRM for capturing and tracking all leads in one place. Appointment booking for property viewings.",
      },
      {
        phase: "Phase 3",
        title: "Automation & Intelligence",
        description:
          "Automated lead follow-up sequences, viewing reminders, and analytics dashboard for agency performance tracking.",
      },
    ],
  },
  {
    id: "sme",
    slug: "sme",
    name: "Growing SMEs",
    shortName: "SMEs",
    iconKey: "rocket",
    accentColor: "#36A783",
    tagline: "Scale your operations with the right technology.",
    headline: "Digital Infrastructure for Growing Small & Medium Businesses",
    description:
      "Every growing business reaches a point where manual systems create bottlenecks. We engineer the digital infrastructure — systems, automation, and analytics — that helps small and medium businesses operate at a larger scale without proportional increases in overhead.",
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
        alt: "Tech Startup Team Collaboration & Scale",
        caption: "Cross-Functional Collaboration",
      },
      {
        url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        alt: "Business Growth Analytics Dashboard",
        caption: "Real-Time BI & Metrics",
      },
      {
        url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
        alt: "Software Engineering & Infrastructure Setup",
        caption: "Custom Internal Automation",
      },
    ],
    problems: [
      "Operations managed across too many disconnected tools and spreadsheets",
      "Growth limited by manual processes that can't scale with the business",
      "No clear visibility into business performance across departments",
      "Customer communication handled inconsistently across team members",
      "New market expansion hampered by lack of professional digital presence",
      "Repetitive tasks consuming staff time that should go to higher-value work",
    ],
    solutions: [
      {
        name: "Business Website or Ecommerce Platform",
        description:
          "A professional digital presence that reflects the business's current scale and positions it for the next stage of growth.",
        serviceSlug: "digital-presence",
      },
      {
        name: "Integrated Business Management System",
        description:
          "A unified platform combining CRM, operations, inventory, and reporting — replacing disconnected spreadsheets and tools.",
        serviceSlug: "applications",
      },
      {
        name: "Workflow Automation",
        description:
          "Automation for the most time-consuming repetitive tasks — data entry, communication, reporting, and routine decision-making.",
        serviceSlug: "ai-automation",
      },
      {
        name: "Business Intelligence Dashboard",
        description:
          "A single view of business performance — revenue, customers, operations, and trends — enabling faster and more confident decisions.",
        serviceSlug: "analytics",
      },
    ],
    automationOpportunities: [
      "Cross-system data synchronization",
      "Routine reporting delivery to management",
      "Customer communication workflows",
      "Staff task notification and assignment",
      "Invoice generation and accounts receivable tracking",
    ],
    analyticsOpportunities: [
      "Consolidated business performance dashboard",
      "Revenue by product, service, or geography",
      "Customer acquisition and retention metrics",
      "Operational efficiency and cost analysis",
      "Growth trend forecasting",
    ],
    recommendedDivisions: [
      "digital-presence",
      "applications",
      "ai-automation",
      "analytics",
      "infrastructure",
    ],
    implementationRoadmap: [
      {
        phase: "Phase 1",
        title: "Digital Foundation & Audit",
        description:
          "Audit existing systems, establish professional digital presence, and identify the highest-impact automation opportunities.",
      },
      {
        phase: "Phase 2",
        title: "Integrated Operations Platform",
        description:
          "Build or integrate the core business management system — replacing the most critical manual or disconnected processes.",
      },
      {
        phase: "Phase 3",
        title: "Intelligence & Scale",
        description:
          "Business analytics, workflow automation, and ongoing technical support to sustain and accelerate growth.",
      },
    ],
  },
];

export const getIndustryBySlug = (slug: string) =>
  industrySolutions.find((i) => i.slug === slug);

