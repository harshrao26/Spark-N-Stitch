'use client'
import { useState, useMemo } from 'react'
import ShopCarousel from './ShopCarousel'
import ShopFilters from './ShopFilters'
import ProductGrid from './ProductGrid'

export default function ShopPageClient({ products, types, brands }) {
  const [type, setType] = useState('')
  const [brand, setBrand] = useState('')

  const filtered = useMemo(() => {
    return products.filter(p =>
      (!type || p.type === type) &&
      (!brand || p.brand === brand)
    )
  }, [products, type, brand])

  return (
    <div className="space-y-8 px-4 md:px-6 xl:px-0">
      {/* Top Carousel */}
      <ShopCarousel />

      {/* Filters + Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-7xl mx-auto">
        {/* Left Filters */}
        <ShopFilters
          types={types}
          brands={brands}
          selectedType={type}
          selectedBrand={brand}
          setType={setType}
          setBrand={setBrand}
        />

        {/* Right Product Grid */}
        <div className="md:col-span-3">
          <ProductGrid products={filtered} />
        </div>
      </div>
    </div>
  )
}
