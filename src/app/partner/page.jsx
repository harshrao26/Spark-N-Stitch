"use client"
import React, { useState, useEffect } from "react";
import { load } from "@cashfreepayments/cashfree-js";

const PartnerPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [cashfree, setCashfree] = useState(null);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    (async () => {
      const cf = await load({ mode: "sandbox" });
      setCashfree(cf);
    })();
  }, []);

  const getSessionId = async () => {
  const res = await fetch("/api/cashfree/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      total: 199,
      email: "partner@example.com", // ✅ Replace with actual email input later
      address: {
        name: "Spark Partner",      // ✅ Replace with input if needed
        phone: "9999999999",        // ✅ Replace with input if needed
      },
      items: [],
    }),
  });

  const data = await res.json();
  setOrderId(data.order_id);
  return data.payment_session_id;
};

  const verifyPayment = async () => {
    const res = await fetch("/api/cashfree/verify", {
      method: "POST",
      body: JSON.stringify({ orderId }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    // ✅ You can add more checks here like payment status === "SUCCESS"
    if (data && data.length > 0) {
      setShowPopup(true);
    }
  };

  const handlePayment = async () => {
    const sessionId = await getSessionId();

    await cashfree.checkout({
      paymentSessionId: sessionId,
      redirectTarget: "_modal",
    });

    // Optionally: wait and verify after a delay
    setTimeout(() => {
      verifyPayment();
    }, 4000);
  };

  return (
    <div className="bg-white min-h-screen py-16 px-6 md:px-12">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Become a Spark Partner
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Join our affiliate program and be a part of India’s coworking revolution.
        </p>

        <div className="bg-pink-50 border border-[#e74694] rounded-lg p-6 mb-10 text-left shadow">
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Earn up to 20% commission</li>
            <li>Access dashboard, resources & early launches</li>
            <li>Private WhatsApp support group</li>
          </ul>
          <div className="mt-6 text-pink-700 font-medium">
            💰 One-time Entry Fee: ₹199
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
              Click below to join our private WhatsApp group.
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
