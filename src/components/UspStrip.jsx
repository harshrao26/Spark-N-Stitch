'use client'
import { FaShippingFast, FaUndoAlt, FaLock } from 'react-icons/fa'

export default function UspStrip() {
  const items = [
    {
      icon: <FaShippingFast size={28} className="text-pink-600" />,
      title: 'Free Delivery',
      desc: 'On orders above ₹2000',
    },
    {
      icon: <FaUndoAlt size={28} className="text-blue-600" />,
      title: 'Easy Returns',
      desc: '7-day hassle-free return',
    },
    {
      icon: <FaLock size={28} className="text-green-600" />,
      title: 'Secure Payments',
      desc: 'Pay with UPI / Cards ',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-6 py-8 bg-white border-y">
      {items.map((item, i) => (
        <div
          key={i}
          className="flex flex-col items-center text-center transition hover:scale-105"
        >
          <div className="mb-3">{item.icon}</div>
          <h3 className="text-base font-semibold text-gray-800">{item.title}</h3>
          <p className="text-sm text-gray-500">{item.desc}</p>
        </div>
      ))}
    </div>
  )
}
