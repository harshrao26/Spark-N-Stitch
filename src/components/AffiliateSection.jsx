'use client'
import React, { useState } from 'react'
import Script from 'next/script'

const AffiliateSection = () => {
  const [showPopup, setShowPopup] = useState(false)

  const handleAffiliatePayment = () => {
    const options = {
      key: 'rzp_test_bLJCkbDJ1qiQui', // ✅ Replace with your live Razorpay key in production
      amount: 19900, // ₹199 in paise
      currency: 'INR',
      name: 'Affiliate Program',
      description: 'Join as Affiliate Partner',
      handler: function (response) {
        setShowPopup(true)
      },
      prefill: {
        name: 'Affiliate User',
        email: 'user@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#111827',
      },
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  return (
    <section className="bg-white py-20 px-6 md:px-12 relative">
      {/* Razorpay Script */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

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
