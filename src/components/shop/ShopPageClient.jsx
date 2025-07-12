"use client";
export const dynamic = "force-dynamic"; // 👈 Add this

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ShopCarousel from "./ShopCarousel";
import ShopFilters from "./ShopFilters";
import ProductGrid from "./ProductGrid";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ShopPageClient({ products, clothTypes, brands }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const idealFor = searchParams.get("idealFor") || "";
  const clothType = searchParams.get("clothType") || "";
  const brand = searchParams.get("brand") || "";

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

      <div className=" max-w-7xl mx-auto">
        {/* <ProductGrid products={products} /> */}
      </div>

      {/* Filters + Grid */}
      <div className="md:flex max-w-7xl mx-auto  ">
        {/* Left Filters */}
        <div className=" mr-10 ">
          {/* IdealFor Filter */}
          <div className="flex  gap-2 justify -center">
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
          <div className="flex flex-wrap gap-2 mt-4 justify- center">
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

        {/* Right Product Grid */}

        <ProductGrid products={products} />
      </div>
    </div>
  );
}
