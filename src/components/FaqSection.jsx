"use client"
import React, { useState } from 'react';

const faqs = [
  {
    question: "How do I place an order?",
    answer: "Simply browse our products, add them to your cart, and checkout. You'll receive a confirmation email shortly after.",
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept credit/debit cards, UPI, PayPal, and several other secure payment options.",
  },
  {
    question: "When will my order arrive?",
    answer: "Delivery typically takes 3–7 business days depending on your location and shipping option.",
  },
  {
    question: "Can I return or exchange items?",
    answer: "Yes, we offer a 30-day return/exchange policy on most items. Please refer to our returns page for details.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0); // Default open first item

  const toggle = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <section className="bg-white py-12 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center px-6 py-4 text-left text-lg font-medium hover:bg-gray-50 transition"
            >
              {faq.question}
              <span className="text-xl">{openIndex === index ? '−' : '+'}</span>
            </button>
            <div
              className={`px-6 pb-4 text-gray-600 text-sm transition-all duration-300 ease-in-out ${
                openIndex === index ? 'block' : 'hidden'
              }`}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqSection;
