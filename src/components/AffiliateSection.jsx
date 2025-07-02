'use client'
import React, { useState, useEffect } from 'react'
import { load } from '@cashfreepayments/cashfree-js'

const AffiliateSection = () => {
  const [showPopup, setShowPopup] = useState(false)
  const [cashfree, setCashfree] = useState(null)
  const [orderId, setOrderId] = useState('')

  useEffect(() => {
    (async () => {
      const cf = await load({ mode: 'production' }) // use 'production' in live
      setCashfree(cf)
    })()
  }, [])

  const getSessionId = async () => {
    const res = await fetch('/api/cashfree/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        total: 199,
        email: 'user@example.com',
        address: {
          name: 'Affiliate User',
          phone: '9999999999',
        },
        items: [],
      }),
    })

    const data = await res.json()
    setOrderId(data.order_id)
    return data.payment_session_id
  }

  const verifyPayment = async () => {
    const res = await fetch('/api/cashfree/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId }),
    })

    const data = await res.json()
    if (data && data.length > 0) {
      setShowPopup(true)
    }
  }

  const handleAffiliatePayment = async () => {
    const sessionId = await getSessionId()

    await cashfree.checkout({
      paymentSessionId: sessionId,
      redirectTarget: '_modal',
    })

    setTimeout(() => {
      verifyPayment()
    }, 4000)
  }

  return (
    <section className="bg-white py-20 px-6 md:px-12 relative">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-6 text-gray-900">
            Become an Affiliate Partner
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Join our partner program and earn commissions by promoting high-quality fashion products.
            Share your unique referral link and start earning today.
          </p>
          <button
            onClick={handleAffiliatePayment}
            className="inline-block border border-gray-900 text-gray-900 px-6 py-3 rounded-full font-medium text-sm uppercase tracking-widest hover:bg-gray-900 hover:text-white transition duration-300"
          >
            Join Now ₹199
          </button>
        </div>

        {/* Right Visual */}
        <div className="md:w-1/2 relative group">
          <div className="overflow-hidden rounded-xl shadow-lg">
            <img
              src="https://static.vecteezy.com/system/resources/previews/006/998/987/non_2x/affiliate-marketing-illustration-vector.jpg"
              alt="Affiliate"
              className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700 ease-in-out"
            />
          </div>
        </div>
      </div>

      {/* ✅ Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-xl max-w-sm w-full text-center">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              🎉 Payment Successful!
            </h3>
            <p className="text-gray-600 mb-6">
              Welcome to our affiliate program. Click below to join our WhatsApp group.
            </p>
            <a
              href="https://chat.whatsapp.com/EGXJWqqAp7s3ODEVLNMYzB"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-medium"
            >
              Join WhatsApp Group
            </a>
            <button
              onClick={() => setShowPopup(false)}
              className="block mt-4 text-sm text-gray-500 hover:underline mx-auto"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

export default AffiliateSection
