"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Palette } from "lucide-react";

export function WordFlipper3D() {
  const [flipped, setFlipped] = useState(false);
  const words = ["Profession", "Designer"];

  useEffect(() => {
    const interval = setInterval(() => {
      setFlipped((prev) => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-3">
      <div className="bg-gray-100 p-2 rounded-full">
        <Palette className="h-6 w-6 text-gray-700" />
      </div>

      <div className="flex items-center">
        {/* First word with 3D flip */}
        <div className="relative h-8 w-[110px] perspective-[1000px]">
          <motion.div
            className="absolute w-full h-full flex items-center"
            animate={{
              rotateX: flipped ? 180 : 0,
              transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1], // Custom spring-like easing
              },
            }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front side */}
            <div
              className="absolute w-full h-full flex items-center backface-hidden"
              style={{ backfaceVisibility: "hidden" }}
            >
              <span className="text-xl font-semibold">{words[0]}</span>
            </div>

            {/* Back side */}
            <div
              className="absolute w-full h-full flex items-center backface-hidden"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateX(180deg)",
              }}
            >
              <span className="text-xl font-semibold">{words[1]}</span>
            </div>
          </motion.div>
        </div>

        {/* Middle "by" with subtle pulse */}
        <motion.span
          className="text-xl font-semibold mx-2"
          animate={{
            scale: [1, 1.1, 1],
            transition: {
              duration: 1.5,
              times: [0, 0.5, 1],
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 1.5,
            },
          }}
        >
          by
        </motion.span>

        {/* Second word with 3D flip - opposite direction */}
        <div className="relative h-8 w-[110px] perspective-[1000px]">
          <motion.div
            className="absolute w-full h-full flex items-center"
            animate={{
              rotateX: flipped ? 0 : 180,
              transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1], // Custom spring-like easing
              },
            }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front side */}
            <div
              className="absolute w-full h-full flex items-center backface-hidden"
              style={{ backfaceVisibility: "hidden" }}
            >
              <span className="text-xl font-semibold">{words[1]}</span>
            </div>

            {/* Back side */}
            <div
              className="absolute w-full h-full flex items-center backface-hidden"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateX(180deg)",
              }}
            >
              <span className="text-xl font-semibold">{words[0]}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
