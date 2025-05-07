import Image from "next/image";
import { GraduationCap, Palette, Medal } from "lucide-react";
import { WordFlipperSlide } from "./word-flipper-slide";

export function AboutMe() {
  return (
    <section className="py-20 ">
      <div className="container mx-auto px-4">
        <h2 className="text-[32px] font-bold text-center mb-16">About Me</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Photo Collage */}
          <div className="relative h-[500px] mx-auto w-full max-w-[500px]">
            {/* Main center image */}
            <div className="absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[400px] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/about-me-image-1.png"
                alt="Portrait"
                width={300}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Left image */}
            <div className="absolute z-10 top-1/2 left-0 transform -translate-y-1/2  w-[250px] h-[350px] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/about-me-image-2.png"
                alt="Outdoor activity"
                width={250}
                height={350}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right image */}
            <div className="absolute z-10 top-1/2 right-0 transform -translate-y-1/2  w-[250px] h-[350px] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/about-me-image-3.png"
                alt="Travel photo"
                width={250}
                height={350}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* About Content */}
          <div className="space-y-8 w-2/3">
            {/* Personal Attributes */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                {/* <div className="bg-gray-100 p-2 rounded-full">
                <GraduationCap className="h-6 w-6 text-gray-700" />
                </div> */}
                <span className="text-[32px]"> 🎓</span>
                <span className="text-[32px] font-semibold">
                  Marine Engineer
                </span>
              </div>

              {/* <WordFlipperSlide /> */}
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full">
                  <Image
                    src="/images/figma-logo.png"
                    alt="Travel photo"
                    width={250}
                    height={350}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[32px] font-semibold">
                  Designer by Profession
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* <div className="bg-gray-100 p-2 rounded-full">
                  <Medal className="h-6 w-6 text-gray-700" />
                </div> */}
                <span className="text-[32px]">🏅</span>
                <span className="text-[32px] font-semibold">SportsLover</span>
              </div>
            </div>

            {/* Bio Paragraphs */}
            <div className="space-y-4 text-lg text-[#A8A7A7] ">
              <p>
                With over 5+ years of experience as a UX designer, I have
                delivered end-to-end design solutions for multiple products in
                an agile environment.
              </p>

              <p>
                I don't let roles confine me. From oil and gas to insurance,
                healthcare to marketplaces, and more, I've designed robust
                experiences for web products across diverse industries.
              </p>

              <p>
                I specialize in crafting digital experiences that align with
                business goals while delivering meaningful value to users.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
