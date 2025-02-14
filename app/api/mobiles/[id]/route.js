import connectDb from "@/utils/db";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import Mobile from "@/models/Mobile";

export async function GET(req, { params }) {
  await connectDb();
  const { id } = await params;
  console.log(id);
  //
  const product = await Mobile.findById(id);
  console.log(product);
  //
   // Set CORS headers
   const headers = new Headers();
   headers.set("Access-Control-Allow-Origin", "*"); // Allow all origins
   headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
   headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return NextResponse.json(product,{ status: 200, headers });
}

export async function DELETE(req, { params }) {
  await connectDb();
  const { id } = await params;
  console.log(id);
  const delectedProduct = await Mobile.findByIdAndDelete(id);
  if (!delectedProduct) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(
    { message: "Delete Done", delectedProduct },
    { status: 200 }
  );
}

export async function PATCH(req, { params }) {
  await connectDb();
  const { id } = params;
  const body = await req.json();
  console.log(body, id);
  const product = await Mobile.findByIdAndUpdate(id, {
    name: body.name,
    price: body.price,
    image: body.image,
  });
  return NextResponse.json(product);
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}