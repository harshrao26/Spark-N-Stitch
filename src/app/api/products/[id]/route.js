import { connectDB } from '@/lib/mongoose'
import Product from '@/models/Product'

export async function PUT(req, { params }) {
  await connectDB()
  const data = await req.json()

  const updated = await Product.findByIdAndUpdate(params.id, data, { new: true })
  return Response.json(updated)
}

export async function DELETE(_, { params }) {
  await connectDB()
  await Product.findByIdAndDelete(params.id)
  return Response.json({ success: true })
}