"use client";

import type React from "react";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: "slow" | "normal" | "fast";
  pauseOnHover?: boolean;
  className?: string;
  fade?: boolean; // Whether to add fade effect on sides
  fadeWidth?: number; // Width of the fade effect in pixels
}

export function Marquee({
  children,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
  fade = true,
  fadeWidth = 100,
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollerRef.current) return;

    // Clone the content for seamless scrolling
    const scrollerContent = Array.from(scrollerRef.current.children);
    scrollerContent.forEach((item) => {
      const duplicate = item.cloneNode(true);
      scrollerRef.current?.appendChild(duplicate);
    });
  }, []);

  const speedClass = {
    slow: "animate-marquee-slow",
    normal: "animate-marquee-normal",
    fast: "animate-marquee-fast",
  };

  return (
    <div className={cn("relative", className)}>
      <div
        ref={containerRef}
        className={cn(
          "flex overflow-hidden w-full relative",
          pauseOnHover && "hover:[&>div]:pause",
          className
        )}
      >
        <div
          ref={scrollerRef}
          className={cn(
            "flex min-w-full flex-nowrap",
            speedClass[speed],
            direction === "right"
              ? "animate-marquee-reverse"
              : "animate-marquee"
          )}
        >
          {children}
        </div>
      </div>
      {/* Fade effect overlays */}
      {fade && (
        <>
          {/* Left fade */}
          <div
            className="pointer-events-none absolute left-0 top-0 z-10 h-full"
            style={{
              width: `${fadeWidth}px`,
              background: "linear-gradient(to right, white, transparent)",
            }}
            aria-hidden="true"
          />

          {/* Right fade */}
          <div
            className="pointer-events-none absolute right-0 top-0 z-10 h-full"
            style={{
              width: `${fadeWidth}px`,
              background: "linear-gradient(to left, white, transparent)",
            }}
            aria-hidden="true"
          />
        </>
      )}
    </div>
  );
}
