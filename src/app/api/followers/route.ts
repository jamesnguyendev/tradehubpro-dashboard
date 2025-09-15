import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";

import { connectToDatabase } from "@/lib/mongodb";
import Follower from "@/models/follower";

export async function GET() {
  await connectToDatabase();
  const follower = await Follower.find({}).sort({ createdAt: -1 }).lean();
  return NextResponse.json(follower);
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const { id, masterId, password } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    await Follower.create({ id, masterId, password: hashedPassword });

    return NextResponse.json({ status: 201 });
  } catch (error) {
    console.error("Error creating follower:", error);
    return NextResponse.json({ error: "Failed to create follower" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await connectToDatabase();

    const { id } = await req.json();

    await Follower.deleteOne({ id });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("Error deleting follower:", error);
    return NextResponse.json({ error: "Failed to delete follower" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectToDatabase();

    const { id, masterId, password } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    await Follower.findOneAndUpdate({ id }, { $set: { masterId, password: hashedPassword } }, { new: true });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("Error putting follower:", error);
    return NextResponse.json({ error: "Failed to put follower" }, { status: 500 });
  }
}
