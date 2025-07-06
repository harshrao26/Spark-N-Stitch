import { connectDB } from '@/lib/mongoose'
import Product from '@/models/Product'
import AddToCartButton from '@/components/AddToCartButton'

export default async function ShopPage() {
  await connectDB()
  const products = await Product.find({})

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {products.map((product) => (
        <div key={product._id} className="border p-4 space-y-2 rounded shadow-sm">
          <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
          <h3 className="text-lg font-">{product.name}</h3>
          <p className="text-gray-700">₹{product.price}</p>
          <p className="text-sm text-gray-500">Stock: {product.stock}</p>
          <AddToCartButton product={product} />
        </div>
      ))}
    </div>
  )
}
