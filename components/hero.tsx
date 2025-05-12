"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import React, { useState } from "react";
import { MarqueeSection } from "./marquee-section";

const Hero = () => {
  const [copied, setCopied] = useState(false);
  const email = "azizulislamux@gmail.com";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);

      // Show toast notification
      toast({
        title: "Email copied!",
        description: "Email address copied to clipboard",
      });

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast({
        title: "Copy failed",
        description: "Could not copy email to clipboard",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="relative">
      {/* Background Image with reduced opacity */}
      <div
        className="absolute inset-0  z-0"
        style={{
          backgroundImage: "url('/images/bg-hero-portfolio.png') ",
          backgroundRepeat: "no-repeat",
          // backgroundPosition: "left, right",
          backgroundSize: "cover",
          opacity: 1, // Adjust this value as needed
        }}
      />

      {/* <div
        className="absolute  top-0 left-0 w-full h-full bg-no-repeat bg-contain"
        style={{
          backgroundImage: "url('/images/bg-hero-wave-effect-portfolio.png')",
          backgroundPosition: "top left",
          opacity: 1, // First image opacity
        }}
      /> */}

      {/* Second background image */}
      {/* <div
        className="absolute  bottom-0 right-0 w-full h-full bg-no-repeat bg-contain"
        style={{
          backgroundImage: "url('/images/bg-hero-grid-effect-portfolio.png')",
          backgroundPosition: "top right",
          opacity: 0.2, // Second image opacity
        }}
      /> */}

      {/* Foreground content */}
      <div className="relative z-10 ">
        <div className="container mx-auto pt-40 px-4 pb-10 max-w-4xl">
          <div className="flex flex-col items-center text-center space-y-6">
            {/* Greeting */}
            <div className="flex items-center gap-2">
              <h1 className="text-4xl font-light text-gray-400">
                Hello, I'm <span className="font-bold text-black">Aziz</span>
              </h1>
              <div className="rounded-[20px] overflow-hidden">
                <Image
                  src="/images/aziz-image.png"
                  alt="Aziz profile"
                  width={99}
                  height={108}
                  className="object-cover"
                />
              </div>
            </div>

            {/* Job Title */}
            <div className="flex items-center gap-2">
              <h2 className="text-3xl font-light text-gray-400">
                Product Designer at{" "}
                <span className="font-bold text-black">RoBenDevs</span>
              </h2>
              <div className="w-20 h-16 bg-black rounded-[20px] flex items-center justify-center drop-shadow-xl">
                <div className="w-10 h-10 text-white">
                  <Image
                    src="/images/robendevs.png"
                    alt="Company logo"
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            </div>

            {/* Tagline */}
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-light text-gray-400">
                With Love For Data heavy
              </h3>
              <div className="rounded-[20px] overflow-hidden">
                <Image
                  src="/images/person-computer.png"
                  alt="Data icon"
                  width={108}
                  height={90}
                />
              </div>
              <h3 className="text-2xl font-bold text-black">Complex SAAS</h3>
            </div>

            {/* Description */}
            <div className="max-w-6xl mx-0 mt-8 pb-12 text-lg/10 text-gray-400">
              <p>
                Specializing in crafting intuitive and impactful user
                experiences for
                <span className="mx-2 px-2 py-1 bg-gray-200 text-[#3C3C3D]  rounded-md font-bold">
                  Complex
                </span>
                ,
                <span className="mx-2 px-2 py-1 bg-gray-200 text-[#3C3C3D] rounded-md font-bold">
                  Data-driven SaaS
                </span>
                <br />
                products and
                <span className="mx-2 px-2 py-1 mr-3 bg-gray-200 text-[#3C3C3D] rounded-md font-bold">
                  Entreprise Solutions
                </span>
                backed by
                <span className="mx-2 px-2 py-1 bg-gray-200 text-[#3C3C3D] rounded-md font-bold">
                  4+ years
                </span>
                of industry experience.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4 mt-8">
              <div className="relative">
                <div className="opacity-30  z-30 bg-gradient-to-r from-transparent from-40% via-black via-50% to-transparent to-60% absolute top-0 bottom-0 w-full"></div>
                <a
                  href="https://calendly.com/azizulislamux"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="rounded-full static bg-[#1E1E1E] outline outline-offset-2 outline-1 drop-shadow-xl hover:bg-black px-6">
                    Book a Call 💬
                  </Button>
                </a>
              </div>

              <Button
                variant="outline"
                onClick={copyToClipboard}
                className="rounded-full border-gray-300 text-gray-700 outline outline-offset-2 outline-1 outline-[#E7E7E7]  hover:bg-gray-100 px-6"
              >
                📩 Copy email
              </Button>
            </div>
          </div>
        </div>
        <MarqueeSection />
      </div>
    </div>
  );
};

export default Hero;
