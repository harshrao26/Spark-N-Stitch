'use client'

import { useState } from 'react'
import { FaEye, FaTimes } from 'react-icons/fa'

export default function AdminOrdersClient({ orders }) {
  const [localOrders, setLocalOrders] = useState(orders)
  const [selectedOrder, setSelectedOrder] = useState(null)

  const updateStatus = async (id, newStatus) => {
    const res = await fetch(`/api/admin/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })

    if (res.ok) {
      const updated = await res.json()
      setLocalOrders((prev) =>
        prev.map((o) => (o._id === id ? { ...o, status: updated.status } : o))
      )
    } else {
      alert('Failed to update status')
    }
  }

  {console.log(localOrders)}

  const statusColor = {
    pending: 'bg-yellow-100 text-yellow-800',
    paid: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
  }

  return (
    <div className="p- max-w-7xl mx-auto space-y-4">
 
      <div className="overflow-x-auto border rounded">
        <table className="w-full text-sm">
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
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className={`px-2 py-1 rounded ${statusColor[order.status]}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
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
      </div>

      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-2 right-2 text-red-500"
            >
              <FaTimes />
            </button>

            <h3 className="text-lg font-semibold mb-2">Order Details</h3>
            <p className="text-sm text-gray-700 mb-2"><strong>Email:</strong> {selectedOrder.userEmail}</p>
            <p className="text-sm text-gray-700 mb-4">
              <strong>Status:</strong>{' '}
              <span className={`px-2 py-1 rounded text-xs font-medium ${statusColor[selectedOrder.status]}`}>
                {selectedOrder.status}
              </span>
            </p>

            <div className="mb-3">
              <h4 className="font-semibold text-sm mb-1">Shipping Address</h4>
              <p className="text-sm text-gray-600">
                {selectedOrder.address?.name}, {selectedOrder.address?.line1},<br />
                {selectedOrder.address?.city} - {selectedOrder.address?.pincode}<br />
                Phone: {selectedOrder.address?.phone}
              </p>
            </div>

            <div className="mb-3">
              <h4 className="font-semibold text-sm mb-1">Items</h4>
              <ul className="text-sm list-disc ml-5 space-y-1 text-gray-700">
                {selectedOrder.items.map((item, i) => {
  const qty = item.qty ?? 1; // fallback to 1
  return (
    <li key={i}>
      {item.name} × {qty} — ₹{qty * item.price}
    </li>
  );
})}

              </ul>
            </div>

            <div className="text-right font-semibold text-base">
              Total: ₹{selectedOrder.total}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
