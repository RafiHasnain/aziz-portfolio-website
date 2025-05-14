import { getPlaygroundImages } from "@/lib/notion";
import { InfiniteCanvas } from "./infinite-canvas";

export default async function InfiniteCanvasServer() {
  const playgroundImages = await getPlaygroundImages();

  return <InfiniteCanvas projects={playgroundImages} />;
}
