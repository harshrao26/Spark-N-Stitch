export const dynamic = "force-dynamic"; // 👈 Add this

import HeroCarousel from "@/components/HeroCarousel";
import UspStrip from "@/components/UspStrip";
import HoverCards from "@/components/HoverCards";
import PromoSection from "@/components/PromoSection";
import FeatureHighlights from "@/components/FeatureHighlights";
import FaqSection from "@/components/FaqSection";
import AffiliateSection from "@/components/AffiliateSection";
import ProductSectionPage from "@/components/ProductSectionPage";
import { OfferBanner } from "@/components/OfferBanner";
import ProductCard from "@/components/ProductCard";
import Product from "@/models/Product";
import { connectDB } from "@/lib/mongoose";
import Link from 'next/link';

export default async function HomePage() {
  await connectDB();

  const products = await Product.find({}).lean();
  const safeProducts = products.map(p => ({
    ...p,
    _id: p._id.toString(),
    createdAt: p.createdAt?.toString(),
    updatedAt: p.updatedAt?.toString(),
  }));
  const previewProducts = safeProducts.slice(0, 8);

  return (
    <div>
      <OfferBanner />
      <HeroCarousel />

      {/* <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">All Products</h1>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {previewProducts.map(p => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>

        {safeProducts.length > 8 && (
          <div className="text-center mt-8">
            <Link
              href="/shop"
              className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-medium px-6 py-3 rounded-full transition"
            >
              View All Products
            </Link>
          </div>
        )}
      </div> */}

      <ProductSectionPage products={safeProducts} />

      <UspStrip />
      <AffiliateSection />
      <HoverCards />
      <PromoSection />
      <FeatureHighlights />
      <FaqSection />
    </div>
  );
}
