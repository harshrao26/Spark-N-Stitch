'use client'

import { useSession } from 'next-auth/react'
import { useCartStore } from '@/lib/cartStore'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { load } from '@cashfreepayments/cashfree-js'

export default function CheckoutPage() {
  const { data: session } = useSession()
  const { items, clear } = useCartStore()
  const router = useRouter()

  const [cashfree, setCashfree] = useState(null)
  const [orderId, setOrderId] = useState('')
  const [address, setAddress] = useState({
    name: '',
    phone: '',
    line1: '',
    city: '',
    pincode: '',
  })

  useEffect(() => {
    if (items.length === 0) router.push('/cart')

    const init = async () => {
      const cf = await load({ mode: 'sandbox' }) // change to 'production' later
      setCashfree(cf)
    }

    init()
  }, [items, router])

  const total = items.reduce((sum, p) => sum + p.price * p.qty, 0)

  const handlePay = async () => {
    if (!address.name || !address.phone || !address.line1 || !address.city || !address.pincode) {
      alert('Please fill all shipping fields')
      return
    }

    const payload = {
      total,
      address,
      items,
      email: session?.user?.email || '',
    }

    const res = await fetch('/api/cashfree/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const text = await res.text()
      console.error('Cashfree session error:', text)
      alert('Failed to create payment session')
      return
    }

    const data = await res.json()

    if (!data.payment_session_id) {
      alert('Payment session failed')
      return
    }

    setOrderId(data.order_id)

    await cashfree.checkout({
      paymentSessionId: data.payment_session_id,
      redirectTarget: '_modal',
    })

    const verify = await fetch('/api/cashfree/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId: data.order_id }),
    })

    const result = await verify.json()
    console.log("Verification Result:", result)

    const isPaid =
      result.order_status === 'PAID' ||
      result[0]?.payment_status === 'SUCCESS' ||
      result[0]?.payment_status === 'PAID'

    if (isPaid) {
      const confirm = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          address,
          payment: result,
          email: session?.user?.email || '',
        }),
      })

      if (confirm.ok) {
        clear()
        router.push('/orders')
      } else {
        alert('Order saving failed')
      }
    } else {
      alert('Payment failed or pending')
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Shipping & Payment</h2>

      <div className="space-y-2">
        <input placeholder="Name" className="border w-full p-2" value={address.name} onChange={e => setAddress({ ...address, name: e.target.value })} />
        <input placeholder="Phone" className="border w-full p-2" value={address.phone} onChange={e => setAddress({ ...address, phone: e.target.value })} />
        <input placeholder="Address Line" className="border w-full p-2" value={address.line1} onChange={e => setAddress({ ...address, line1: e.target.value })} />
        <input placeholder="City" className="border w-full p-2" value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} />
        <input placeholder="Pincode" className="border w-full p-2" value={address.pincode} onChange={e => setAddress({ ...address, pincode: e.target.value })} />
      </div>

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

      <button onClick={handlePay} className="bg-green-600 text-white px-4 py-2 rounded w-full">
        Pay Now
      </button>
    </div>
  )
}
