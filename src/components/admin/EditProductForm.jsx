'use client'
import { useState } from 'react'

export default function EditProductForm({ product }) {
  const [form, setForm] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    category: product.category,
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

   const handleDelete = async () => {
    const confirmDelete = confirm('Are you sure you want to delete this product?')
    if (!confirmDelete) return

    const res = await fetch(`/api/products/${product._id}`, { method: 'DELETE' })
    if (res.ok) {
      alert('🗑️ Product deleted')
      router.push('/admin/products') // Redirect to product list
    } else {
      alert('❌ Failed to delete product')
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch(`/api/products/${product._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      alert('✅ Product updated successfully!')
    } else {
      alert('❌ Update failed.')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 space-y-6 border border-gray-200"
    >
 
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Product Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black transition"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black transition"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Price (₹)</label>
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black transition"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Stock</label>
          <input
            name="stock"
            value={form.stock}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black transition"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Category</label>
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black transition"
        />
      </div>

      <button
        type="submit"
        className="mt-4 bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition font-medium text-sm"
      >
        Save Changes
      </button>


        <button
          type="button"
          onClick={handleDelete}
          className="text-red-600 text-sm font-medium hover:underline"
        >
          Delete Product
        </button>
    </form>
  )
}
