'use client';

import ProductCard from '@/components/ProductCard';

export default function ProductSectionPage({ products = [] }) {

    console.log(products);

 const womenProducts = products.filter(
  (p) => p.idealFor?.toLowerCase() === 'fashion'
);

const jewelleryProducts = products.filter(
  (p) => p.idealFor?.toLowerCase() === 'jewellery'
);


  return (
    <div className="p-4 md:py-8 max-w-7xl mx-auto space-y-12">
      {/* Women Section */}
      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 border-b pb-2">
          Women
        </h2>
        {womenProducts.length === 0 ? (
          <p className="text-gray-500 text-sm">No products found in this category.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {womenProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Jewellery Section */}
      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 border-b pb-2">
          Jewellery
        </h2>
        {jewelleryProducts.length === 0 ? (
          <p className="text-gray-500 text-sm">No products found in this category.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {jewelleryProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
