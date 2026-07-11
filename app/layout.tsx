import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const SITE_URL = "https://huzaifaawan.com";
const TITLE = "Muhammad Huzaifa Awan · Senior Full Stack Developer";
const DESCRIPTION =
  "Muhammad Huzaifa Awan — Senior Full Stack Developer specializing in React, Next.js, .NET, Node.js and AI-powered SaaS. 3+ years shipping scalable web apps, enterprise systems, APIs and MCP servers. Available for hire.";

const SOCIALS = [
  "https://www.linkedin.com/in/mhuzaifaawan",
  "https://github.com/M-Huzaifa-Awan",
  "https://www.upwork.com/freelancers/~01b2cac225f43ef332",
];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · Huzaifa Awan",
  },
  description: DESCRIPTION,
  applicationName: "Huzaifa Awan Portfolio",
  keywords: [
    "Muhammad Huzaifa Awan",
    "Huzaifa Awan",
    "Senior Full Stack Developer",
    "Full Stack Developer for hire",
    "React developer",
    "Next.js developer",
    ".NET developer",
    "Node.js developer",
    "TypeScript developer",
    "AI SaaS developer",
    "MCP server developer",
    "hire full stack developer",
    "software engineer",
  ],
  authors: [{ name: "Muhammad Huzaifa Awan", url: SITE_URL }],
  creator: "Muhammad Huzaifa Awan",
  publisher: "Muhammad Huzaifa Awan",
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    firstName: "Muhammad Huzaifa",
    lastName: "Awan",
    username: "mhuzaifaawan",
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Huzaifa Awan",
    locale: "en_US",
    images: [
      { url: "/cover.png", width: 1600, height: 960, alt: "Muhammad Huzaifa Awan — Senior Full Stack Developer" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/cover.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/icon-192.png",
    apple: "/apple-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Muhammad Huzaifa Awan",
      alternateName: "Huzaifa Awan",
      url: SITE_URL,
      image: `${SITE_URL}/cover.png`,
      jobTitle: "Senior Full Stack Developer",
      email: "mailto:mhuzaifaawan7@gmail.com",
      description: DESCRIPTION,
      knowsAbout: [
        "Full Stack Development",
        "React",
        "Next.js",
        "TypeScript",
        ".NET",
        "ASP.NET Core",
        "Node.js",
        "SQL Server",
        "PostgreSQL",
        "Redis",
        "AI Integration",
        "Model Context Protocol (MCP)",
        "SaaS Development",
        "Cloud Architecture",
      ],
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "National University of Modern Languages (NUML)",
      },
      worksFor: [
        { "@type": "Organization", name: "LEO Innovate" },
        { "@type": "Organization", name: "Lotte Innovate" },
      ],
      knowsLanguage: ["English", "Urdu"],
      sameAs: SOCIALS,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Huzaifa Awan",
      alternateName: "Muhammad Huzaifa Awan",
      description: DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#person` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-bg font-sans text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
