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
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
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
        <Contact />
      </main>
      <Footer />
    </>
  );
}
