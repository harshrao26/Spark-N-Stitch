import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectDB } from "@/lib/mongoose";
import Order from "@/models/Order";
import Product from "@/models/Product";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session)
    return (
      <div className="p-6 max-w-md mx-auto text-center space-y-4">
        <p className="text-lg font-medium">Please login to view your orders.</p>
        <Link
          href="/login"
          className="inline-block px-5 py-2 rounded bg-pink-500 text-white font-semibold hover:bg-pink-700 transition"
        >
          Login
        </Link>
      </div>
    );

  await connectDB();

  const orders = await Order.find({ userEmail: session.user.email })
    .sort({ createdAt: -1 })
    .lean();

  // 🔄 Merge image URLs from Product collection
  for (const order of orders) {
    for (const item of order.items) {
      const product = await Product.findById(item.productId).lean();
      item.image = product?.images?.[0] || "/placeholder.jpg";
    }
  }

  const current = orders.filter(
    (o) => o.status === "pending" || o.status === "paid"
  );
  const past = orders.filter(
    (o) => o.status === "shipped" || o.status === "delivered"
  );

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">My Orders</h2>

      {/* Current Orders */}
      <div>
        <h3 className="font-semibold mb-2">Current Orders</h3>
        {current.length === 0 ? (
          <p className="text-sm text-gray-500">No current orders.</p>
        ) : (
          current.map((order) => <OrderCard key={order._id} order={order} />)
        )}
      </div>

      {/* Past Orders */}
      <div>
        <h3 className="font-semibold mb-2 mt-6">Past Orders</h3>
        {past.length === 0 ? (
          <p className="text-sm text-gray-500">No past orders.</p>
        ) : (
          past.map((order) => <OrderCard key={order._id} order={order} />)
        )}
      </div>
    </div>
  );
}

function OrderCard({ order }) {
  const placedDate = new Date(order.createdAt);
  const deliveryDate = new Date(placedDate);
  deliveryDate.setDate(placedDate.getDate() + 7);

  const formatDate = (date) =>
    date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="border p-4 rounded-xl mb-6 shadow-sm bg-white space-y-3">
      <div className="flex justify-between items-center text-sm text-gray-600">
        <span className="font-medium">
          Order ID:{" "}
          <span className="text-gray-800">
            {order._id?.toString().slice(-6).toUpperCase()}
          </span>
        </span>
        <span>
          Status:{" "}
          <span className="capitalize font-semibold text-pink-600">
            {order.status}
          </span>
        </span>
      </div>

      {/* 📅 Order Dates */}
      <div className="text-sm text-gray-500 space-y-1">
        <p>Placed on: {formatDate(placedDate)}</p>
        <p>Estimated delivery: {formatDate(deliveryDate)}</p>
      </div>

      {/* Product List */}
      <ul className="divide-y text-sm">
        {order.items.map((item, i) => (
          <li key={i} className="flex gap-4 py-3 items-center">
            <img
              src={item.image || "/placeholder.jpg"}
              alt={item.name}
              className="w-16 h-16 object-cover rounded border"
            />
            <div className="flex-1">
              <p className="font-medium text-gray-800">{item.name}</p>
              <p className="text-gray-500 text-sm">
                Qty: {item.quantity} × ₹{item.price}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="text-right text-base font-bold">
        Total: ₹{order.total}
      </div>
    </div>
  );
}

