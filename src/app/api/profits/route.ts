import { NextResponse } from "next/server";

import { connectToDatabase } from "@/lib/mongodb";
import Profit from "@/models/profit";

export async function GET() {
  await connectToDatabase();
  const profit = await Profit.find({}).sort({ createdAt: -1 }).lean();
  return NextResponse.json(profit);
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const { id, masterId, profit } = await req.json();

    await Profit.create({ id, masterId, profit });

    return NextResponse.json({ status: 201 });
  } catch (error) {
    console.error("Error creating Profit:", error);
    return NextResponse.json({ error: "Failed to create Profit" }, { status: 500 });
  }
}

// export async function DELETE(req: Request) {
//   try {
//     await connectToDatabase();

//     const { id } = await req.json();

//     await Master.deleteOne({ id });

//     return NextResponse.json({ status: 200 });
//   } catch (error) {
//     console.error("Error deleting Master:", error);
//     return NextResponse.json({ error: "Failed to delete Master" }, { status: 500 });
//   }
// }

// export async function PUT(req: Request) {
//   try {
//     await connectToDatabase();

//     const { id, server, period, percent, balance, name, password } = await req.json();

//     const hashedPassword = await bcrypt.hash(password, 10);

//     if (!id) {
//       return NextResponse.json({ error: "Missing Master id" }, { status: 400 });
//     }

//     await Master.findOneAndUpdate(
//       { id },
//       { $set: { server, period, percent, balance, name, password: hashedPassword } },
//       { new: true },
//     );

//     return NextResponse.json({ status: 200 });
//   } catch (error) {
//     console.error("Error putting Master:", error);
//     return NextResponse.json({ error: "Failed to put Master" }, { status: 500 });
//   }
// }
