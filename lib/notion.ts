import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

const workDatabaseId = process.env.NOTION_WORK_DATABASE_ID!;
const playgroundDatabaseId = process.env.NOTION_PLAYGROUND_DATABASE_ID!;

export async function getWorks({
  cache,
}: { cache?: "no-store" | "force-cache" } = {}) {
  const response = await fetchWorks(cache);
  return response.results;
}

export async function getPlaygroundImages({
  cache,
}: { cache?: "no-store" | "force-cache" } = {}) {
  const response = await fetchPlaygrounds(cache);
  return response.results;
}

// Internal functions to wrap Notion query and control cache
async function fetchWorks(cache: "no-store" | "force-cache" = "force-cache") {
  return await fetchData(
    () =>
      notion.databases.query({
        database_id: workDatabaseId,
        filter: {
          property: "Published",
          checkbox: { equals: true },
        },
      }),
    cache
  );
}

async function fetchPlaygrounds(
  cache: "no-store" | "force-cache" = "force-cache"
) {
  return await fetchData(
    () =>
      notion.databases.query({
        database_id: playgroundDatabaseId,
        filter: {
          property: "Published",
          checkbox: { equals: true },
        },
      }),
    cache
  );
}

// Generic cache-control wrapper
async function fetchData<T>(
  fn: () => Promise<T>,
  cache: "no-store" | "force-cache"
): Promise<T> {
  if (cache === "no-store") {
    // Disable Next.js caching by adding this dynamic function
    const dynamicFn = new Function("return " + fn.toString())();
    return await dynamicFn(); // force uncached fetch
  }
  return await fn(); // normal
}
