'use client'
import { useEffect, useState } from 'react'

export default function OrdersTable() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    fetch('/api/admin/orders').then(res => res.json()).then(setOrders)
  }, [])

  const updateStatus = async (id, status) => {
    await fetch(`/api/admin/orders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    setOrders(orders.map(o => o._id === id ? { ...o, status } : o))
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl mt-6 mb-2 font- ">Orders</h2>
      <table className="w-full border">
        <thead>
          <tr><th>Email</th><th>Total</th><th>Status</th></tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order.userEmail}</td>
              <td>₹{order.total}</td>
              <td>
                <select
                  value={order.status}
                  onChange={e => updateStatus(order._id, e.target.value)}
                  className="border px-2 py-1 rounded"
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="shipped">Shipped</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
