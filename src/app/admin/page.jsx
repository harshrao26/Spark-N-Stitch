import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { connectDB } from '@/lib/mongoose';
import Order from '@/models/Order';
import AdminOrdersClient from '@/components/admin/AdminOrdersClient';
import ProductCreateForm from '@/components/admin/ProductCreateForm';
import Link from 'next/link';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  console.log("🔥 SESSION in /admin:", session);

  if (!session || session.user.role !== 'admin') {
    return (
      <div className="p-8 h-screen flex items-center justify-center text-4xl text-white bg-red-600">
        Access Denied
      </div>
    );
  }

  await connectDB();
  const orders = await Order.find().sort({ createdAt: -1 }).lean();

  return (
    <div className="px-6 py-12 max-w-6xl mx-auto space-y-12">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font- text-gray-900">Admin Dashboard</h1>
        <Link
          href="/admin/products"
          className="bg-black text-white px-5 py-2 rounded-full text-sm"
        >
          Manage Products
        </Link>
      </div>

      <section className="bg-white border rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semi text-gray-800 mb-4">Recent Orders</h2>
        <AdminOrdersClient orders={JSON.parse(JSON.stringify(orders))} />
      </section>

      <section className="bg-white border rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semi text-gray-800 mb-4">Add Product</h2>
        <ProductCreateForm />
      </section>
    </div>
  );
}
