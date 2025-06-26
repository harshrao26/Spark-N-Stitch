import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { connectDB } from '@/lib/mongoose'
import Order from '@/models/Order'

import AdminOrdersClient from './orders/AdminOrdersClient'
import ProductCreateForm from '@/components/ProductCreateForm'
import Link from 'next/link'

export default async function AdminPage() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') {
    return <div className="p-8 text-red-600">Access denied</div>
  }

  await connectDB()
  const orders = await Order.find().sort({ createdAt: -1 }).lean()

  return (
    <div className="px-6 py-12 max-w-6xl mx-auto space-y-12">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <Link
          href="/admin/products"
          className="bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition"
        >
          Manage Products
        </Link>
      </div>

      {/* Orders Section */}
      <section className="bg-white border rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Orders</h2>
        <AdminOrdersClient orders={JSON.parse(JSON.stringify(orders))} />
      </section>

      {/* Product Create Section */}
      <section className="bg-white border rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Product</h2>
        <ProductCreateForm />
      </section>

      {/* Users Section (if needed in future) */}
      {/* <section className="bg-white border rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Users</h2>
        <AdminUserList />
      </section> */}
    </div>
  )
}
