"use client"
import { useRouter } from 'next/navigation'
import ProductCard from './ProductCard';

export default function ProductSectionPage({ products = [] }) {
  const router = useRouter();

  const womenProducts = products
    .filter((p) => p.idealFor?.toLowerCase() === 'fashion')
    .slice(0, 4);

  const jewelleryProducts = products
    .filter((p) => p.idealFor?.toLowerCase() === 'jewellery')
    .slice(0, 4);

const handleViewAll = (idealFor) => {
  router.push(`/shop?idealFor=${idealFor.toLowerCase()}`);
};


  return (
    <div className="p-4 md:py-8 max-w-7xl mx-auto space-y-12">
      {/* Fashion Section */}
      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 border-b pb-2">Fashion</h2>
        {womenProducts.length === 0 ? (
          <p className="text-gray-500 text-sm">No products found in this category.</p>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {womenProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => handleViewAll('fashion')}
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
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 border-b pb-2">Jewellery</h2>
        {jewelleryProducts.length === 0 ? (
          <p className="text-gray-500 text-sm">No products found in this category.</p>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {jewelleryProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => handleViewAll('Jewellery')}
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
