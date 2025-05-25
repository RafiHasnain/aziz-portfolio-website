"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  project: any;
  rotation?: number;
  // isImageVisible?: boolean;
  imageUrl?: string;
  // cachedImage?: HTMLImageElement;
  // isLoaded?: boolean;
}


export function ProjectCard({ project, rotation = 0, imageUrl }: ProjectCardProps) {
  const title = project.properties.title.title[0].plain_text;

  return (
    <div className="group relative w-[600px] h-[400px] bg-white rounded-2xl shadow-2xl overflow-hidden"
         style={{ transform: `rotate(${rotation}deg)` }}>
      <img
        src={imageUrl || "/images/placeholder.svg"}
        alt={title || 'Portfolio Image'}
        className="w-full h-full object-cover"
        draggable={false}
      />
       {/* <Image
        src={imageUrl || "/images/placeholder.svg"}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 600px"
        className="w-full h-full object-cover"
        draggable={false}
      /> */}
      {/* <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <h3 className="text-white text-2xl font-bold text-center">{title}</h3>
      </div> */}
    </div>
  );
}
