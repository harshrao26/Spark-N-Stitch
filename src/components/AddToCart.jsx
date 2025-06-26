'use client'
import { FaCartPlus } from 'react-icons/fa'
import { useCartStore } from '@/lib/cartStore'

export default function AddToCart({ product }) {
  const add = useCartStore((s) => s.add)

  return (
    <button
      onClick={() => add(product)}
      className="flex items-center gap-2 bg-pink-500 hover:bg-pink-700 text-white font-medium px-4 py-2 rounded-md transition"
    >
      <FaCartPlus size={16} />
      Add
    </button>
  )
}
