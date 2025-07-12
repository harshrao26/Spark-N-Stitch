"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FaUser, FaTshirt } from "react-icons/fa";
import ShopCarousel from "./ShopCarousel";
import ProductGrid from "./ProductGrid";

export default function ShopPageClient({ products, clothTypes, brands }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const idealFor = searchParams.get("idealFor") || "";
  const clothType = searchParams.get("clothType") || "";
  const brand = searchParams.get("brand") || "";

  const [showIdealFor, setShowIdealFor] = useState(false);
  const [showClothType, setShowClothType] = useState(false);

  const updateQuery = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value.toLowerCase());
    } else {
      params.delete(key);
    }
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <div className="space-y-8 px-4 md:px-6 xl:px-0">
      {/* Top Carousel */}
      <ShopCarousel />

      <div className="max-w-7xl mx-auto">
        {/* Mobile Filter Icons */}
        <div className="md:hidden flex gap-4 justify-start my-4">
          <button
            onClick={() => setShowIdealFor(!showIdealFor)}
            className="flex items-center gap-2 px-3 py-2 border rounded"
          >
            <FaUser /> Ideal For
          </button>
          <button
            onClick={() => setShowClothType(!showClothType)}
            className="flex items-center gap-2 px-3 py-2 border rounded"
          >
            <FaTshirt /> Cloth Type
          </button>
        </div>

        {/* Mobile Dropdowns */}
        {showIdealFor && (
          <div className="md:hidden flex flex-wrap gap-2 mb-4">
            {["fashion", "jewellery"].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  updateQuery("idealFor", cat);
                  setShowIdealFor(false);
                }}
                className={`px-3 py-1 capitalize rounded ${
                  idealFor === cat
                    ? "bg-pink-500 text-white"
                    : "text-gray-800 border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {showClothType && (
          <div className="md:hidden flex flex-wrap gap-2 mb-4">
            {clothTypes.map((t) => (
              <button
                key={t}
                onClick={() => {
                  updateQuery("clothType", t);
                  setShowClothType(false);
                }}
                className={`px-3 py-1 capitalize rounded ${
                  clothType === t
                    ? "bg-pink-500 text-white"
                    : "text-gray-800 border"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Filters + Product Grid */}
      <div className="md:flex max-w-7xl mx-auto gap-10">
        {/* Desktop Filters */}
        <div className="hidden md:block w-1/4">
          {/* IdealFor Filter */}
          <div className="flex flex-wrap gap-2 justify-start">
            {["fashion", "jewellery"].map((cat) => (
              <button
                key={cat}
                onClick={() => updateQuery("idealFor", cat)}
                className={`px-3 py-1 capitalize rounded ${
                  idealFor === cat
                    ? "bg-pink-500 text-white"
                    : "text-gray-800 border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Cloth Type Filter */}
          <div className="flex flex-wrap gap-2 mt-4 justify-start">
            {clothTypes.map((t) => (
              <button
                key={t}
                onClick={() => updateQuery("clothType", t)}
                className={`px-3 py-1 capitalize rounded ${
                  clothType === t
                    ? "bg-pink-500 text-white"
                    : "text-gray-800 border"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="md:w-3/4 w-full">
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
}
