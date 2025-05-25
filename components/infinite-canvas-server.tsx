import { InfiniteCanvas } from "./infinite-canvas";

// // Cache the API response to prevent excessive API calls
// let cachedProjects: any[] | null = null;
// let lastFetchTime = 0;
// const CACHE_DURATION = 60 * 1000; // 1 minute cache

// export default async function InfiniteCanvasServer() {
//   try {
//     const now = Date.now();

//     // Use cached data if available and fresh
//     if (cachedProjects && now - lastFetchTime < CACHE_DURATION) {
//       return <InfiniteCanvas projects={cachedProjects} />;
//     }

//     // Fix the URL (remove double slash) and use relative URL for better reliability
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_SITE_URL}/api/playground`,
//       {
//         next: { revalidate: 60 }, // Revalidate every minute
//       }
//     );

//     if (!res.ok) {
//       throw new Error(`Failed to fetch data: ${res.status}`);
//     }

//     const playgroundImages = await res.json();

//     // Validate and filter the data
//     const validProjects = Array.isArray(playgroundImages)
//       ? playgroundImages.filter(
//           (project) =>
//             project?.properties?.image?.files?.[0]?.file?.url &&
//             project?.properties?.title?.title?.[0]?.plain_text
//         )
//       : [];

//     // Update cache
//     cachedProjects = validProjects;
//     lastFetchTime = now;

//     // If we have no valid projects, show error message
//     if (validProjects.length === 0) {
//       return (
//         <div className="min-h-screen flex items-center justify-center bg-white">
//           <div className="text-center">
//             <h1 className="text-2xl font-bold text-gray-900 mb-2">
//               No projects found
//             </h1>
//             <p className="text-gray-500">
//               Please check your API configuration and try again.
//             </p>
//           </div>
//         </div>
//       );
//     }

//     return <InfiniteCanvas projects={validProjects} />;
//   } catch (error) {
//     console.error("Error fetching playground data:", error);

//     return (
//       <div className="min-h-screen flex items-center justify-center bg-white">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">
//             Error loading projects
//           </h1>
//           <p className="text-gray-500">
//             Please refresh the page or try again later.
//           </p>
//         </div>
//       </div>
//     );
//   }
// }




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
