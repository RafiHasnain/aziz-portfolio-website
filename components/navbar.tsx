"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
// import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isContact, setIsContact] = useState(false);
  const pathname = usePathname();
  const isPlayground = pathname.includes("/playground");
  const handleDownloadResume = () => {
    // Create a link element
    const link = document.createElement("a");
    link.href = "/resume.pdf"; // Path to your PDF in the public folder
    link.download = "Resume of Azizul Islam.pdf"; // Name for the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    console.log({ isContact });
  }, [isContact]);

  return (
    <div className="container mx-auto px-4 pt-4 sm:pt-6 lg:pt-8 flex justify-center fixed left-0 right-0 z-50 ">
      <div className="bg-white">
        <div className="bg-[#0C0C0C] opacity-80 text-white rounded-full px-3 py-2 sm:px-4 sm:py-2.5 lg:px-6 lg:py-3 flex items-center gap-2 sm:gap-4 lg:gap-8  drop-shadow-2xl shadow-xl">
          <Link
            href="/"
            onClick={() => setIsContact(false)}
            className={`${
              isPlayground || isContact
                ? " text-gray-400 hover:text-white "
                : "text-white"
            } transition-colors text-xs sm:text-sm lg:text-base whitespace-nowrap`}
          >
            Home
            <span
              className={`${
                isPlayground || isContact
                  ? "hidden"
                  : "fixed top-7 sm:top-8 md:top-10 left-7 sm:left-8 md:left-10 text-gray-500 text-xs sm:text-sm"
              }`}
            >
              ·
            </span>
          </Link>
          <span className="text-gray-500 text-xs sm:text-sm">·</span>
          <Link
            href="/playground"
            onClick={() => setIsContact(false)}
            className={`${
              isPlayground ? "text-white" : "text-gray-400 hover:text-white"
            } transition-colors text-xs sm:text-sm lg:text-base whitespace-nowrap`}
          >
            Playground
            <span
              className={`${
                !isPlayground || isContact
                  ? "hidden"
                  : "fixed top-7 sm:top-8 md:top-10 left-7 sm:left-8 md:left-10 text-gray-500 text-xs sm:text-sm"
              }`}
            >
              ·
            </span>
          </Link>
          <span className="text-gray-500 text-xs sm:text-sm">·</span>
          <Link
            href="#contact"
            onClick={() => setIsContact(true)}
            className={`${
              !isContact ? " text-gray-400 hover:text-white " : "text-white"
            } transition-colors text-xs sm:text-sm lg:text-base whitespace-nowrap`}
          >
            Contact
          </Link>
          <Button
            variant="ghost"
            onClick={handleDownloadResume}
            className="bg-gray-700 hover:bg-gray-600 rounded-full text-xs sm:text-sm px-2 sm:px-3 lg:px-4 h-7 sm:h-8 lg:h-9 whitespace-nowrap"
          >
            View Resume
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
