import { connectDB } from "@/lib/mongoose";
import Product from "@/models/Product";
import ProductDetails from "@/components/ProductDetails";

export default async function ProductPage({ params }) {
  await connectDB();
  const product = await Product.findById(params.id).lean();

  if (!product) return <div className="p-6">Product not found</div>;

  return <ProductDetails product={product} />;
}
