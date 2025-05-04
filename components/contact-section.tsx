"use client";

import { useState } from "react";
import { Copy, X, Instagram, Linkedin } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { InteractiveSkills } from "./interactive-skills";

export function ContactSection() {
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
    <section className="py-20 ">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">
            Don't Be Stranger, Say Hello !
          </h2>

          {/* Email Button */}
          <div className="flex justify-center mb-8">
            <button
              onClick={copyToClipboard}
              className="bg-black text-white rounded-full px-6 py-3 flex items-center gap-2 hover:bg-gray-800 transition-colors"
            >
              {email}
              <Copy className="h-4 w-4" />
            </button>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-6 mb-16">
            {/* X (Twitter) */}
            <a
              href="https://x.com/Azizulux"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-gray-300 hover:bg-black hover:border-black hover:text-white transition-all duration-300"
              aria-label="X (Twitter)"
            >
              <X className="h-5 w-5" />
            </a>

            {/* Dribbble */}
            <a
              href="https://dribbble.com/RackZend"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-gray-300 hover:bg-[#EA4C89] hover:border-[#EA4C89] hover:text-white transition-all duration-300"
              aria-label="Dribbble"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
                <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
                <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72" />
              </svg>
            </a>

            {/* Behance */}

            <a
              href="https://www.behance.net/azizulislam15"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-gray-300 hover:bg-[#1769FF] hover:border-[#1769FF] hover:text-white transition-all duration-300"
              aria-label="Behance"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                // xmlns:xlink="http://www.w3.org/1999/xlink"
                fill="#000000"
                width="20"
                height="20"
                version="1.1"
                id="Layer_1"
                viewBox="0 0 512 512"
                // xml:space="preserve"
              >
                <g>
                  <path d="M214.3,266.1c-3.8-1.7-9-2.6-15.8-2.7h-39v42.2H198c6.9,0,12.2-0.9,16-2.8c7-3.5,10.4-10,10.4-19.7   C224.4,274.9,221,269.2,214.3,266.1z" />
                  <path d="M344.1,244.5c-4.9-4.2-11-6.3-18.2-6.3c-7.8,0-13.9,2.2-18.3,6.7c-4.3,4.5-7,10.5-8.2,18.1h52.7   C351.7,254.9,348.9,248.8,344.1,244.5z" />
                  <path d="M214.8,233.3c4.3-2.6,6.4-7.3,6.4-13.9c0-7.4-2.8-12.2-8.5-14.6c-4.9-1.6-11.1-2.5-18.7-2.5h-34.4v34.9H198   C204.9,237.3,210.4,236,214.8,233.3z" />
                  <path d="M0,0v512h512V0L0,0L0,0z M291.6,182.3h67.8V202h-67.8L291.6,182.3L291.6,182.3z M250.7,310.6c-3,4.9-6.7,9.1-11.2,12.4   c-5,3.9-11,6.5-17.9,8c-6.9,1.4-14.3,2.1-22.4,2.1H128V174.9h76.5c19.3,0.3,33,5.9,41,16.9c4.8,6.7,7.2,14.8,7.2,24.2   c0,9.6-2.4,17.4-7.3,23.3c-2.7,3.3-6.8,6.3-12.1,9c8.1,3,14.2,7.6,18.3,14s6.2,14.1,6.2,23.2C257.8,294.7,255.4,303.1,250.7,310.6z    M384,283.2h-85.2c0.5,11.7,4.5,20,12.2,24.7c4.7,2.9,10.3,4.4,16.9,4.4c6.9,0,12.6-1.8,17-5.4c2.4-1.9,4.5-4.6,6.3-8.1h31.2   c-0.8,6.9-4.6,14-11.3,21.2c-10.5,11.4-25.1,17.1-44,17.1c-15.6,0-29.3-4.8-41.2-14.4c-11.9-9.6-17.9-25.2-17.9-46.8   c0-20.3,5.4-35.8,16.1-46.6c10.8-10.8,24.7-16.2,41.8-16.2c10.2,0,19.4,1.8,27.5,5.5c8.2,3.6,14.9,9.4,20.2,17.3   c4.8,6.9,7.9,15,9.3,24.2C383.8,265.4,384.1,273.1,384,283.2z" />
                </g>
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/azizulislamux/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-gray-300 hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>

          {/* Interactive Skills */}
          <InteractiveSkills />
        </div>
      </div>
    </section>
  );
}
