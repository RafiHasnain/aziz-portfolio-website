import Link from "next/link";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/footer";

export default function ProjectPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar />

      {/* Back Button */}
      <div className="container mx-auto px-4 py-8">
        <Link href="/playground">
          <Button
            variant="ghost"
            className="flex items-center gap-2 pl-0 text-gray-600 hover:bg-transparent hover:text-black"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Playground
          </Button>
        </Link>
      </div>

      {/* Project Content */}
      <section className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-4 text-3xl font-bold md:text-4xl">
            3D Product Configurator
          </h1>
          <div className="flex items-center gap-4">
            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
              3D / WebGL
            </span>
            <span className="text-sm text-gray-500">June 2023</span>
          </div>
        </div>

        {/* Project Image/Demo */}
        <div className="mb-12 aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
          <div className="flex h-full items-center justify-center">
            <p className="text-gray-500">
              Interactive 3D demo would be displayed here
            </p>
          </div>
        </div>

        {/* Project Description */}
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 text-2xl font-semibold">About this project</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              This interactive 3D product configurator allows users to customize
              various aspects of a product in real-time. Built with Three.js, it
              demonstrates how 3D visualization can enhance the online shopping
              experience.
            </p>
            <p>
              Users can change colors, materials, and components while viewing
              the product from any angle. The configurator includes realistic
              lighting and shadows to provide an accurate representation of the
              final product.
            </p>
            <p>
              This experiment explores the potential of WebGL for e-commerce
              applications and how it can bridge the gap between digital
              shopping and physical products.
            </p>
          </div>

          {/* Technologies Used */}
          <div className="mt-8">
            <h3 className="mb-2 text-lg font-semibold">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                Three.js
              </span>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                WebGL
              </span>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                React
              </span>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                GLSL Shaders
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
