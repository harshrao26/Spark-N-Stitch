import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import Order from '@/models/Order'
import { connectDB } from '@/lib/mongoose'

export default async function OrdersPage() {
  const session = await getServerSession(authOptions)
  if (!session) return <p className="p-6 text-center text-gray-500">Please log in to view your orders.</p>

  await connectDB()
  const orders = await Order.find({ userEmail: session.user.email }).sort({ createdAt: -1 })

  return (
    <div className="px-6 py-12 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-2">Your Orders</h2>
{console.log(orders)}
      {orders.length === 0 ? (
        <p className="text-gray-600 text-center">You haven’t placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((o) => (
            <div key={o._id} className="bg-white border rounded-xl shadow-sm hover:shadow-md transition p-6">
              <div className="flex justify-between items-center mb-4">
<h3 className="text-lg font-semibold text-gray-800">
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

              <ul className="divide-y text-sm text-gray-700 mb-4">
                {o.items.map((i, idx) => (
                  <li key={idx} className="py- flex justify-between">
                    <span>{i.name} × {i.quantity}</span>
                    {/* <span>₹{i.price * i.quantity}</span> */}
                  </li>
                ))}
              </ul>

              <div className="flex justify-between text-sm text-gray-600 border-t pt-4 mt-4">
                <span>Placed on: {new Date(o.createdAt).toLocaleDateString()}</span>
                <span className="font-medium text-gray-900">Total: ₹{o.total}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
