"use client";
import Image from "next/image";
import { Marquee } from "./marquee";

const skills = [
  "Product",
  "Design System",
  "Branding",
  "Landing Page",
  "Mobile App UI",
  "Web Design",
  "Prototyping",
  "User Research",
  "Wireframing",
  "UI/UX",
];

const portfolioItems = [
  "/images/work-1.png",
  "/images/work-2.png",
  "/images/work-3.png",
  "/images/work-4.png",
  "/images/work-5.png",
];

export function MarqueeSection() {
  return (
    <section className="py-16 overflow-hidden">
      {/* Skills Marquee - Left to Right */}
      <Marquee direction="right" speed="normal" className="mb-8">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="text-gray-500 text-lg whitespace-nowrap flex items-center px-4"
          >
            <span>{skill}</span>
            <span className="mx-4 text-gray-300">•</span>
          </div>
        ))}
      </Marquee>

      {/* Portfolio Images Marquee - Right to Left */}
      <Marquee direction="left" speed="normal">
        {portfolioItems.map((src, index) => (
          <div
            key={index}
            className="min-w-[300px] h-[200px] bg-gray-100 rounded-lg overflow-hidden shadow-md mx-3"
          >
            <Image
              src={src || "/placeholder.svg"}
              alt={`Portfolio item ${index + 1}`}
              width={300}
              height={200}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
}
