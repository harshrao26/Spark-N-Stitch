import { connectDB } from '@/lib/mongoose'
import Product from '@/models/Product'
import ShopPageClient from '@/components/shop/ShopPageClient'

export default async function ShopPage() {
  await connectDB()
  const products = await Product.find().lean()
  const types = [...new Set(products.map(p => p.type))]
  const brands = [...new Set(products.map(p => p.brand))]

  return (
    <ShopPageClient
      products={JSON.parse(JSON.stringify(products))}
      types={types}
      brands={brands}
    />
  )
}
