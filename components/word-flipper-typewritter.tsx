"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Palette } from "lucide-react";

export function WordFlipperTypewriter() {
  const [index, setIndex] = useState(0);
  const words = ["Profession", "Designer"];
  const [displayedText, setDisplayedText] = useState({
    left: words[0],
    right: words[1],
  });
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const typingInterval = 2800; // Total cycle time
    const typingSpeed = 80; // Time per character

    const interval = setInterval(() => {
      setIsTyping(true);

      // Erase first word
      const eraseLeft = async () => {
        for (let i = displayedText.left.length; i >= 0; i--) {
          await new Promise((resolve) => setTimeout(resolve, typingSpeed));
          setDisplayedText((prev) => ({
            ...prev,
            left: prev.left.substring(0, i),
          }));
        }

        // Type new word
        const newLeftWord = index === 0 ? words[1] : words[0];
        for (let i = 0; i <= newLeftWord.length; i++) {
          await new Promise((resolve) => setTimeout(resolve, typingSpeed));
          setDisplayedText((prev) => ({
            ...prev,
            left: newLeftWord.substring(0, i),
          }));
        }
      };

      // Erase second word
      const eraseRight = async () => {
        for (let i = displayedText.right.length; i >= 0; i--) {
          await new Promise((resolve) => setTimeout(resolve, typingSpeed));
          setDisplayedText((prev) => ({
            ...prev,
            right: prev.right.substring(0, i),
          }));
        }

        // Type new word
        const newRightWord = index === 0 ? words[0] : words[1];
        for (let i = 0; i <= newRightWord.length; i++) {
          await new Promise((resolve) => setTimeout(resolve, typingSpeed));
          setDisplayedText((prev) => ({
            ...prev,
            right: newRightWord.substring(0, i),
          }));
        }

        setIsTyping(false);
      };

      // Run both animations
      eraseLeft();
      eraseRight();

      // Update index for next cycle
      setIndex((prev) => (prev + 1) % words.length);
    }, typingInterval);

    return () => clearInterval(interval);
  }, [index, displayedText]);

  return (
    <div className="flex items-center gap-3">
      <div className="bg-gray-100 p-2 rounded-full">
        <Palette className="h-6 w-6 text-gray-700" />
      </div>

      <div className="flex items-center">
        {/* First word with cursor */}
        <div className="relative w-[110px] h-8 flex items-center">
          <span className="text-xl font-semibold">{displayedText.left}</span>
          {isTyping && (
            <motion.span
              className="inline-block w-0.5 h-6 bg-black ml-0.5"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
            />
          )}
        </div>

        {/* Middle "by" */}
        <span className="text-xl font-semibold mx-2">by</span>

        {/* Second word with cursor */}
        <div className="relative w-[110px] h-8 flex items-center">
          <span className="text-xl font-semibold">{displayedText.right}</span>
          {isTyping && (
            <motion.span
              className="inline-block w-0.5 h-6 bg-black ml-0.5"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
