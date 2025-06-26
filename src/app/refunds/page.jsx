"use client"
import React from "react";
import {
  FaUndoAlt,
  FaTimesCircle,
  FaVideo,
  FaClock,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import banner from "@/assets/refund-banner.png"; 
import Image from "next/image";
// Add a clean refund/cancellation image

const Section = ({ icon: Icon, title, children }) => (
  <div className="mb-10">
    <h2 className="flex items-center gap-3 text-xl font-semibold text-gray-800 mb-2">
      <Icon className="text-pink-600" />
      {title}
    </h2>
    <div className="text-gray-700 text-sm leading-relaxed">{children}</div>
  </div>
);

const RefundPolicy = () => {
  return (
    <div className="bg-[#fdf8f2] text-gray-800 min-h-screen pt-6 pb-16 px-4 md:px-16">
      {/* Banner */}
      <div className="relative w-full h-48 md:h-64 overflow-hidden rounded-xl mb-10 shadow">
        <Image src={banner} alt="Refund Policy Banner" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Refund & Cancellation Policy</h1>
          <p className="text-sm md:text-base max-w-2xl">
            Know your rights when it comes to refunds, replacements, and order cancellations at Spark n Stitch.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-10">
        <Section icon={FaUndoAlt} title="1. Return & Replacement Policy">
          <p>
            We only accept return or replacement requests when customers provide:
          </p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>An unboxing video that begins before opening the parcel</li>
            <li>Clear photos of the packaging and product at time of delivery</li>
          </ul>
          <p className="mt-3 font-semibold">Note:</p>
          <ul className="list-disc ml-6 space-y-1">
            <li>No returns or replacements without video/photo proof</li>
            <li>Returned items must be unused and in original packaging</li>
          </ul>
        </Section>

        <Section icon={FaTimesCircle} title="2. Non-Returnable Items">
          <ul className="list-disc ml-6 space-y-1">
            <li>Customized or personalized products</li>
            <li>Items purchased on discount/sale</li>
            <li>Products returned without video proof</li>
          </ul>
        </Section>

        <Section icon={FaClock} title="3. Cancellation Policy">
          <ul className="list-disc ml-6 space-y-1">
            <li>Orders can only be cancelled within <strong>12 hours</strong> of placing them</li>
            <li>No cancellation requests will be accepted after 12 hours</li>
            <li>Refunds (if eligible) are processed within 7 business days</li>
          </ul>
        </Section>

        <Section icon={FaVideo} title="4. Why Unboxing Video is Required">
          <p>
            The unboxing video is our only proof to verify product issues or damages. It helps us ensure fairness and prevent misuse of the return system.
          </p>
        </Section>

        <Section icon={FaEnvelope} title="5. Contact Us">
          <div className="flex flex-col gap-2 mt-2 text-sm">
            <p className="flex items-center gap-2"><FaEnvelope /> business.sparknstitch@gmail.com</p>
            <p className="flex items-center gap-2"><FaMapMarkerAlt /> Jay Yogeshaver Complex, D124, Randesan, Gandhinagar, 382421, India</p>
          </div>
        </Section>
      </div>
    </div>
  );
};

export default RefundPolicy;
