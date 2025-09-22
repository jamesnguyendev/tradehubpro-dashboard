import { NextResponse } from "next/server";

import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";

export async function GET(req: Request) {
  await connectToDatabase();

  const { searchParams } = new URL(req.url);
  const verify = searchParams.get("verify");

  const filter = verify ? { verify } : {};

  const verifies = await User.find(filter).sort({ createdAt: -1 }).lean();

  return NextResponse.json(verifies);
}
