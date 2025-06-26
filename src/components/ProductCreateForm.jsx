'use client'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import RichTextEditor from './RichTextEditor'
import GlobalToast from '@/components/GlobalToast'
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa'


const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'

export default function ProductCreateForm() {
  const [toast, setToast] = useState(null)

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    idealFor: 'Fashion',
    brand: '',
    type: '',
    stock: '',
    images: [],
  })

  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)



  const uploadImages = async () => {
    const urls = []
    for (let file of files) {
      const data = new FormData()
      data.append('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      })

      const json = await res.json()
      urls.push(json.url)
    }
    return urls
  }

  const handleSubmit = async () => {
    setLoading(true)

    try {
      const imageUrls = await uploadImages()

      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          images: imageUrls,
          price: +form.price,
          stock: +form.stock,
        }),
      })

if (res.ok) {
  setToast({
    icon: FaCheckCircle,
    iconColor: 'text-green-600',
    message: 'Product created successfully!',
  })
  setForm({
    name: '', description: '', price: '', idealFor: 'Fashion',
    brand: '', type: '', stock: '', images: []
  })
  setFiles([])
} else {
  setToast({
    icon: FaExclamationCircle,
    iconColor: 'text-red-600',
    message: '❌ Failed to create product',
  })
}

    } catch (err) {
  console.error(err)
  setToast({
    icon: FaExclamationCircle,
    iconColor: 'text-yellow-600',
    message: '⚠️ Upload failed',
  })


    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4 max-w-2xl">
      <input
        placeholder="Name"
        className="border w-full p-2"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />

      <label className="block text-sm font-semibold">Description</label>
      <RichTextEditor
        value={form.description}
        onChange={(value) => setForm({ ...form, description: value })}
      />

      <input placeholder="Brand" className="border w-full p-2" value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} />
      <input placeholder="Type" className="border w-full p-2" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} />
      <input placeholder="Price" type="number" className="border w-full p-2" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
      <input placeholder="Stock" type="number" className="border w-full p-2" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} />

      <select value={form.idealFor} className="border w-full p-2" onChange={e => setForm({ ...form, idealFor: e.target.value })}>
        <option>Fashion</option>
        <option>Jewellery</option>
      </select>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={e => setFiles(Array.from(e.target.files).slice(0, 10))}
        className="border w-full p-2"
      />

      <div className="grid grid-cols-5 gap-2">
        {files.map((file, i) => (
          <img key={i} src={URL.createObjectURL(file)} alt="" className="h-20 w-full object-cover rounded" />
        ))}
      </div>

      <button
        className="bg-pink-500 rounded text-white px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Creating...' : 'Create Product'}
      </button>

      {toast && <GlobalToast {...toast} />}

    </div>
  )
}
