'use client';

import { useState } from 'react';
import { FaEye, FaTimes } from 'react-icons/fa';

export default function AdminOrdersClient({ orders }) {
  const [localOrders, setLocalOrders] = useState(orders);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const statusOptions = ['pending', 'paid', 'shipped', 'delivered'];
  console.log(localOrders);

  const statusColor = {
    pending: 'bg-yellow-100 text-yellow-800',
    paid: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
  };

  const updateStatus = async (orderId, newStatus) => {
    const res = await fetch(`/api/admin/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });

    if (res.ok) {
      const updated = localOrders.map((o) =>
        o._id === orderId ? { ...o, status: newStatus } : o
      );
      setLocalOrders(updated);
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    } else {
      alert('Failed to update status');
    }
  };

  const handleSort = (value) => {
    const sorted = [...localOrders];
    if (value === 'status') {
      sorted.sort((a, b) => a.status.localeCompare(b.status));
    } else if (value === 'total') {
      sorted.sort((a, b) => b.total - a.total);
    } else if (value === 'latest') {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    setLocalOrders(sorted);
  };

  return (
    <div className="space-y-4">
      {/* Sorting */}
      <div className="flex justify-end mb-2">
        <select
          onChange={(e) => handleSort(e.target.value)}
          className="border px-3 py-1 text-sm rounded"
        >
          <option value="">Sort Orders</option>
          <option value="latest">Latest First</option>
          <option value="status">Status</option>
          <option value="total">Total Amount</option>
        </select>
      </div>

      {/* Orders Table */}
      <table className="w-full text-sm border">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">User</th>
            <th className="p-3">Items</th>
            <th className="p-3">Total</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {localOrders.map((order) => (
            <tr key={order._id} className="border-t">
              <td className="p-3">{order.userEmail}</td>
              <td className="p-3">{order.items.length}</td>
              <td className="p-3">₹{order.total}</td>
              <td className="p-3">
                <span className={`px-2 py-1 rounded ${statusColor[order.status]}`}>
                  {order.status}
                </span>
              </td>
              <td className="p-3">
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaEye />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Order Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              <FaTimes />
            </button>

            <h2 className="text-xl font-  mb-2">Order Details</h2>
            <p className="text-sm text-gray-700 mb-1">
              <strong>User:</strong> {selectedOrder.userEmail}
            </p>
            <p className="text-sm text-gray-700 mb-1">
              <strong>Total:</strong> ₹{selectedOrder.total}
            </p>

            {/* Status Update */}
            <div className="mt-3">
              <label className="block text-sm font- mb-1">Update Status:</label>
              <select
                value={selectedOrder.status}
                onChange={(e) => updateStatus(selectedOrder._id, e.target.value)}
                className="border rounded px-2 py-1 text-sm w-full"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            {/* Order Items */}
            <div className="mt-4">
              <h3 className="font- mb-2">Items:</h3>
              <ul className="space-y-2">
                {selectedOrder.items.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 border-b pb-2 last:border-none"
                  >
                    <img
                      src={item.image || '/placeholder.png'}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="text-sm text-gray-700">
                      <p>{item.name}</p>
                      <p className="text-xs">
                        Qty: {item.quantity} × ₹{item.price}
                      </p>
                      {(item.selectedSize || item.color) && (
                        <p className="text-xs text-gray-500">
                          {item.selectedSize && `Size: ${item.selectedSize}`}
                          {item.color && ` | Color: ${item.color}`}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Shipping */}
            <div className="mt-4">
              <h3 className="font- mb-1">Shipping Address:</h3>
              <p className="text-sm text-gray-600">
                {selectedOrder.address.name}, {selectedOrder.address.line1},<br />
                {selectedOrder.address.city} - {selectedOrder.address.pincode}
                <br />
                📞 {selectedOrder.address.phone}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
