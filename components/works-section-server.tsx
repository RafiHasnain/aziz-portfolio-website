// app/components/works-section-server.tsx (Server Component)
// import { getWorks } from "@/lib/notion";
import { WorkClientSection } from "./works-section-client";

// export default async function WorksSectionServer() {
//   const works = await getWorks();

//   return <WorkClientSection works={works} />;
// }

// app/components/works-section-server.tsx
export const dynamic = "force-dynamic"; // Disable all caching

export default async function WorksSectionServer() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/works`, {
    cache: "no-store", // Force fresh fetch every time
  });

  const works = await res.json();
  return <WorkClientSection works={works} />;
}
