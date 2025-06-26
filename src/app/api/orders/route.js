import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { connectDB } from '@/lib/mongoose'
import Order from '@/models/Order'
import crypto from 'crypto'

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return Response.json({ error: 'Login required' }, { status: 401 })
    }

    const { items, address, payment } = await req.json()
    const total = items.reduce((sum, p) => sum + p.price * p.qty, 0)

    // 🔐 Step 1: verify Razorpay signature
    const body = payment.razorpay_order_id + '|' + payment.razorpay_payment_id
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex')

    if (expectedSignature !== payment.razorpay_signature) {
      return Response.json({ error: 'Signature verification failed' }, { status: 400 })
    }

    // ✅ Step 2: Save order if verified
    await connectDB()
    await Order.create({
      userEmail: session.user.email,
      items,
      address,
      total,
      status: 'paid',
      paymentId: payment.razorpay_payment_id,
      razorOrderId: payment.razorpay_order_id,
    })

    return Response.json({ success: true })
  } catch (err) {
    console.error('ORDER ERROR:', err)
    return Response.json({ error: 'Server error' }, { status: 500 })
  }
}
