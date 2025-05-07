"use client";

import { useState } from "react";
import { works, categories, type WorkCategory } from "@/data/works";
import { WorkCard } from "./work-card";
import { Button } from "@/components/ui/button";

export function WorksSection() {
  const [activeCategory, setActiveCategory] =
    useState<WorkCategory>("Web Design");

  const filteredWorks = works.filter((work) =>
    work.categories.includes(activeCategory)
  );

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-[32px] font-bold text-center mb-12">My Works</h2>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12  ">
          <div className=" rounded-xl bg-gray-100">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                className={` ${
                  activeCategory === category
                    ? "bg-white text-[#0F0E1E] italic drop-shadow-md hover:bg-white"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Work Cards */}
        <div className="space-y-8">
          {filteredWorks.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
      </div>
    </section>
  );
}
