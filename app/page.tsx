import { MarqueeSection } from "@/components/marquee-section";
import { WorksSection } from "@/components/works-section";
import { AboutMe } from "@/components/about-me";
import { PersonalGallery } from "@/components/personal-gallery";
import { Testimonials } from "@/components/testimonials";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white overflow-hidden">
      {/* Noise Overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: "url('/images/Noise.png')",
          backgroundRepeat: "repeat",
          opacity: 0.2,
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <MarqueeSection />
        <WorksSection />
        <AboutMe />
        <PersonalGallery />
        <Testimonials />
        <div id="contact">
          <ContactSection />
        </div>
        <Footer />
      </div>
    </main>
  );
}
