import { MarqueeSection } from "@/components/marquee-section";
import { AboutMe } from "@/components/about-me";
import { PersonalGallery } from "@/components/personal-gallery";
import { Testimonials } from "@/components/testimonials";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import WorksSectionServer from "@/components/works-section-server";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white overflow-hidden">
      {/* Noise Overlay */}
      {/* <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: "url('/images/Noise.png')",
          backgroundRepeat: "repeat",
          opacity: 0.5,
        }}
      /> */}

      <div
        className="absolute top-[130vh] inset-0  z-0"
        style={{
          backgroundImage: "url('/images//Noise.png') ",
          backgroundRepeat: "no-repeat",
          // backgroundPosition: "left, right",
          backgroundSize: "cover",
          // opacity: 0.6, // Adjust this value as needed
          opacity: 0.1, // Adjust this value as needed
        }}
      />

      <Navbar />
      <Hero />
      {/* Content */}
      <div className="relative z-10">
        {/* <MarqueeSection /> */}
        <WorksSectionServer />
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
