'use client';

import { useState } from 'react';

export default function AdminOrdersPage({ orders = [] }) {
  const [localOrders, setLocalOrders] = useState(orders);

  const updateStatus = async (id, newStatus) => {
    const res = await fetch(`/api/admin/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });

    if (res.ok) {
      const updated = await res.json();
      setLocalOrders((prev) =>
        prev.map((o) => (o._id === id ? { ...o, status: updated.status } : o))
      );
    } else {
      alert('Failed to update status');
    }
  };

  if (!localOrders.length) {
    return <p className="p-6 text-gray-500">No orders found.</p>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold mb-4">All Orders</h2>

      {localOrders.map((order) => (
        <div
          key={order._id}
          className="border p-4 rounded-xl shadow bg-white space-y-4"
        >
          {/* Order Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm gap-2">
            <span className="text-gray-600">
              User: <strong>{order.userEmail}</strong>
            </span>
            <div className="flex items-center gap-2">
              <span>Status:</span>
              <select
                className="border px-2 py-1 text-sm rounded"
                value={order.status}
                onChange={(e) => updateStatus(order._id, e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Order Items */}
          <div className="grid gap-2">
            {order.items.map((item, i) => (
              <div
                key={i}
                className="flex gap-3 items-center border-b pb-2 last:border-none"
              >
                <img
                  src={item.image || '/placeholder.jpg'}
                  alt={item.name}
                  className="w-14 h-14 object-cover rounded border"
                />
                <div className="text-sm text-gray-800">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-500">
                    {item.selectedSize && `Size: ${item.selectedSize}`}
                    {item.color && ` | Color: ${item.color}`}
                  </p>
                  <p className="text-gray-500">
                    Qty: {item.quantity} × ₹{item.price}
                  </p>
                  <p className="font-semibold">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Total */}
          <div className="text-right font-semibold text-gray-800 text-base">
            Total: ₹{order.total}
          </div>
        </div>
      ))}
    </div>
  );
}
