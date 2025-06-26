'use client'
import { useState } from 'react'
import { FaTrash, FaEdit, FaEye } from 'react-icons/fa'
import Link from 'next/link'

export default function AdminProductPanel({ products }) {
  const [localProducts, setLocalProducts] = useState(products)

  const deleteProduct = async (id) => {
    const ok = confirm('Are you sure you want to delete this product?')
    if (!ok) return

    const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setLocalProducts(prev => prev.filter(p => p._id !== id))
    } else {
      alert('Failed to delete product')
    }
  }

  return (
    <div className="grid gap-4">
      {localProducts.map((p) => (
        <div key={p._id} className="border rounded-lg p-4 flex justify-between items-center shadow-sm bg-white hover:shadow-md transition">
          <div>
            <h3 className="font-semibold text-lg">{p.name}</h3>
            <p className="text-sm text-gray-500">{p.category} | ₹{p.price}</p>
          </div>

          <div className="flex gap-3 text-sm text-gray-600">
            <Link href={`/product/${p._id}`} className="hover:text-blue-600">
              <FaEye />
            </Link>
            <Link href={`/admin/products/edit/${p._id}`} className="hover:text-yellow-600">
              <FaEdit />
            </Link>
            <button onClick={() => deleteProduct(p._id)} className="hover:text-red-600">
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
