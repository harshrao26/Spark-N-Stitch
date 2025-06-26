'use client'
import { useState } from 'react'
import Link from 'next/link'
import { FaTrash, FaEdit, FaEye } from 'react-icons/fa'

export default function AdminProductPanel({ products }) {
  const [localProducts, setLocalProducts] = useState(products)

  return (
    <div className="space-y-4">
      {localProducts.map((p) => (
        <div
          key={p._id}
          className="p-4 border rounded-lg shadow-sm flex items-center gap-4 bg-white hover:shadow-md transition"
        >
          {/* Product Image */}
          <img
            src={p.images?.[0] || '/placeholder.jpg'}
            alt={p.name}
            className="w-16 h-16 object-cover rounded-md border"
          />

          {/* Info + Actions */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{p.name}</h3>
            <p className="text-sm text-gray-500">₹{p.price} | {p.category}</p>
          </div>

          <div className="flex gap-3 text-gray-600 text-sm">
            <Link href={`/product/${p._id}`} className="hover:text-blue-600"><FaEye /></Link>
            <Link href={`/admin/products/edit/${p._id}`} className="hover:text-yellow-600"><FaEdit /></Link>
            {/* Optional: Add Delete */}
          </div>
        </div>
      ))}
    </div>
  )
}
