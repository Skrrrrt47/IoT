import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const tables = await prisma.table.findMany();
    return NextResponse.json(tables, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  const { status, capacity } = await req.json();
  try {
    const table = await prisma.table.create({
      data: {
        status,
        capacity,
      },
    });
    return NextResponse.json(table, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    } else {
      return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
  }
}
