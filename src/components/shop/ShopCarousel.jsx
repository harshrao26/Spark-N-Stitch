'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

import shop from '@/assets/shop.png'
import shop2 from '@/assets/shop2.png'
import shop3 from '@/assets/shop3.png'
import shop4 from '@/assets/shop4.png'

const banners = [shop, shop2, shop3, shop4]

export default function ShopCarousel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full overflow-hidden rounded-xl relative md:h-80 h-44 mt-4">
      <div
        className="flex  transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {banners.map((banner, i) => (
          <div key={i} className="min-w-full md:h-80 h-44 relative ">
            <Image
              src={banner}
              alt={`Shop banner ${i + 1}`}
              fill
              className="object-cover"
              priority={i === 0}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
