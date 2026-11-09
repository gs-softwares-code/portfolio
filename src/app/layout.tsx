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
  title: "GS-Softwares | AI Agent Engineering & Digital Solutions",
  description:
    "GS-Softwares builds intelligent digital infrastructure, autonomous agent workflows, and bespoke business platforms that solve real operational bottlenecks.",
  metadataBase: new URL("https://gs-softwares.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "GS-Softwares | AI Agent Engineering & Digital Solutions",
    description:
      "High-reliability autonomous AI agents, enterprise workflow automation, and custom business platforms.",
    url: "https://gs-softwares.com",
    siteName: "GS-Softwares",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GS-Softwares | AI Agent Engineering & Digital Solutions",
    description:
      "We engineer intelligence. You build the future. High-reliability autonomous AI agents and custom platforms.",
  },
  robots: {
    index: true,
    follow: true,
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
      "@id": "https://gs-softwares.com/#organization",
      "name": "GS-Softwares",
      "url": "https://gs-softwares.com",
      "sameAs": [
        "https://github.com/gs-softwares-code",
        "https://github.com/Gulshan-Singh-gs"
      ],
      "description":
        "AI Agent Engineering and Digital Solutions company that builds intelligent digital infrastructure, autonomous workflows, and custom business platforms.",
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://gs-softwares.com/#service",
      "name": "GS-Softwares",
      "url": "https://gs-softwares.com",
      "parentOrganization": {
        "@id": "https://gs-softwares.com/#organization"
      },
      "priceRange": "$$$$"
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
