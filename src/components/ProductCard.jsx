'use client'
export const dynamic = "force-dynamic";

import { FaEye } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import AddToCart from '@/components/AddToCart'

export default function ProductCard({ product }) {
  const router = useRouter()

  const viewProduct = () => router.push(`/product/${product._id}`)

  const discountedPrice = Number(product.price || 0)
  const originalPrice = Math.round(discountedPrice * 1.03)

  const stripHtml = (html) => {
    if (typeof window === 'undefined') return html
    const div = document.createElement('div')
    div.innerHTML = html
    return div.textContent || div.innerText || ''
  }

  return (
    <div className="border rounded-xl shadow-sm hover:shadow-md transition bg-white overflow-hidden flex flex-col justify-between">
      {/* Image */}
      <div onClick={viewProduct} className="cursor-pointer">
        <img
          src={product.images?.[0] || '/placeholder.jpg'}
          alt={product.name}
          className="w-full h-44 sm:h-52 md:h-64 object-contain bg-gray-50"
        />
      </div>

      {/* Info */}
      <div className="p-3 sm:p-4 flex flex-col gap-1.5 text-sm sm:text-[13px]">
        {/* Title */}
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-2">
          {product.name}
        </h3>

        {/* Description */}
        {/* <p className="text-xs text-gray-500 line-clamp-2">
          {stripHtml(product.description)}
        </p> */}

        {/* Pricing */}
        <div className="flex items-center gap-2">
          <span className="text-base font-bold text-pink-500">
            ₹{discountedPrice}
          </span>
          <span className="text-xs line-through text-gray-400">
            ₹{originalPrice}
          </span>
        </div>

        {/* Category */}
        <div className="text-xs text-gray-500 capitalize">
          {product.idealFor || 'Uncategorized'}
        </div>

        {/* Buttons */}
        <div className="mt-3 w-full flex gap-2">
          <button
            onClick={viewProduct}
            className="flex-1 flex items-center justify-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-md transition"
          >
            <FaEye size={14} /> View
          </button>

          <div className="flex-1">
            <AddToCart product={product} />
          </div>
        </div>
      </div>
    </div>
  )
}
