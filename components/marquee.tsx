"use client";

import type React from "react";

import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: number; // Lower is faster
  pauseOnHover?: boolean;
  className?: string;
  fade?: boolean; // Whether to add fade effect on sides
  fadeWidth?: number; // Width of the fade effect in pixels
}

export function Marquee({
  children,
  direction = "left",
  speed = 40,
  pauseOnHover = true,
  className,
  fade = true,
  fadeWidth = 100,
}: MarqueeProps) {
  const [looperInstances, setLooperInstances] = useState(1);
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Calculate how many instances we need to create a seamless loop
    const calculateInstances = () => {
      if (!innerRef.current || !outerRef.current) return;

      const outerWidth = outerRef.current.getBoundingClientRect().width;
      const innerWidth = innerRef.current.getBoundingClientRect().width;

      // We need enough instances to cover the container width at least twice
      // to ensure a seamless loop
      const instances = Math.ceil(outerWidth / innerWidth) + 1;

      setLooperInstances(Math.max(instances, 2)); // At least 2 instances
    };

    calculateInstances();
    window.addEventListener("resize", calculateInstances);
    return () => window.removeEventListener("resize", calculateInstances);
  }, []);

  return (
    <div className={cn("relative", className)}>
      {/* Main marquee container with overflow hidden */}
      <div ref={outerRef} className="flex overflow-hidden relative">
        <div
          className={cn(
            "flex min-w-full flex-nowrap",
            direction === "right"
              ? "animate-marquee-right"
              : "animate-marquee-left",
            pauseOnHover && "hover:[animation-play-state:paused]"
          )}
          style={{
            animationDuration: `${speed}s`,
          }}
        >
          {/* Original set of items */}
          <div
            ref={innerRef}
            className="flex items-center justify-around flex-shrink-0"
          >
            {children}
          </div>

          {/* Cloned sets for seamless looping */}
          {Array(looperInstances)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-around flex-shrink-0"
              >
                {children}
              </div>
            ))}
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
