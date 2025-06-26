const categories = [
  { label: 'Men', image: '/categories/men.jpg', href: '/shop?idealFor=Men' },
  { label: 'Women', image: '/categories/women.jpg', href: '/shop?idealFor=Women' },
  { label: 'Kids', image: '/categories/kids.jpg', href: '/shop?idealFor=Kids' },
]

export default function FeaturedCategories() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6">
      {categories.map((cat, i) => (
        <a key={i} href={cat.href} className="relative group overflow-hidden rounded shadow hover:scale-105 transition">
          <img src={cat.image} alt={cat.label} className="w-full h-60 object-cover" />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white text-2xl font-bold">
            {cat.label}
          </div>
        </a>
      ))}
    </div>
  )
}
