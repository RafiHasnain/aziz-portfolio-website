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
    <main className="min-h-screen  bg-white">
      {/* Navigation */}
      <Navbar />
      {/* Hero Section */}
      <Hero />

      {/* Marquee Section */}
      <MarqueeSection />

      {/* Works Section */}
      <WorksSection />

      {/* About Me Section */}
      <AboutMe />

      {/* Personal Gallery Section */}
      <PersonalGallery />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Contact Section */}
      <div id="contact">
        <ContactSection />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
