"use client"
import React, { useState } from "react";

const PartnerPage = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handlePayment = () => {
    const options = {
      key: "rzp_test_bLJCkbDJ1qiQui", // replace with real Razorpay key
      amount: 19900,
      currency: "INR",
      name: "Spark Partner Program",
      description: "Affiliate Entry Fee",
      handler: function (response) {
        // ✅ Show WhatsApp popup
        setShowPopup(true);
      },
      prefill: {
        name: "New Partner",
        email: "partner@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#e74694",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="bg-white min-h-screen py-16 px-6 md:px-12">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Become a Spark Partner
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Join our affiliate program and be a part of India’s coworking revolution. Earn, grow, and get exclusive access to resources.
        </p>

        <div className="bg-pink-50 border border-[#e74694] rounded-lg p-6 mb-10 text-left shadow">
          <h2 className="text-xl font-semibold mb-2">Why Join?</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Earn up to 20% commission on referrals</li>
            <li>Exclusive partner dashboard</li>
            <li>Early access to launches</li>
            <li>Private WhatsApp support group</li>
          </ul>

          <div className="mt-6 text-pink-700 font-medium">
            💰 One-time Entry Fee: ₹199 (includes partner kit & access)
          </div>
        </div>

        <button
          onClick={handlePayment}
          className="bg-[#e74694] hover:bg-pink-600 text-white text-lg px-8 py-3 rounded-full font-semibold transition duration-300"
        >
          Pay ₹199 & Join Now
        </button>
      </div>

      {/* ✅ WhatsApp Group Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-lg max-w-sm w-full text-center">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              🎉 Payment Successful!
            </h3>
            <p className="text-gray-600 mb-6">
              Click below to join our private partner WhatsApp group.
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
    </div>
  );
};

export default PartnerPage;
