// app/components/works-section-server.tsx (Server Component)
import { getCaseStudies } from "@/lib/notion";
import { WorkClientSection } from "./works-section-client";

export default async function WorksSectionServer() {
  const studies = await getCaseStudies();

  return <WorkClientSection studies={studies} />;
}
