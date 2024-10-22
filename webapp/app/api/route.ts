import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function GET(req: NextRequest, res: NextResponse) {
  const beers = await prisma.beer.findMany();
  return NextResponse.json(beers, { status: 200 });
}

export async function POST(req: NextRequest, res: NextResponse) {
  const { name, description, price, image } = await req.json();
  try {
    const beer = await prisma.beer.create({
      data: {
        name,
        description,
        price,
        image,
      },
    });
    return NextResponse.json(beer, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    } else {
      return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
  }
}
