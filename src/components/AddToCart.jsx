'use client'

import { FaCartPlus } from 'react-icons/fa'
import { useCartStore } from '@/lib/cartStore'
import { useSession, signIn } from 'next-auth/react'

export default function AddToCart({ product }) {
  const { data: session } = useSession()
  const add = useCartStore((s) => s.add)

  const handleAdd = () => {
    if (!session) {
      alert('Please login to add items to cart.')
      signIn('google') // Or show login modal if using credentials
      return
    }

    add({ ...product })
  }

  return (
    <button
      onClick={handleAdd}
      className="flex items-center gap-2 bg-pink-500 hover:bg-pink-700 text-white font-medium px-4 py-2 rounded-md transition w-full justify-center"
    >
      <FaCartPlus size={16} />
      Add
    </button>
  )
}
