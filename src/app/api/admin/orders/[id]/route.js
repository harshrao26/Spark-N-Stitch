import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { connectDB } from '@/lib/mongoose'
import Order from '@/models/Order'

export async function PATCH(req, { params }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await connectDB()
  const { status } = await req.json()

  const order = await Order.findByIdAndUpdate(
    params.id,
    { status },
    { new: true }
  ).lean()

  if (!order) {
    return Response.json({ error: 'Order not found' }, { status: 404 })
  }

  return Response.json({ status: order.status })
}
