import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playground - Mr. Aziz's Portfolio",
  description: "Experimental projects and creative coding by Mr. Aziz",
};

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
