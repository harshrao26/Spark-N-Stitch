'use client'
import { useState } from 'react'

export default function ShopLayout({ products, types }) {
  const [selectedType, setSelectedType] = useState('All')

  const filtered = selectedType === 'All'
    ? products
    : products.filter(p => p.type === selectedType)

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 max-w-7xl mx-auto">
      
      {/* Banners (Left) */}
      <div className="md:col-span-1 space-y-4 sticky top-6 self-start">
        <div className="bg-white/80 backdrop-blur border border-gray-200 rounded-xl shadow-md overflow-hidden">
          <img src="/banner1.jpg" alt="Banner 1" className="w-full h-40 object-cover" />
        </div>
        <div className="bg-white/80 backdrop-blur border border-gray-200 rounded-xl shadow-md overflow-hidden">
          <img src="/banner2.jpg" alt="Banner 2" className="w-full h-40 object-cover" />
        </div>
        <div className="bg-white/80 backdrop-blur border border-gray-200 rounded-xl shadow-md overflow-hidden">
          <img src="/banner3.jpg" alt="Banner 3" className="w-full h-40 object-cover" />
        </div>
      </div>

      {/* Right: Filters + Grid */}
      <div className="md:col-span-3 space-y-8">
        
        {/* Filter Pills */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => setSelectedType('All')}
            className={`px- py-2 rounded-full border text-sm transition ${
              selectedType === 'All'
                ? 'bg-black text-white'
                : 'border-gray-300 text-gray-700 hover:bg-gray-100'
            }`}
          >
            All
          </button>
          {types.map((t, i) => (
            <button
              key={i}
              onClick={() => setSelectedType(t)}
              className={`px-4 py-2 rounded-full border text-sm capitalize transition ${
                selectedType === t
                  ? 'bg-black text-white'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map(p => (
            <div
              key={p._id}
              className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition group"
            >
              <div className="overflow-hidden">
                <img
                  src={p.images?.[0] || '/placeholder.jpg'}
                  alt={p.name}
                  className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4 space-y-1">
                 <h3 className="text-sm font-semi text-gray-900 truncate">{p.name}</h3>
                <p className="text-xs text-gray-500">{p.brand}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-pink-600 font- text-sm">₹{p.price}</span>
                  <span className="text-gray-400 line-through text-xs">₹{Math.round(p.price * 1.15)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
