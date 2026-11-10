// Engagement models — four ways to work with GS-Softwares.

export interface EngagementModel {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  bestFor: string[];
  includes: string[];
  cta: string;
  ctaHref: string;
  featured?: boolean;
}

export const engagementModels: EngagementModel[] = [
  {
    id: "individual-services",
    title: "Individual Services",
    subtitle: "Pick exactly what you need.",
    description:
      "Select one or more specific services from our six divisions. You are not locked into a bundle — you get precisely what your business requires at this stage.",
    bestFor: [
      "Businesses with a clear, specific requirement",
      "Organizations adding a single capability to an existing setup",
      "Projects with a defined scope and timeline",
    ],
    includes: [
      "Single-service scoping and proposal",
      "Dedicated delivery by relevant specialists",
      "Clear deliverables and handover",
      "Post-launch technical support period",
    ],
    cta: "Discuss Your Requirements",
    ctaHref: "/contact",
  },
  {
    id: "integrated-solutions",
    title: "Integrated Solutions",
    subtitle: "Multiple services, one coherent system.",
    description:
      "Combine services across divisions into one integrated digital solution — a website, booking system, analytics dashboard, and automation working together as a single ecosystem.",
    bestFor: [
      "Businesses building their digital infrastructure from scratch",
      "Companies replacing multiple disconnected tools with one platform",
      "Organizations in specific industries seeking a complete solution",
    ],
    includes: [
      "Discovery and digital strategy session",
      "Multi-service solution architecture",
      "Integrated implementation and testing",
      "Training and handover documentation",
      "Ongoing support arrangement",
    ],
    cta: "Explore Integrated Solutions",
    ctaHref: "/solutions",
    featured: true,
  },
  {
    id: "custom-development",
    title: "Custom Software Development",
    subtitle: "Built precisely around your business.",
    description:
      "When standard service offerings don't match your requirements, we engineer something built from the ground up — custom platforms, unique workflows, and proprietary business systems.",
    bestFor: [
      "Businesses with complex or unique operational requirements",
      "Organizations replacing legacy systems with modern infrastructure",
      "Companies building a proprietary product or platform",
    ],
    includes: [
      "In-depth requirement discovery and analysis",
      "Custom system architecture and design",
      "Full development, integration, and testing",
      "Deployment and performance optimization",
      "Long-term maintenance and evolution support",
    ],
    cta: "Discuss a Custom Project",
    ctaHref: "/contact",
  },
  {
    id: "ongoing-support",
    title: "Ongoing Support & Maintenance",
    subtitle: "Continuous technical care.",
    description:
      "Digital systems require ongoing attention. We provide continuous technical support, maintenance, updates, and evolution for websites, applications, and digital infrastructure.",
    bestFor: [
      "Businesses that need reliable, ongoing technical assistance",
      "Organizations with websites or applications requiring regular updates",
      "Companies without in-house technical staff",
    ],
    includes: [
      "Scheduled maintenance and updates",
      "Priority bug fixes and troubleshooting",
      "Performance monitoring and optimization",
      "Security updates and vulnerability management",
      "Quarterly review and improvement planning",
    ],
    cta: "Discuss Support Options",
    ctaHref: "/contact",
  },
];

