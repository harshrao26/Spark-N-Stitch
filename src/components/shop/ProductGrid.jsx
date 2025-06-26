'use client'
import Link from 'next/link'
import { FaEye } from 'react-icons/fa'
import AddToCart from '../AddToCart'

export default function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map((p) => (
        <div
          key={p._id}
          className="bg-white rounded-xl border overflow-hidden shadow-sm hover:shadow-md transition text-sm"
        >
          {/* Product Image */}
          <img
            src={p.images?.[0] || '/placeholder.jpg'}
            alt={p.name}
            className="w-full h-36 sm:h-44 xl:h-60 object-contain bg-gray-50"
          />

          {/* Product Info */}
          <div className="p-3 space-y-2">
            <h3 className="font-semibold leading-snug text-gray-800 text-sm sm:text-base">
              {p.name}
            </h3>

            <div
              className="text-xs text-gray-500 line-clamp-2"
              dangerouslySetInnerHTML={{ __html: p.description }}
            />

            <div className="flex items-center gap-2 text-sm">
              <span className="font-bold text-gray-900">₹{p.price}</span>
              <span className="text-gray-400 line-through text-xs">
                ₹{Math.round(p.price * 1.03)}
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-2">
              <Link
                href={`/product/${p._id}`}
                className="flex-1 flex items-center justify-center gap-1 border border-gray-300 text-gray-700 py-1.5 rounded-md hover:bg-gray-100"
              >
                <FaEye size={14} />
                <span className="text-xs sm:text-sm">View</span>
              </Link>

              <AddToCart product={p} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
