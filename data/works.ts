export type WorkCategory =
  | "Web Design"
  | "Mobile Apps"
  | "SaaS Products"
  | "Case Study"
  | "All";

export interface WorkItem {
  id: string;
  title: string;
  description: string;
  categories: WorkCategory[];
  tags: string[];
  image: string;
  conversion: string;
  satisfaction: string;
  livePreviewUrl?: string;
  caseStudyUrl?: string;
}

export const works: WorkItem[] = [
  {
    id: "work-1",
    title: "Dynamatic - Platform for Shopify personalized Upells",
    description:
      "With user-centered approach, the goals was to create an intuitive interface for effortless financial management while incorporating gamification.",
    categories: ["Web Design", "SaaS Products"],
    tags: ["UX Research", "Web Application", "Product Design"],
    image: "/images/my-work-1.png",
    conversion: "45%",
    satisfaction: "4.5*",
    livePreviewUrl: "#",
    caseStudyUrl: "#",
  },
  {
    id: "work-2",
    title: "FinTrack - Financial Dashboard App",
    description:
      "With user-centered approach, the goals was to create an intuitive interface for effortless financial management while incorporating gamification.",
    categories: ["Mobile Apps", "SaaS Products"],
    tags: ["UX Research", "Mobile Application", "Product Design"],
    image: "/images/my-work-1.png",
    conversion: "52%",
    satisfaction: "4.7*",
    livePreviewUrl: "#",
    caseStudyUrl: "#",
  },
  {
    id: "work-3",
    title: "EcoShop - Sustainable E-commerce Platform",
    description:
      "With user-centered approach, the goals was to create an intuitive interface for effortless financial management while incorporating gamification.",
    categories: ["Web Design", "Case Study"],
    tags: ["UX Research", "Web Application", "E-commerce"],
    image: "/images/my-work-1.png",
    conversion: "38%",
    satisfaction: "4.3*",
    livePreviewUrl: "#",
    caseStudyUrl: "#",
  },
  {
    id: "work-4",
    title: "HealthTrack - Fitness Monitoring App",
    description:
      "With user-centered approach, the goals was to create an intuitive interface for effortless financial management while incorporating gamification.",
    categories: ["Mobile Apps", "Case Study"],
    tags: ["UX Research", "Mobile Application", "Health Tech"],
    image: "/images/my-work-1.png",
    conversion: "61%",
    satisfaction: "4.8*",
    livePreviewUrl: "#",
    caseStudyUrl: "#",
  },
];

export const categories: WorkCategory[] = [
  "All",
  "Web Design",
  "Mobile Apps",
  "SaaS Products",
  "Case Study",
];
