import { getPlaygroundImages } from "@/lib/notion";
import { InfiniteCanvas } from "./infinite-canvas";

export const dynamic = "force-dynamic"; // 👈 This disables static rendering + caching

export default async function InfiniteCanvasServer() {
  const playgroundImages = await getPlaygroundImages();

  return <InfiniteCanvas projects={playgroundImages} />;
}
