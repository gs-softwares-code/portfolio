import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "GS-Softwares | Hybrid Digital Solutions & AI Engineering Agency",
    template: "%s | GS-Softwares",
  },
  description:
    "GS-Softwares engineers websites, custom applications, automation systems, and AI-powered business tools that help businesses operate smarter and grow faster. India-based, globally available.",
  metadataBase: new URL("https://gs-softwares-official.vercel.app"),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "digital solutions",
    "web development",
    "AI automation",
    "custom software",
    "business applications",
    "India",
    "GS-Softwares",
    "agency",
  ],
  openGraph: {
    title: "GS-Softwares | Hybrid Digital Solutions & AI Engineering Agency",
    description:
      "From high-converting websites to AI-powered business systems — we engineer technology that helps businesses operate smarter and grow faster.",
    url: "https://gs-softwares-official.vercel.app",
    siteName: "GS-Softwares",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GS-Softwares | Hybrid Digital Solutions & AI Engineering",
    description:
      "We engineer websites, applications, automation, and AI-powered business systems. India-based, globally available.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "GS Admin",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-64.png", type: "image/png", sizes: "64x64" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://gs-softwares-official.vercel.app/#organization",
      "name": "GS-Softwares",
      "url": "https://gs-softwares-official.vercel.app",
      "email": "gssoftwares.official@gmail.com",
      "sameAs": [
        "https://github.com/gs-softwares-code",
        "https://github.com/Gulshan-Singh-gs"
      ],
      "description":
        "GS-Softwares is a Hybrid Digital Solutions & AI Engineering Agency that engineers websites, custom applications, automation systems, and AI-powered business tools.",
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://gs-softwares-official.vercel.app/#service",
      "name": "GS-Softwares",
      "url": "https://gs-softwares-official.vercel.app",
      "areaServed": ["India", "United States", "United Kingdom", "Australia"],
      "serviceType": [
        "Web Development",
        "Application Development",
        "AI Automation",
        "Business Software",
        "Digital Analytics",
        "Technical SEO",
      ],
      "parentOrganization": {
        "@id": "https://gs-softwares-official.vercel.app/#organization",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${ibmPlexMono.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-bg-base font-body text-text-primary antialiased selection:bg-brand-accent selection:text-white">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand-accent focus:px-4 focus:py-2 focus:text-white focus:shadow-neu-accent"
        >
          Skip to main content
        </a>
        <main id="main-content" className="relative flex min-h-screen flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
