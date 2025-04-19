"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import { InfiniteCanvas } from "@/components/infinite-canvas";
import { playgroundProjects } from "@/data/playground-projects";

export default function PlaygroundPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a short loading time to ensure components are ready
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="h-screen w-screen overflow-hidden bg-white text-gray-900">
      {/* Fixed navbar at the top */}
      <div className="absolute left-0 top-0 z-50 w-full">
        <Navbar />
      </div>

      {/* Loading state */}
      {isLoading ? (
        <div className="flex h-screen w-screen items-center justify-center bg-white">
          <div className="flex flex-col items-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-800"></div>
            <p className="mt-4 text-gray-600">Loading canvas...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Infinite canvas */}
          <InfiniteCanvas projects={playgroundProjects} />

          {/* Instructions overlay */}
          <div className="pointer-events-none absolute bottom-6 left-1/2 z-40 -translate-x-1/2 rounded-full bg-white/70 px-6 py-3 text-sm text-gray-700 shadow-md backdrop-blur-md">
            Click and drag to explore the infinite canvas
          </div>
        </>
      )}
    </main>
  );
}
