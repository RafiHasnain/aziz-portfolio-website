import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientLayout from "@/components/ClientLayout"; // you'll create this

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mr. Aziz's Portfolio",
  description: "Product Designer specializing in complex SaaS solutions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
