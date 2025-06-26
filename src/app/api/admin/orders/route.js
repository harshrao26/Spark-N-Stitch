import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { connectDB } from '@/lib/mongoose'
import Order from '@/models/Order'

export default async function AdminOrdersPage() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') {
    return <div className="p-6">Unauthorized access</div>
  }

  await connectDB()
  const orders = await Order.find().sort({ createdAt: -1 }).lean()

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold mb-4">All Orders</h2>

      {orders.map((order) => (
        <div key={order._id} className="border p-4 rounded shadow">
          <div className="flex justify-between text-sm">
            <span>{order.userEmail}</span>
            <span>Status: <strong>{order.status}</strong></span>
          </div>

          <div className="text-sm mt-2">
            {order.items.map((item, i) => (
              <p key={i}>{item.name} × {item.qty}</p>
            ))}
          </div>

          <div className="text-right mt-2 font-semibold">
            Total: ₹{order.total}
          </div>
        </div>
      ))}
    </div>
  )
}
