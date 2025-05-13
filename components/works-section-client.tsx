"use client";

import { useState } from "react";
import { works, categories, type WorkCategory } from "@/data/works";
import { WorkCard } from "./work-card";
import { Button } from "@/components/ui/button";

export function WorkClientSection({ studies }: { studies: any[] }) {
  console.log({ studies });
  const [activeCategory, setActiveCategory] =
    useState<WorkCategory>("Web Design");

  // const filteredWorks = works.filter((work) =>
  //   work.categories.includes(activeCategory)
  // );

  const filteredWorks = studies.filter((work) =>
    work.properties.Category?.multi_select?.some(
      (c: any) => c.name === activeCategory
    )
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
        {/* <div className="space-y-8">
          {filteredWorks.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div> */}

        <div className="space-y-8">
          {filteredWorks.map((item: any) => {
            const props = item.properties;
            const work = {
              id: item.id,
              title: props.title?.title?.[0]?.plain_text ?? "Untitled",
              description: props.description?.rich_text?.[0]?.plain_text ?? "",
              tags: props.tags?.multi_select?.map((t: any) => t.name) || [],
              image: props.image?.files?.[0]?.file?.url ?? "/placeholder.svg",
              conversion: props.conversion?.number ?? "—",
              satisfaction: props.satisfaction?.number ?? "—",
              color: "",
              livePreviewUrl: props.livePreview?.url ?? null,
              caseStudyUrl: props.caseStudyUrl?.url ?? null,
              categories: props.category?.multi_select?.map((c: any) => c.name),
            };

            return <WorkCard key={work.id} work={work} />;
          })}
        </div>
      </div>
    </section>
  );
}
