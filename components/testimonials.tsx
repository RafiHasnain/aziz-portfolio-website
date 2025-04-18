"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Define the testimonial interface
interface Testimonial {
  id: string;
  company: string;
  logo: string;
  quote: string;
  author: {
    name: string;
    title: string;
    avatar: string;
  };
}

// Define the testimonials data
const testimonials: Testimonial[] = [
  {
    id: "nairobi",
    company: "Nairobi",
    logo: "/images/test-logo.png",
    quote:
      "They were very willing to attempt and deliver on anything we threw at them. The team missed no deadline and ensured a seamless workflow through effective communication. Their can-do attitude and value for money were outstanding",
    author: {
      name: "Dominik Oppelt",
      title: "Co-Founder of Nairobi",
      avatar: "/images/test-ceo-logo.png",
    },
  },
  {
    id: "berlin",
    company: "Berlin",
    logo: "/images/test-logo-1.png",
    quote:
      "Working with Aziz was a game-changer for our product design. Their attention to detail and understanding of user experience principles helped us create an intuitive interface that our customers love.",
    author: {
      name: "Sarah Müller",
      title: "Product Manager at Berlin",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  },
  {
    id: "manila",
    company: "Manila",
    logo: "/images/test-logo-2.png",
    quote:
      "Aziz brought fresh ideas and innovative solutions to our project. Their ability to translate complex requirements into clean, user-friendly designs exceeded our expectations. We'll definitely work together again.",
    author: {
      name: "Miguel Santos",
      title: "CTO of Manila",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  },
  {
    id: "aiken",
    company: "Aiken",
    logo: "/images/test-logo-3.png",
    quote:
      "The designs delivered by Aziz perfectly captured our brand essence while improving usability. Their collaborative approach made the entire process smooth and enjoyable. Highly recommended!",
    author: {
      name: "Jessica Chen",
      title: "Creative Director at Aiken",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  },
  {
    id: "swiss",
    company: "Swiss",
    logo: "/images/test-logo-4.png",
    quote:
      "Precision and quality define Aziz's work. They took the time to understand our specific needs and delivered designs that not only look beautiful but also perform exceptionally well. A true professional.",
    author: {
      name: "Thomas Weber",
      title: "Head of Digital at Swiss",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  },
  {
    id: "ararat",
    company: "Ararat",
    logo: "/images/test-logo-5.png",
    quote:
      "Aziz's design expertise transformed our product. They have a unique ability to balance aesthetics with functionality, creating interfaces that are both beautiful and highly usable. We're extremely satisfied with the results.",
    author: {
      name: "Aram Petrosian",
      title: "CEO of Ararat",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  },
];

export function Testimonials() {
  const [activeTestimonial, setActiveTestimonial] = useState<string>("nairobi");

  const currentTestimonial =
    testimonials.find((t) => t.id === activeTestimonial) || testimonials[0];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto border border-dashed border-gray-300 rounded-xl p-8">
          {/* Featured Testimonial */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center text-center mb-12"
            >
              {/* Company Logo */}
              <div className="mb-8">
                <Image
                  src={currentTestimonial.logo || "/placeholder.svg"}
                  alt={currentTestimonial.company}
                  width={120}
                  height={50}
                  className="h-12 w-auto"
                />
              </div>

              {/* Testimonial Quote */}
              <blockquote className="text-gray-600 text-lg max-w-3xl mb-8">
                "{currentTestimonial.quote}"
              </blockquote>

              {/* Author Info */}
              <div className="flex gap-5 items-center">
                <div className="w-16 h-16 rounded-full overflow-hidden mb-3">
                  <Image
                    src={currentTestimonial.author.avatar || "/placeholder.svg"}
                    alt={currentTestimonial.author.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">
                    {currentTestimonial.author.name}
                  </h4>
                  <p className="text-gray-500">
                    {currentTestimonial.author.title}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Client Logos */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 pt-8 border-t border-dashed border-gray-300">
            {testimonials.map((testimonial) => (
              <button
                key={testimonial.id}
                onClick={() => setActiveTestimonial(testimonial.id)}
                className={`flex items-center justify-center transition-all duration-300 ${
                  activeTestimonial === testimonial.id
                    ? "opacity-100 scale-110"
                    : "opacity-70 grayscale hover:opacity-100 hover:grayscale-0"
                }`}
                aria-label={`View testimonial from ${testimonial.company}`}
              >
                <Image
                  src={testimonial.logo || "/placeholder.svg"}
                  alt={testimonial.company}
                  width={100}
                  height={40}
                  className="h-8 w-auto"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
