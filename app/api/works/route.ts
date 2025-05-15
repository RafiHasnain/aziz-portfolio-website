// app/api/works/route.ts
import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const workDatabaseId = process.env.NOTION_WORK_DATABASE_ID!;

export async function GET() {
  try {
    const response = await notion.databases.query({
      database_id: workDatabaseId,
      filter: {
        property: "Published",
        checkbox: { equals: true },
      },
    });

    return NextResponse.json(response.results);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
