import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function GET(req: NextRequest, res: NextResponse) {
  const users = await prisma.user.findMany();
  return Response.json(users);
}

export async function POST(req: NextRequest, res: NextResponse) {
  const { email, name, password } = await req.json();
  try {
    const user = await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: password,
      },
    });
    return Response.json(user);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Response.json({ error: error.message });
    } else {
      return Response.json({ error: "An unknown error occurred" });
    }
  }
}
