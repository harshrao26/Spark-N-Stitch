import { connectDB } from '@/lib/mongoose'
import Product from '@/models/Product'

export async function DELETE(_, { params }) {
  await connectDB()
  await Product.findByIdAndDelete(params.id)
  return Response.json({ success: true })
}
