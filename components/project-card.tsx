"use client";

import { useState, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PlaygroundProject } from "@/data/playground-projects";

interface ProjectCardProps {
  project: any;
  rotation: number;
}

// Using memo to prevent unnecessary re-renders
export const ProjectCard = memo(function ProjectCard({
  project,
  rotation,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative w-[420px] overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 ease-out"
      style={{
        transform: isHovered
          ? "rotate(0deg) scale(1.05)"
          : `rotate(0deg) scale(1)`,
        transition: "transform 0.3s ease-out",
        boxShadow: isHovered
          ? "0 10px 30px rgba(0, 0, 0, 0.15)"
          : "0 4px 20px rgba(0, 0, 0, 0.08)",
        zIndex: isHovered ? 50 : 10,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project Image */}
      <div className="relative aspect-auto w-full overflow-hidden">
        <Image
          src={
            project?.properties?.image?.files?.[0]?.file?.url ??
            "/placeholder.svg"
          }
          alt={project?.properties?.title?.title?.[0]?.plain_text ?? "Untitled"}
          width={2350}
          height={2100}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          priority={false}
          loading="lazy"
        />

        {/* Overlay with arrow icon on hover */}
        {/* <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-30">
          <div className="rounded-full bg-white p-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
            <ArrowUpRight className="h-5 w-5 text-black" />
          </div>
        </div> */}
      </div>

      {/* Project Info */}
      {/* <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium text-gray-500">
            {project.category}
          </span>
          <span className="text-xs text-gray-400">{project.date}</span>
        </div>
        <h3 className="mb-1 text-lg font-semibold text-gray-900">
          {project.title}
        </h3>
        <p className="text-sm text-gray-600">{project.description}</p>
      </div> */}

      {/* Invisible link for the entire card */}
      {/* <Link
        href={project.link}
        className="absolute inset-0"
        aria-label={`View ${project.title} project`}
      /> */}
    </div>
  );
});
