import { connectDB } from '@/lib/mongoose'
import Order from '@/models/Order'
import { NextResponse } from 'next/server'
import mongoose from 'mongoose'

// PATCH: Update order status
export async function PATCH(req, { params }) {
  const { id } = params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid Order ID' }, { status: 400 })
  }

  try {
    const { status } = await req.json()
    await connectDB()

    const updated = await Order.findByIdAndUpdate(id, { status }, { new: true })

    if (!updated) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, updated })
  } catch (err) {
    console.error('Status update failed:', err.message)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
