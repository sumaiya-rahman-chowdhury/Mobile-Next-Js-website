import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mobile",
        required: true,
      },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, default: 1 },
    },
  ],
});

 const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);
 export default Cart
