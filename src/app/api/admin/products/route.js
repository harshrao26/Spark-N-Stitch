import { connectDB } from '@/lib/mongoose'
import Product from '@/models/Product'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'

export async function POST(req) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') {
    return Response.json({ error: 'Unauthorized' }, { status: 403 })
  }

  const data = await req.json()
  await connectDB()
  const product = await Product.create(data)
  return Response.json(product)
}
