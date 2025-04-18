"use client";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <div className="container mx-auto px-4 pt-8 flex justify-center fixed left-0 right-0 z-50 ">
      <div className="bg-white">
        <div className="bg-[#0C0C0C] opacity-80 text-white rounded-full px-6 py-3 flex items-center gap-8 drop-shadow-2xl shadow-xl">
          <Link href="/" className="font-medium">
            Home
          </Link>
          <span className="text-gray-500">·</span>
          <Link
            href="/playground"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Playground
          </Link>
          <span className="text-gray-500">·</span>
          <Link
            href="#contact"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Contact
          </Link>
          <Button
            variant="ghost"
            className="bg-white/15 hover:bg-gray-600 rounded-full ml-4"
          >
            View Resume
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
