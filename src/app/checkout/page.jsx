'use client'

import { useSession } from 'next-auth/react'
import { useCartStore } from '@/lib/cartStore'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'


export default function CheckoutPage() {
  const { data: session } = useSession()
  const { items, clear } = useCartStore()
  const router = useRouter()

  const [address, setAddress] = useState({
    name: '',
    phone: '',
    line1: '',
    city: '',
    pincode: '',
  })

  useEffect(() => {
    if (items.length === 0) router.push('/cart')
  }, [items, router])

  const total = items.reduce((sum, p) => sum + p.price * p.qty, 0)

  const handlePay = async () => {
    if (!address.name || !address.phone || !address.line1 || !address.city || !address.pincode) {
      alert('Please fill all shipping fields')
      return
    }

    // 1. Create Razorpay order
    const res = await fetch('/api/razorpay', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ total }),
    })

    const data = await res.json()
    if (!data.id) return alert('Failed to create Razorpay order')

    // 2. Load Razorpay script
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: 'INR',
        name: 'Spark & Stitch',
        description: 'Order Payment',
        order_id: data.id,
        handler: async function (response) {
          // 3. Create order in DB after payment
          const confirm = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              items,
              address,
              payment: response,
            }),
          })

          if (confirm.ok) {
            clear()
            router.push('/orders')
          } else {
            alert('Order saving failed')
          }
        },
        prefill: {
          name: address.name,
          contact: address.phone,
          email: session?.user?.email || '',
        },
        theme: {
          color: '#38bdf8',
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    }

    document.body.appendChild(script)
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Shipping & Payment</h2>

      {/* Shipping Address */}
      <div className="space-y-2">
        <input
          placeholder="Name"
          className="border w-full p-2"
          value={address.name}
          onChange={e => setAddress({ ...address, name: e.target.value })}
        />
        <input
          placeholder="Phone"
          className="border w-full p-2"
          value={address.phone}
          onChange={e => setAddress({ ...address, phone: e.target.value })}
        />
        <input
          placeholder="Address Line"
          className="border w-full p-2"
          value={address.line1}
          onChange={e => setAddress({ ...address, line1: e.target.value })}
        />
        <input
          placeholder="City"
          className="border w-full p-2"
          value={address.city}
          onChange={e => setAddress({ ...address, city: e.target.value })}
        />
        <input
          placeholder="Pincode"
          className="border w-full p-2"
          value={address.pincode}
          onChange={e => setAddress({ ...address, pincode: e.target.value })}
        />
      </div>

      {/* Cart Summary */}
      <div className="border-t pt-4">
        {items.map(item => (
          <p key={item._id} className="flex justify-between text-sm">
            {item.name} × {item.qty}
            <span>₹{item.qty * item.price}</span>
          </p>
        ))}
        <p className="flex justify-between font-bold mt-2 text-lg">
          Total <span>₹{total}</span>
        </p>
      </div>

      {/* Pay Now Button */}
      <button
        onClick={handlePay}
        className="bg-green-600 text-white px-4 py-2 rounded w-full"
      >
        Pay Now
      </button>
    </div>
  )
}
