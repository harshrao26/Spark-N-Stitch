import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { connectDB } from '@/lib/mongoose'
import Product from '@/models/Product'
import AdminProductPanel from '@/components/admin/AdminProductPanel.jsx'

export default async function AdminProductsPage() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') {
    return <div className="p-6 text-red-600">Access Denied</div>
  }

  await connectDB()
  const products = await Product.find().sort({ createdAt: -1 }).lean()

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Products</h1>
      <AdminProductPanel products={JSON.parse(JSON.stringify(products))} />
    </div>
  )
}
