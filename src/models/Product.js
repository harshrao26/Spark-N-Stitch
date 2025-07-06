import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  images: { type: [String], default: [] },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  brand: { type: String, default: "Spark N Stitch" },
  type: { type: String },
  idealFor: {
    type: String,
    enum: ["Fashion", "Jewellery"],
    required: true,
  },
  sizes: { type: [String], default: [] },
  color: { type: String },

  // Only applies when idealFor === "Fashion"
  clothType: {
    type: String,
    enum: ["Co-ord Set", "Top", "Dress", "Saree", "Pants"],
    required: false,
  },

  // Only applies when idealFor === "Jewellery"
  jewelleryType: {
    type: String,
    enum: ["Ring", "Set", "Bracelet", "Earrings"],
    required: false,
  },
  jewelleryColor: {
    type: String,
    enum: ["Silver", "Gold"],
    required: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
