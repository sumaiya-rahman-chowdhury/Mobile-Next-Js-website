import Mobile from "@/models/Mobile";
import connectDb from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 5;

  await connectDb();

  try {
    const mobiles = await Mobile.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({price: -1});
    const total = await Mobile.countDocuments();

    return NextResponse.json(
      {
        mobiles,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req) {
  await connectDb();
  const body = await req.json();
  // console.log(body);
  const { name, price, image } = await body;
  console.log("'From Back End'", name, price, image);
  await new Mobile({ name, price, image }).save();
  return NextResponse.json({ message: "Done" });
}
