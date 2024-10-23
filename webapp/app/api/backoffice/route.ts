import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function GET(req: NextRequest, res: NextResponse) {
  const beers = await prisma.command.findMany();
  return NextResponse.json(beers, { status: 200 });
}

export async function POST(req: NextRequest, res: NextResponse) {
  const { nb_beers, beer_id, date, table_id, price } = await req.json();
  try {
    const command = await prisma.command.create({
      data: {
        nb_beers,
        beer_id,
        date,
        table_id,
        price,
      },
    });
    return NextResponse.json(command, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    } else {
      return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
  }
}
