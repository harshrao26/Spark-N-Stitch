'use client'
import { useState, useEffect } from 'react'
    
const banners = [
  { image:  'https://rmkv.com/cdn/shop/articles/rmkv-silk-sarees-model-blog-banner.jpg?v=1726644370',
 title: 'New Arrivals for Men' },
  { image:     'https://gillori.com/cdn/shop/articles/Blog_Banner_copy_193d5a32-e936-442f-a87c-c66f38ff218f.jpg?v=1724231203&width=1600',
 title: 'Women’s Summer Styles' },
  { image:     'https://www.manyavar.com/on/demandware.static/-/Library-Sites-ManyavarSharedLibrary/default/dwe6547122/Ace_Your_Saree_Banner_D.jpg',
 title: 'Kids Collection - Up to 50% Off' },
]

export default function HeroCarousel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full h-[60vh]  overflow-hidden">
      {banners.map((banner, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <img
            src={banner.image}
            alt={banner.title}
            className="w-full h-full object-cover"
          />
          {/* <div className="absolute bottom-10 left-10 bg-black/50 text-white text-3xl font-bold px-4 py-2 rounded">
            {banner.title}
          </div> */}
        </div>
      ))}
    </div>
  )
}
