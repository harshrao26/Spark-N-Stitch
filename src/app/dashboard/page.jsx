import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { connectDB } from '@/lib/mongoose'
import Order from '@/models/Order'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) return <div className="p-6">Please login to view your orders.</div>

  await connectDB()
  const orders = await Order.find({ userEmail: session.user.email }).sort({ createdAt: -1 }).lean()

  const current = orders.filter(o => o.status === 'pending' || o.status === 'paid')
  const past = orders.filter(o => o.status === 'shipped' || o.status === 'delivered')

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">My Orders</h2>

      {/* Current Orders */}
      <div>
        <h3 className="font-semibold mb-2">Current Orders</h3>
        {current.length === 0 ? (
          <p className="text-sm text-gray-500">No current orders.</p>
        ) : (
          current.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))
        )}
      </div>

      {/* Past Orders */}
      <div>
        <h3 className="font-semibold mb-2 mt-6">Past Orders</h3>
        {past.length === 0 ? (
          <p className="text-sm text-gray-500">No past orders.</p>
        ) : (
          past.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))
        )}
      </div>
    </div>
  )
}

function OrderCard({ order }) {
  return (
    <div className="border p-4 rounded-xl mb-6 shadow-sm bg-white space-y-3">
      <div className="flex justify-between items-center text-sm text-gray-600">
        <span className="font-medium">
          Order ID:{' '}
          <span className="text-gray-800">
            {order._id?.toString().slice(-6).toUpperCase()}
          </span>
        </span>
        <span>
          Status:{' '}
          <span className="capitalize font-semibold text-pink-600">
            {order.status}
          </span>
        </span>
      </div>

      {/* Product List */}
      <ul className="divide-y text-sm">
        {order.items.map((item, i) => (
          <li key={i} className="flex gap-4 py-3 items-center">
            <img
              src={item.image || item.images?.[0] || '/placeholder.jpg'}
              alt={item.name}
              className="w-16 h-16 object-cover rounded border"
            />
            <div className="flex-1">
              <p className="font-medium text-gray-800">{item.name}</p>
              <p className="text-gray-500 text-sm">
                Qty: {item.quantity} × ₹{item.price}
              </p>
            </div>
            
          </li>
        ))}
      </ul>

      <div className="text-right text-base font-bold">
        Total: ₹{order.total}
      </div>
    </div>
  )
}
