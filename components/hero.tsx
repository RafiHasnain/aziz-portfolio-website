import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";
import React from "react";

const Hero = () => {
  return (
    <div className="container mx-auto pt-40 px-4 pb-16 max-w-4xl">
      <div className="flex flex-col items-center text-center space-y-6">
        {/* Greeting */}
        <div className="flex items-center gap-2">
          <h1 className="text-4xl font-light text-gray-600">
            Hello, I'm <span className="font-bold text-black">Aziz</span>
          </h1>
          <div className=" rounded-md overflow-hidden  ">
            <Image
              src="/images/aziz-image.png"
              alt="Aziz profile"
              width={69}
              height={78}
              className="object-cover"
            />
          </div>
        </div>

        {/* Job Title */}
        <div className="flex items-center gap-2">
          <h2 className="text-3xl font-light text-gray-600">
            Product Designer at{" "}
            <span className="font-bold text-black">RoBenDevs</span>
          </h2>
          <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center drop-shadow-xl">
            <div className="w-6 h-6 text-white">
              <Image
                src="/images/robendevs.png"
                alt="Company logo"
                width={24}
                height={24}
              />
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div className="flex items-center gap-2">
          <h3 className="text-2xl font-light text-gray-600">
            With Love For Data heavy
          </h3>
          <div className=" rounded-lg overflow-hidden">
            <Image
              src="/images/person-computer.png"
              alt="Data icon"
              width={78}
              height={60}
            />
          </div>
          <h3 className="text-2xl font-bold text-black">Complex SAAS</h3>
        </div>

        {/* Description */}
        <div className="max-w-3xl mx-auto mt-8 text-lg/10 text-gray-600">
          <p>
            Specializing in crafting intuitive and impactful user experiences
            for
            <span className="mx-2 px-2 py-1 bg-gray-200 rounded-md font-medium">
              Complex
            </span>
            ,
            <span className="mx-2 px-2 py-1 bg-gray-200 rounded-md font-medium">
              Data-driven SaaS
            </span>
            products and
            <span className="mx-2 px-2 py-1 bg-gray-200 rounded-md font-medium">
              Entreprise Solutions
            </span>
            backed by
            <span className="mx-2 px-2 py-1 bg-gray-200 rounded-md font-medium">
              4+ years
            </span>
            of industry experience.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-4 mt-8">
          <Button className="rounded-full bg-[#1E1E1E] hover:bg-black px-6">
            <Phone className="mr-2 h-4 w-4" /> Book a Call
          </Button>
          <Button
            variant="outline"
            className="rounded-full border-gray-300 text-gray-700 hover:bg-gray-100 px-6"
          >
            <Mail className="mr-2 h-4 w-4" /> Copy email
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
