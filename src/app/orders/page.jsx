import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import Order from '@/models/Order'
import Product from '@/models/Product'
import { connectDB } from '@/lib/mongoose'
import Image from 'next/image'

export default async function OrdersPage() {
  const session = await getServerSession(authOptions)
  if (!session)
    return <p className="p-6 text-center text-gray-500">Please log in to view your orders.</p>

  await connectDB()
  const orders = await Order.find({ userEmail: session.user.email }).sort({ createdAt: -1 }).lean()

  // 🔄 Load product images if missing in order
  for (const order of orders) {
    for (const item of order.items) {
      if (!item.image) {
        const product = await Product.findById(item.productId).lean()
        item.image = product?.images?.[0] || '/placeholder.jpg'
      }
    }
  }

  return (
    <div className="px-6 py-12 max-w-5xl mx-auto">
      <h2 className="text-3xl font- text-gray-900 mb-8 border-b pb-2">Your Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-600 text-center">You haven’t placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((o) => {
            const placedDate = new Date(o.createdAt)
            const expectedDate = new Date(placedDate)
            expectedDate.setDate(expectedDate.getDate() + 5)

            const formatDate = (date) =>
              date.toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })

            return (
              <div
                key={o._id}
                className="bg-white border rounded-xl shadow-md hover:shadow-lg transition p-6"
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semi text-gray-800">
                    Order #{String(o._id).slice(-6).toUpperCase()}
                  </h3>
                  <span
                    className={`text-sm font-medium capitalize px-3 py-1 rounded-full ${
                      o.status === 'delivered'
                        ? 'bg-green-100 text-green-700'
                        : o.status === 'shipped'
                        ? 'bg-purple-100 text-purple-700'
                        : o.status === 'paid'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {o.status}
                  </span>
                </div>

                {/* Items */}
                <ul className="divide-y text-sm text-gray-700 mb-4">
                  {o.items.map((i, idx) => (
                    <li key={idx} className="py-3 flex items-center gap-4">
                      <img
                        src={i.image || '/placeholder.jpg'}
                        alt={i.name}
                        width={56}
                        height={56}
                        className="w-14 h-14 object-cover rounded border"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{i.name}</p>
                        <p className="text-xs text-gray-500">Qty: {i.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semi">₹{i.price * i.quantity}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Footer */}
                <div className="flex justify-between text-sm text-gray-600 border-t pt-4 mt-4">
                  <div>
                    <p>Placed on: {formatDate(placedDate)}</p>
                    <p>
                      Expected delivery: <strong>{formatDate(expectedDate)}</strong>
                    </p>
                  </div>
                  <div className="text-right font-medium text-gray-900">
                    Total: ₹{o.total}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
