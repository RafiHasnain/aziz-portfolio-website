"use client";

import { useState } from "react";
import { Copy, Twitter, Instagram, Linkedin } from "lucide-react";
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
    <section className="py-20 bg-white">
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
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="https://dribbble.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
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
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
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
