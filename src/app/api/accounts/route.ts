import { NextResponse } from "next/server";

import { connectToDatabase } from "@/lib/mongodb";
import Account from "@/models/account";

export async function GET() {
  await connectToDatabase();
  const accounts = await Account.find({});
  return NextResponse.json(accounts);
}

export async function POST(req: Request) {
  await connectToDatabase();
  const { email, name } = await req.json();
  const account = await Account.create({ email, name });
  return NextResponse.json(account);
}
