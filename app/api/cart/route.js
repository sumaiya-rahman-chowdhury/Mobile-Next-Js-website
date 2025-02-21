import Cart from "@/models/Cart";
import User from "@/models/User";
import { authOptions } from "@/utils/auth";
import connectDb from "@/utils/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectDb();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const cart = await Cart.findOne({ userId: session.user.id });
  const userDetails = await User.findById(session.user.id);
  return NextResponse.json({ cart: cart?.items || [], userDetails });
}

export async function POST(req) {
  await connectDb();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const { productId, name, price } = await req.json();
  console.log("Received Product Data:", { productId, name, price });

  let cart = await Cart.findOne({ userId: session.user.id });

  if (!cart) {
    // console.log("Cart not found. Creating a new cart...");
    // cart = new Cart({ userId: session.user.id, items: [] });
    // await cart.save();
    cart = await new Cart({ userId: session.user.id, items: [] }).save();
    // } else if (!Array.isArray(cart.items)) {
    //   console.error("⚠️ Cart items field is not an array! Fixing it...");
    //   cart.items = [];
    //   await cart.save(); // 🔥 Save immediately to fix the issue in DB
    // }
  }
  console.log("Current Cart Data:", cart);

  // ✅ Ensure `items` exists before accessing `.find()`
  if (!cart.items) {
    cart.items = [];
  }

  // ✅ Check if product is already in the cart
  const existingItem = cart.items.find(
    (item) => String(item.productId) === String(productId)
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.items.push({ productId, name, price, quantity: 1 });
  }

  await cart.save();
  return NextResponse.json({ cart: cart.items });
}

export async function DELETE(req) {
  try {
    const { productId } = await req.json(); // Extract product ID
    console.log("From delete route", { productId });

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }
    const userId = session.user.id;
    const updatedCart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { items: { productId: productId } } },
      { new: true }
    );

    if (!updatedCart) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 });
    }

    return NextResponse.json(
      { cart: updatedCart?.items || [] },
      { status: 200 }
    );

    
  } catch (error) {
    console.error("Error removing item from cart:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
