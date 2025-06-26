import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String, // Rich text (HTML)
  images: [String], // Cloudinary URL
  price: Number,
  idealFor: {
    type: String,
    enum: ["Fashion", "Jewellery"],
  },
  type: String, // category (e.g., Shirt, Shoes)
  brand: String,
  stock: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
