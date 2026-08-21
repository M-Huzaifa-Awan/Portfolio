import { Background } from "@/components/Background";
import { Loader } from "@/components/Loader";
import { CursorGlow } from "@/components/CursorGlow";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Projects } from "@/components/Projects";
import { TechStack } from "@/components/TechStack";
import { Experience } from "@/components/Experience";
import { Certifications } from "@/components/Certifications";
import { Testimonials } from "@/components/Testimonials";
import { GitHubActivity } from "@/components/GitHubActivity";
import { Writing } from "@/components/Writing";
import { Contact } from "@/components/Contact";
import { Feedback } from "@/components/Feedback";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { ProgressiveBlur } from "@/components/ui/ProgressiveBlur";
import { QuickChat } from "@/components/ui/QuickChat";
import { FAQS } from "@/lib/data";

const SITE_URL = "https://huzaifaawan.com";

// Profile page rich result lives only on the homepage (the actual profile),
// and must carry `mainEntity` pointing at the Person defined in the layout.
const profileLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/#profilepage`,
  url: SITE_URL,
  name: "Muhammad Huzaifa Awan · Senior Full Stack Developer",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  mainEntity: { "@id": `${SITE_URL}/#person` },
  primaryImageOfPage: `${SITE_URL}/profile-photo.png`,
  dateCreated: "2026-07-02T00:00:00Z",
  dateModified: new Date().toISOString(),
  inLanguage: "en",
  // Voice assistants (AEO): read the intro and the FAQ aloud.
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["#about", "#faq"],
  },
};

// FAQ rich result (AEO) + clean Q&A for AI answer engines (GEO/AIO).
const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}/#faq`,
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

// Atlas as a first-class product entity created by the Person.
const atlasLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/#atlas`,
  name: "Atlas",
  url: "https://atlas-web-rho-hazel.vercel.app/",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Atlas connects Microsoft Outlook email and calendar to any MCP-compatible AI assistant: read and send mail, check your schedule, and book meetings in plain English across multiple accounts.",
  offers: { "@type": "Offer", price: "12.00", priceCurrency: "USD" },
  creator: { "@id": `${SITE_URL}/#person` },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(atlasLd) }}
      />
      <Loader />
      <Background />
      <CursorGlow />
      <ScrollProgress />
      <ProgressiveBlur />
      <Navbar />
      {/* No z-index here: modals inside (project sheet, cert lightbox) must
          stack above the fixed QuickChat launcher, which a z-indexed main
          would cap. DOM order alone keeps content above the fixed Background. */}
      <main className="relative">
        <Hero />
        <About />
        <Services />
        <Projects />
        <TechStack />
        <Experience />
        <Certifications />
        <Testimonials />
        <GitHubActivity />
        <Writing />
        <Faq />
        <Contact />
        <Feedback />
      </main>
      <Footer />
      <QuickChat />
    </>
  );
}
