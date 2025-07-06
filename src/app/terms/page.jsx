"use client"

import React from "react";
import {
  FaGavel,
  FaShieldAlt,
  FaShippingFast,
  FaUndo,
  FaBan,
  FaInfoCircle,
  FaBalanceScale,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import banner from "@/assets/terms-banner.png"; // Add a clean styled image here
import Image from "next/image";
const Section = ({ icon: Icon, title, children }) => (
  <div className="mb-10">
    <h2 className="flex items-center gap-3 text-xl font- text-gray-800 mb-2">
      <Icon className="text-pink-600" />
      {title}
    </h2>
    <div className="text-gray-700 text-sm leading-relaxed">{children}</div>
  </div>
);

const TermsPage = () => {
  return (
    <div className="bg-[#fdf8f2] text-gray-800 min-h-screen pt-6 pb-16 px-4 md:px-16">
      {/* Banner */}
      <div className="relative w-full h-48 md:h-64 overflow-hidden rounded-xl mb-10 shadow">
        <Image
          src={banner}
          alt="Terms and Conditions Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-3xl md:text-4xl font-v mb-2">Terms & Conditions</h1>
          <p className="text-sm md:text-base max-w-2xl">
            Please read carefully before using Spark n Stitch. These terms define our commitment and your rights.
          </p>
        </div>
      </div>

      {/* Sections */}
      <div className="max-w-5xl mx-auto space-y-10">
        <Section icon={FaInfoCircle} title="1. Introduction">
          <p>
            These Terms and Conditions govern your use of the Spark n Stitch website and your relationship with us.
            By accessing this website or placing an order, you agree to these Terms. For queries, contact us at
            <strong> 9313089425</strong> or <strong>business.sparknstitch@gmail.com</strong>.
          </p>
        </Section>

        <Section icon={FaShieldAlt} title="2. Use of Our Website">
          <ul className="list-disc ml-6 space-y-1">
            <li>Make legitimate purchases only</li>
            <li>Do not place false or fraudulent orders</li>
            <li>Provide accurate and complete contact details</li>
            <li>Be at least 18 years old or have parental consent</li>
          </ul>
        </Section>

        <Section icon={FaShippingFast} title="3. Product Availability & Delivery">
          <p>All orders are subject to availability. Standard delivery takes 7–15 business days. You’ll be notified of any delays.</p>
        </Section>

        <Section icon={FaBalanceScale} title="4. Pricing and Payment">
          <ul className="list-disc ml-6 space-y-1">
            <li>Prices are in INR and include applicable taxes</li>
            <li>We accept UPI, cards, and Paytm</li>
            <li>Orders are processed after full payment</li>
          </ul>
        </Section>

        <Section icon={FaUndo} title="5. Returns & Exchanges">
          <p>
            Returns are accepted only with an unboxing video and clear photos from parcel opening. No claims accepted without this proof.
          </p>
          <p className="mt-2 font-">Non-returnable:</p>
          <ul className="list-disc ml-6">
            <li>Customized/personalized items</li>
            <li>Discounted products</li>
            <li>Returns without proof</li>
          </ul>
        </Section>

        <Section icon={FaBan} title="6. Cancellations & Defects">
          <p>
            Orders can be canceled within 12 hours. Defective items are eligible for refund/replacement with valid photo proof.
          </p>
        </Section>

        <Section icon={FaGavel} title="7. Legal & Intellectual Property">
          <p>
            Spark n Stitch owns all website content. Unauthorized use is prohibited. These terms are governed by Indian law, with jurisdiction in Ahmedabad.
          </p>
        </Section>

        <Section icon={FaPhone} title="8. Contact Us">
          <div className="flex flex-col gap-2 mt-2 text-sm">
            <p className="flex items-center gap-2"><FaPhone /> 9313089425</p>
            <p className="flex items-center gap-2"><FaEnvelope /> business.sparknstitch@gmail.com</p>
            <p className="flex items-center gap-2"><FaMapMarkerAlt /> Ahmedabad, Gujarat, India</p>
          </div>
        </Section>
      </div>
    </div>
  );
};

export default TermsPage;
