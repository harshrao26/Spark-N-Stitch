import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { connectDB } from '@/lib/mongoose'
import Order from '@/models/Order'

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return Response.json({ error: 'Login required' }, { status: 401 })
    }

    const { items, address, payment } = await req.json()
    const total = items.reduce((sum, p) => sum + p.price * p.qty, 0)

    await connectDB()

    await Order.create({
      userEmail: session.user.email,
      items: items.map(i => ({
        productId: i._id,
        name: i.name,
        quantity: i.qty,
        price: i.price,
      })),
      total,
      address,
      status: 'paid',
      paymentId: payment.payment_id || payment.order_id || 'cashfree',
    })

    return Response.json({ success: true })
  } catch (err) {
    console.error('ORDER ERROR:', err)
    return Response.json({ error: 'Server error' }, { status: 500 })
  }
}
