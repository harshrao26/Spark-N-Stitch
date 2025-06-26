import { connectDB } from '@/lib/mongoose'
import Product from '@/models/Product'

export async function GET() {
  await connectDB()
  const products = await Product.find({})
  return Response.json(products)
}

export async function POST(req) {
  await connectDB()
  const data = await req.json()
  const product = await Product.create(data)
  return Response.json(product)
}

export async function PUT(req, { params }) {
  await connectDB()
  const data = await req.json()

  const updated = await Product.findByIdAndUpdate(params.id, data, { new: true })
  return Response.json(updated)
}