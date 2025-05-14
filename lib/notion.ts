// lib/notion.ts
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

const workDatabaseId = process.env.NOTION_WORK_DATABASE_ID!;
const playgroundDatabaseId = process.env.NOTION_PLAYGROUND_DATABASE_ID!;

export async function getWorks() {
  const response = await notion.databases.query({
    database_id: workDatabaseId,
    filter: {
      property: "Published",
      checkbox: { equals: true },
    },
  });

  return response.results;
}

export async function getPlaygroundImages() {
  const response = await notion.databases.query({
    database_id: playgroundDatabaseId,
    filter: {
      property: "Published",
      checkbox: { equals: true },
    },
  });

  return response.results;
}
