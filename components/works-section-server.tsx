// app/components/works-section-server.tsx (Server Component)
import { getWorks } from "@/lib/notion";
import { WorkClientSection } from "./works-section-client";

export const dynamic = "force-dynamic"; // 👈 This disables static rendering + caching

export default async function WorksSectionServer() {
  const works = await getWorks();

  return <WorkClientSection works={works} />;
}
