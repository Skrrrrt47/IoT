import { NextResponse, NextRequest } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { role, userId } = await req.json();
  console.log(role, userId);
  const client = await clerkClient();
  await client.users.updateUserMetadata(userId, {
    publicMetadata: {
      role,
    },
  });
  return NextResponse.json({ success: true });
}
