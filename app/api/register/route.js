import User from "@/models/User";
import connectDb from "@/utils/db";

const { NextResponse } = require("next/server");

export async function POST(req) {
  await connectDb();
  const body = await req.json();
  const { email, password, role } = body;
  try {
    await new User({ email, password, role }).save();
    return NextResponse.json({ message: "User Created Successfully" });
  } catch (error) {
    console.log(error);
  }
}

export async function GET(req) {
  return NextResponse.json({ message: "Hello, World!" });
}
