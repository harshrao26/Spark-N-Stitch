"use client"
import Link from 'next/link';
import React from 'react';

const PromoSection = () => {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center px-6 md:px-12 gap-8">
        
        {/* Left Text Block */}
        <div className="text-center md:text-left">
          <h2 className="text-4xl font-bold mb-4">Shop Now For<br />Exclusive Styles!</h2>
          <p className="text-gray-600 mb-6">
            Browse our latest collection of chic, high-quality fashion pieces.<br />
            Shop today and enjoy fast, free shipping!
          </p>
          <Link href="/shop" className="bg-white border border-pink-500 text-pink-600 px-6 py-2 rounded shadow hover:bg-pink-500 hover:text-white transition">
            Learn More
          </Link>
        </div>

        {/* Right Image */}
        <div>
          <img
            src="https://assets.myntassets.com/f_webp,fl_progressive/h_1440,q_70,w_1080/v1/assets/images/32224330/2025/1/11/e08d8d5a-5dba-485c-bc44-24615f0d403d1736604122043-GoSriKi-Women-Printed-Regular-Kurta-with-Palazzos--With-Dupa-1.jpg"
            alt="Promo"
            className="w-full h-auto object-cover rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default PromoSection;
