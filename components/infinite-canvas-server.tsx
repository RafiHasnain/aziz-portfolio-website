// import { getPlaygroundImages } from "@/lib/notion";
import { InfiniteCanvas } from "./infinite-canvas";

// export default async function InfiniteCanvasServer() {
//   const playgroundImages = await getPlaygroundImages();

//   return <InfiniteCanvas projects={playgroundImages} />;
// }

export const dynamic = "force-dynamic"; // Disable all caching

export default async function WorksSectionServer() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/playground`,
    {
      cache: "no-store", // Force fresh fetch every time
    }
  );

  const playgroundImages = await res.json();
  return <InfiniteCanvas projects={playgroundImages} />;
}
