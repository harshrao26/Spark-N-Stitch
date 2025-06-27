import { connectDB } from '@/lib/mongoose';
import Product from '@/models/Product';
import ShopPageClient from '@/components/shop/ShopPageClient';

export default async function ShopPage() {
  await connectDB();

  const products = await Product.find().lean();
  const safeProducts = products.map(p => ({
    ...p,
    _id: p._id.toString(),
    createdAt: p.createdAt?.toString(),
    updatedAt: p.updatedAt?.toString(),
  }));

  const types = [...new Set(safeProducts.map(p => p.type || ''))];
  const brands = [...new Set(safeProducts.map(p => p.brand || ''))];

  return (
    <ShopPageClient
      products={safeProducts}
      types={types}
      brands={brands}
    />
  );
}
