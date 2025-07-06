"use client";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ShopCarousel from "./ShopCarousel";
import ShopFilters from "./ShopFilters";
import ProductGrid from "./ProductGrid";
import Link from "next/link";


export default function ShopPageClient({ products, types, brands }) {
  const searchParams = useSearchParams();
  const initialIdealFor = searchParams.get("idealFor") || "";

  const [idealFor, setIdealFor] = useState(initialIdealFor);
  const [brand, setBrand] = useState("");

  useEffect(() => {
    setIdealFor(initialIdealFor);
  }, [initialIdealFor]);

  const filtered = useMemo(() => {
    return products.filter(
      (p) =>
        (!idealFor || p.idealFor?.toLowerCase() === idealFor.toLowerCase()) &&
        (!brand || p.brand === brand)
    );
  }, [products, idealFor, brand]);

  return (
    <div className="space-y-8 px-4 md:px-6 xl:px-0">
      {/* Top Carousel */}
      <ShopCarousel />

          <div className="flex gap-4 flex-wrap justify-center md:justify-center my-6">
      <Link
        href="/shop?idealFor=jewellery"
        className="px-4 py-2 rounded-full border border-gray-300 text-sm text-gray-700 hover:bg-gray-800 hover:text-white transition"
      >
        Jewellery
      </Link>

      <Link
        href="/shop?idealFor=fashion"
        className="px-4 py-2 rounded-full border border-gray-300 text-sm text-gray-700 hover:bg-gray-800 hover:text-white transition"
      >
        Fashion
      </Link>
    </div>


        <div className=" max-w-7xl mx-auto">
        <ProductGrid products={filtered} />
      </div>

      {/* Filters + Grid */}
      {/* <div className="grid grid-cols-1 md:grid-cols-1 gap-4 max-w-7xl mx-auto"> */}
      {/* Left Filters */}
      {/* <ShopFilters
          types={types}
          brands={brands}
          selectedType={idealFor}
          selectedBrand={brand}
          setType={setIdealFor}
          setBrand={setBrand}
        /> */}

      {/* Right Product Grid */}
    
      {/* </div> */}
    </div>
  );
}
