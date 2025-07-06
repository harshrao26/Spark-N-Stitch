import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { connectDB } from '@/lib/mongoose'
import Product from '@/models/Product'
import EditProductForm from '@/components/admin/EditProductForm'

export default async function EditProductPage({ params }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') {
    return <div className="p-6 text-red-600">Access Denied</div>
  }

  await connectDB()
  const product = await Product.findById(params.id).lean()
  if (!product) return <div className="p-6 text-gray-600">Product not found.</div>

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font- mb-4">Edit Product</h1>
      <EditProductForm product={JSON.parse(JSON.stringify(product))} />
    </div>
  )
}
