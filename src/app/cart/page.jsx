'use client'

import { useCartStore } from '@/lib/cartStore'
import { useRouter } from 'next/navigation'

export default function CartPage() {
  const { items, remove, updateQty } = useCartStore()
  const router = useRouter()

  const subtotal = items.reduce((sum, p) => sum + (Number(p.price) || 0) * p.qty, 0)
  const gst = subtotal * 0.18
  const total = subtotal + gst

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">🛒 Your Cart</h2>

      {items.length === 0 ? (
        <div className="text-center py-20 text-gray-500 text-sm">
          Your cart is empty.
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="space-y-6">
            {items.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-sm p-4 flex gap-4 border items-start"
              >
                <img
                  src={item.images?.[0] || '/placeholder.jpg'}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md border"
                />
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-base font-semibold text-gray-800">{item.name}</h3>
                     
                  </div>

                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => updateQty(item._id, item.qty - 1)}
                      className="px-2 py-1 bg-gray-200 rounded text-sm"
                    >
                      -
                    </button>
                    <span className="text-sm font-medium">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item._id, item.qty + 1)}
                      className="px-2 py-1 bg-gray-200 rounded text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <p className="text-lg font-bold text-gray-900">
                    ₹{(item.price * item.qty).toFixed(2)}
                  </p>
                  <button
                    onClick={() => remove(item._id)}
                    className="text-red-500 text-xs hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm text-sm space-y-2 border">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium text-gray-800">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">GST (18%)</span>
              <span className="font-medium text-gray-800">₹{gst.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-900 border-t pt-2">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>

          {/* Checkout CTA */}
          <div className="sticky bottom-4 z-10">
            <button
              onClick={() => router.push('/checkout')}
              className="w-full bg-pink-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:bg-pink-700 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  )
}
