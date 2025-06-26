'use client'
import { useCartStore } from '@/lib/cartStore'

export default function AddToCartButton({ product }) {
  const addToCart = useCartStore((state) => state.add)

  return (
    <button
      onClick={() => addToCart(product)}
      className="bg-green-600 text-white px-3 py-1 rounded"
    >
      Add to Cart
    </button>
  )
}
