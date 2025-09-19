import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";

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

// export async function DELETE(req: Request) {
//   try {
//     await connectToDatabase();

//     const { id } = await req.json();

//     await User.deleteOne({ _id: id });

//     return NextResponse.json({ status: 200 });
//   } catch (error) {
//     console.error("Error deleting follower:", error);
//     return NextResponse.json({ error: "Failed to delete follower" }, { status: 500 });
//   }
// }

// export async function PUT(req: Request) {
//   try {
//     await connectToDatabase();

//     const { id, masterId, password } = await req.json();

//     const hashedPassword = await bcrypt.hash(password, 10);

//     if (!id) {
//       return NextResponse.json({ error: "Missing id" }, { status: 400 });
//     }

//     await Follower.findOneAndUpdate({ id }, { $set: { masterId, password: hashedPassword } }, { new: true });

//     return NextResponse.json({ status: 200 });
//   } catch (error) {
//     console.error("Error putting follower:", error);
//     return NextResponse.json({ error: "Failed to put follower" }, { status: 500 });
//   }
// }
