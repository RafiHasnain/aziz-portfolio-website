import { getPlaygroundImages } from "@/lib/notion";
import { InfiniteCanvas } from "./infinite-canvas";

export default async function InfiniteCanvasServer() {
  const playgroundImages = await getPlaygroundImages({ cache: "no-store" });

  return <InfiniteCanvas projects={playgroundImages} />;
}
