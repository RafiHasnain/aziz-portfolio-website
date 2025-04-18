import Image from "next/image";
import { ArrowUpRight, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { WorkItem } from "@/data/works";

interface WorkCardProps {
  work: WorkItem;
}

export function WorkCard({ work }: WorkCardProps) {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-8 mb-8 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4 flex flex-col justify-evenly">
          <div>
            <h3 className="text-[32px] font-bold text-gray-800">
              {work.title}
            </h3>
            <p className="text-base text-[#BFBFBF]">{work.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {work.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-white text-gray-400 italic"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            {work.livePreviewUrl && (
              <Button
                variant="secondary"
                className="rounded-full bg-black text-white hover:bg-gray-800"
              >
                {/* <Eye className="mr-2 h-4 w-4" /> */}
                Live Preview 💻
              </Button>
            )}

            {work.caseStudyUrl && (
              <Button variant="ghost" className="rounded-full border-gray-300">
                View Casestudy <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-6 flex flex-col justify-end">
          {/* <div className="bg-white rounded-lg p-2 shadow-sm"> */}
          <Image
            src={work.image || "/placeholder.svg"}
            alt={work.title}
            width={363}
            height={223}
            className="w-full h-auto object-cover rounded-lg shadow-sm"
          />
          {/* </div> */}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 text-lg">Conversion</p>
              <p className="text-[32px] font-bold italic">{work.conversion}</p>
            </div>
            <div>
              <p className="text-gray-600 text-lg">User Satisfaction</p>
              <p className="text-[32px] font-bold italic">
                {work.satisfaction}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
