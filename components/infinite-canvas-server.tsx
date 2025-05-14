import { getPlaygroundImages } from "@/lib/notion";
import { InfiniteCanvas } from "./infinite-canvas";

// Force this component to always fetch fresh data
export const fetchCache = "force-no-store";

export default async function InfiniteCanvasServer() {
  const playgroundImages = await getPlaygroundImages();

  return <InfiniteCanvas projects={playgroundImages} />;
}
