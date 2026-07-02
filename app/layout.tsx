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
  "I build scalable web applications, AI-powered SaaS products, enterprise systems, and modern digital experiences. Senior Full Stack Developer specializing in .NET, React, Next.js and AI integration.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · Huzaifa Awan",
  },
  description: DESCRIPTION,
  keywords: [
    "Muhammad Huzaifa Awan",
    "Senior Full Stack Developer",
    "Next.js developer",
    ".NET developer",
    "AI SaaS",
    "React engineer",
    "software consultant",
  ],
  authors: [{ name: "Muhammad Huzaifa Awan" }],
  creator: "Muhammad Huzaifa Awan",
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Huzaifa Awan",
    images: [{ url: "/cover.png", width: 1600, height: 960, alt: "Muhammad Huzaifa Awan" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/cover.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
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
        {children}
      </body>
    </html>
  );
}
