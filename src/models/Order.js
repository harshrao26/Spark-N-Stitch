// src/models/Order.js
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userEmail: String,
    items: [
      {
        productId: mongoose.Types.ObjectId,
        name: String,
        quantity: Number,
        price: Number,
        selectedSize: String,
        color: String,
        image: String,
      },
    ],
    total: Number,
    address: {
      name: String,
      phone: String,
      line1: String,
      city: String,
      pincode: String,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    paymentId: String,
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
