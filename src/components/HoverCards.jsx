'use client'
import React from 'react'
import Image from 'next/image'
import img from '@/assets/image.png'
import img2 from '@/assets/image2.png'
import img3 from '@/assets/image3.png'

const categories = [
  {
    title: "Women’s Trendy Styles",
    subtitle: "Explore the latest fashion trends for women. From chic to casual, find styles for every occasion.",
    image: img,
  },
  {
    title: "Everyone's Fashion Essentials",
    subtitle: "Shop a curated collection of must-have men’s styles, from classic pieces to modern fashion statements.",
    image: img2,
  },
  {
    title: "Accessories to Complete",
    subtitle: "Find stylish accessories to elevate any outfit. From bags to jewelry, add the perfect finishing touch.",
    image: img3,
  },
]

const HoverCards = () => {
  return (
    <div className="grid md:grid-cols-3  gap-6 px-6 py-12">
      {categories.map((item, idx) => (
        <div
          key={idx}
          className="relative group h-[650px] overflow-hidden rounded-xl shadow-lg cursor-pointer"
        >
          {/* Background image with scale on hover */}
          <Image
            src={item.image}
            alt={item.title}
            className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-110"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent transition-opacity duration-500 opacity-0 group-hover:opacity-100" />

          {/* Hover Content */}
          <div className="absolute bottom-0 p-6 w-full transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 text-white">
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="text-sm mt-2">{item.subtitle}</p>
            <button className="mt-4 border border-white px-4 py-2 text-sm rounded hover:bg-white hover:text-black transition duration-300">
              Show More
            </button>
          </div>

          {/* Static title (shown before hover) */}
          <div className="absolute bottom-6 left-6 text-white text-xl font-bold group-hover:opacity-0 transition-opacity duration-300">
            {item.title}
          </div>
        </div>
      ))}
    </div>
  )
}

export default HoverCards
