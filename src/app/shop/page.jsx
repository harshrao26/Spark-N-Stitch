export const dynamic = "force-dynamic";

import { connectDB } from "@/lib/mongoose";
import Product from "@/models/Product";
import ShopPageClient from "@/components/shop/ShopPageClient";

export default async function ShopPage({ searchParams }) {
  await connectDB();

  const { idealFor = "", clothType = "", brand = "" } = searchParams;

  const query = {};
  if (idealFor) query.idealFor = { $regex: idealFor, $options: "i" };
  if (clothType) query.clothType = { $regex: clothType, $options: "i" };
  if (brand) query.brand = { $regex: brand, $options: "i" };

  const products = await Product.find(query).lean();

  const safeProducts = products.map((p) => ({
    ...p,
    _id: p._id.toString(),
    idealFor: p.idealFor?.toLowerCase() || "",
    clothType: p.clothType?.toLowerCase() || "",
    brand: p.brand?.toLowerCase() || "",
  }));

  // For UI filters
  const allProducts = await Product.find().lean();
  const clothTypes = [...new Set(allProducts.map(p => p.clothType?.toLowerCase()))].filter(Boolean);
  const brands = [...new Set(allProducts.map(p => p.brand?.toLowerCase()))].filter(Boolean);

  return (
    <ShopPageClient
      products={safeProducts}
      clothTypes={clothTypes}
      brands={brands}
    />
  );
}
