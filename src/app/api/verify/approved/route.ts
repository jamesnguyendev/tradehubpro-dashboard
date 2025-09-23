import { NextResponse } from "next/server";

import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const { id } = await req.json();

    await User.findOneAndUpdate({ _id: id }, { $set: { verify: "approved" } });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("Error approved user:", error);
    return NextResponse.json({ error: "Failed to approved user" }, { status: 500 });
  }
}
