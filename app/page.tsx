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
import { Footer } from "@/components/Footer";

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
  primaryImageOfPage: `${SITE_URL}/cover.png`,
  dateCreated: "2026-07-02T00:00:00Z",
  dateModified: new Date().toISOString(),
  inLanguage: "en",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileLd) }}
      />
      <Loader />
      <Background />
      <CursorGlow />
      <ScrollProgress />
      <Navbar />
      <main className="relative z-10">
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
        <Contact />
      </main>
      <Footer />
    </>
  );
}
