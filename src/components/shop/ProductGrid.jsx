'use client'
export const dynamic = 'force-dynamic'

import Link from 'next/link'
import Image from 'next/image'
import { FaEye } from 'react-icons/fa'
import AddToCart from '../AddToCart'

// Helper: format INR nicely
const formatINR = (num) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(num || 0))

// Helper: insert Cloudinary transformations if the URL looks like Cloudinary
function optimizeCloudinary(src) {
  if (!src) return '/placeholder.jpg'
  try {
    const url = new URL(src, 'http://dummy-base') // supports relative paths too
    const s = url.href.replace('http://dummy-base', '')
    // If it's a Cloudinary URL, inject transforms after `/upload/`
    if (s.includes('res.cloudinary.com') && s.includes('/upload/')) {
      return s.replace(
        /\/upload\//,
        '/upload/f_auto,q_auto:eco,c_pad,b_white,w_700,h_700/'
      )
    }
    return s
  } catch {
    // Not a valid absolute/relative URL, return as-is
    return src
  }
}

// Tiny SVG shimmer for blur placeholder
const shimmer = (w, h) =>
  `data:image/svg+xml;base64,${Buffer.from(`\n  <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">\n    <defs><linearGradient id="g"><stop stop-color="#eee" offset="20%"/><stop stop-color="#ddd" offset="50%"/><stop stop-color="#eee" offset="70%"/></linearGradient></defs>\n    <rect width="${w}" height="${h}" fill="#eee"/>\n    <rect id="r" width="${w}" height="${h}" fill="url(#g)"/>\n    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1.2s" repeatCount="indefinite"  />\n  </svg>`).toString('base64')}`

export default function ProductGrid({ products = [] }) {
  if (!Array.isArray(products)) products = []

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-5">
      {products.map((p) => {
        const imgSrc = optimizeCloudinary(p?.images?.[0] || '/placeholder.jpg')
        const price = Number(p?.price || 0)
        const mrp = Math.max(Math.round(price * 1.03), price)
        const discount = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0

        return (
          <div
            key={p._id}
            className="group bg-white rounded-xl border overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
          >
            {/* Media */}
            <Link href={`/product/${p?._id}`} className="block">
              <div className="relative w-full aspect-square bg-white">
                <img
                  src={imgSrc}
                  alt={p?.name || 'Product image'}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-contain p-2 sm:p-3 transition-transform duration-200 group-hover:scale-[1.03]"
                  placeholder="blur"
                  blurDataURL={shimmer(700, 700)}
                  priority={false}
                />
                {discount > 0 && (
                  <span className="absolute left-2 top-2 text-[10px] sm:text-[11px] bg-rose-500 text-white px-2 py-0.5 rounded-full">
                    {discount}% OFF
                  </span>
                )}
              </div>
            </Link>

            {/* Content */}
            <div className="p-3 sm:p-4 space-y-2">
              <h3 className="font-semibold leading-snug text-gray-800 text-sm sm:text-base line-clamp-2 min-h-[2.5rem]">
                {p?.name}
              </h3>

              <div
                className="text-xs text-gray-500 line-clamp-2 min-h-[2rem]"
                dangerouslySetInnerHTML={{ __html: p?.description || '' }}
              />

              <div className="flex items-baseline gap-2 text-sm">
                <span className="font-semibold text-gray-900">{formatINR(price)}</span>
                {mrp > price && (
                  <span className="text-gray-400 line-through text-xs">{formatINR(mrp)}</span>
                )}
              </div>

              {/* Actions */}
           <div className="flex flex-col sm:flex-row gap-2 mt-2">
  <Link
    href={`/product/${p?._id}`}
    className="w-full sm:flex-1 inline-flex items-center justify-center gap-1 border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50"
  >
    <FaEye size={14} />
    <span className="text-xs sm:text-sm">View</span>
  </Link>

  {/* If AddToCart doesn't accept className, wrap it to control width */}
  <div className="w-full sm:flex-1">
    <AddToCart product={p} />
  </div>
</div>
            </div>
          </div>
        )
      })}

      {/* Empty state */}
      {products.length === 0 && (
        <div className="col-span-full py-10 text-center text-gray-500 border rounded-lg">No products found.</div>
      )}
    </div>
  )
}
