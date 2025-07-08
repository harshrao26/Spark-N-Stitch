"use client";
import { useRouter } from "next/navigation";
import ProductCard from "./ProductCard";

export default function ProductSectionPage({ products = [] }) {
  const router = useRouter();

  const womenProducts = products
    .filter((p) => p.idealFor?.toLowerCase() === "fashion")
    .slice(0, 4);

  const jewelleryProducts = products
    .filter((p) => p.idealFor?.toLowerCase() === "jewellery")
    .slice(0, 4);

  const handleViewAll = (idealFor) => {
    router.push(`/shop?idealFor=${idealFor.toLowerCase()}`);
  };

  return (
    <div className="p-4 md:py-8 max-w-7xl mx-auto space-y-12">
      {/* Fashion Section */}
      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 border-b pb-2">
          Fashion
        </h2>
        {womenProducts.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No products found in this category.
          </p>
        ) : (
          <>
            <div className="overflow-x-auto md:hidden block lg:overflow-visible">
              <div className="flex gap-4">
                {womenProducts.map((product) => (
                  <div
                    key={product._id}
                    className="w-[70vw] sm:w-[40vw] md:w-[30vw] lg:w-auto  "
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>

            <div className="md:grid grid-cols-2 hidden  sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {womenProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            <div className="flex justify-center mt-4">
              <button
                onClick={() => handleViewAll("fashion")}
                className="px-5 py-2 text-white bg-gray-800 rounded hover:bg-gray-700"
              >
                View All Fashion
              </button>
            </div>
          </>
        )}
      </section>

      {/* Jewellery Section */}
      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 border-b pb-2">
          Jewellery
        </h2>
        {jewelleryProducts.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No products found in this category.
          </p>
        ) : (
          <>
          <div className="overflow-x-auto md:hidden block lg:overflow-visible">
              <div className="flex space-x-4 lg:grid lg:grid-cols-4 lg:space-x-0 lg:gap-4 min-w-max">
                {jewelleryProducts.map((product) => (
                  <div
                    key={product._id}
                    className="w-[70vw] sm:w-[40vw] md:w-[30vw] lg:w-auto flex-shrink-0"
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>

            <div className="md:grid grid-cols-2 hidden  sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {jewelleryProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            <div className="flex justify-center mt-4">
              <button
                onClick={() => handleViewAll("Jewellery")}
                className="px-5 py-2 text-white bg-gray-800 rounded hover:bg-gray-700"
              >
                View All Jewellery
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
