import { NextResponse } from "next/server";

import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";

export async function GET() {
  await connectToDatabase();
  const users = await User.find({}).sort({ createdAt: -1 }).lean();
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const { name, email, phone } = await req.json();

    await User.create({ name, email, phone, verify: "pending" });

    return NextResponse.json({ status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await connectToDatabase();

    const { id } = await req.json();

    await User.deleteOne({ _id: id });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("Error deleting User:", error);
    return NextResponse.json({ error: "Failed to delete User" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectToDatabase();

    const { id, name, email, phone } = await req.json();

    await User.findOneAndUpdate({ _id: id }, { $set: { name, email, phone } }, { new: true });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("Error putting User:", error);
    return NextResponse.json({ error: "Failed to put User" }, { status: 500 });
  }
}
