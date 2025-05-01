"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette } from "lucide-react";
import Image from "next/image";

export function WordFlipperSlide() {
  const [index, setIndex] = useState(0);
  const words = ["Profession", "Designer"];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-3">
      <div className="bg-gray-100 p-2 rounded-full">
        {/* <Palette className="h-6 w-6 text-gray-700" /> */}
        <Image
          src="/images/figma-logo.png"
          alt="Travel photo"
          width={250}
          height={350}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex items-center">
        {/* First word container */}
        <div className="relative w-[170px] h-12 overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.div
              key={`word-1-${index}`}
              className="absolute flex items-center"
              initial={{
                y: index % 2 === 0 ? 30 : -30,
                opacity: 0,
                filter: "blur(8px)",
              }}
              animate={{
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
              }}
              exit={{
                y: index % 2 === 0 ? -30 : 30,
                opacity: 0,
                filter: "blur(8px)",
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                opacity: { duration: 0.2 },
              }}
            >
              <span className="text-[32px] font-semibold">
                {index === 0 ? words[0] : words[1]}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Middle "by" with highlight effect */}
        <motion.div className="mx-2 relative">
          <motion.span className="text-[32px] font-semibold relative z-10">
            by
          </motion.span>
          <motion.div
            className="absolute inset-0 -m-1 rounded-md bg-yellow-200 z-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0, 0.15, 0],
              scale: [0.8, 1.2, 0.8],
              transition: {
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 1.5,
              },
            }}
          />
        </motion.div>

        {/* Second word container */}
        <div className="relative w-[170px] h-12 overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.div
              key={`word-2-${index}`}
              className="absolute flex items-center"
              initial={{
                y: index % 2 === 0 ? -30 : 30,
                opacity: 0,
                filter: "blur(8px)",
              }}
              animate={{
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
              }}
              exit={{
                y: index % 2 === 0 ? 30 : -30,
                opacity: 0,
                filter: "blur(8px)",
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                opacity: { duration: 0.2 },
              }}
            >
              <span className="text-[32px] font-semibold">
                {index === 0 ? words[1] : words[0]}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
