import AddToCart from "@/components/AddToCart";
import { connectDB } from "@/lib/mongoose";
import Product from "@/models/Product";

export default async function ProductPage({ params }) {
  await connectDB();
  const product = await Product.findById(params.id).lean();

  if (!product) return <div className="p-6">Product not found</div>;

  return (
    <div className="p-4 md:p-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
      {/* Image Gallery */}
      <div className="space-y-4">
        <img
          src={product.images?.[0] || "/placeholder.jpg"}
          alt={product.name}
          className="w-full h-72 md:h-[450px] object-contain bg-white rounded-xl shadow"
        />
        <div className="grid grid-cols-4 gap-2">
          {product.images?.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`thumb-${i}`}
              className="w-full h-16 object-cover rounded border hover:scale-105 transition"
            />
          ))}
        </div>
      </div>

      {/* Product Details */}
      <div className="space-y-5">
        <h1 className="text-xl md:text-3xl font-bold text-gray-900">
          {product.name}
        </h1>

        <p className="text-sm text-gray-500">
          {product.brand} | {product.type}
        </p>

        <div className="flex items-center gap-3">
          <span className="text-pink-600 font-bold text-xl md:text-2xl">
            ₹{product.price}
          </span>
          <span className="text-sm line-through text-gray-400">
            ₹{Math.round(product.price * 1.05)}
          </span>
        </div>

        <p
          className={`text-sm font-medium ${
            product.stock > 0 ? "text-green-600" : "text-red-500"
          }`}
        >
          {product.stock > 0
            ? `${product.stock} in stock`
            : "Currently unavailable"}
        </p>

        <div
          className="text-sm text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />

       {product.stock > 0 && (
  <div className="fixed bottom-0 left-0 w-full md:static md:w-auto bg-pink-500 p-4 flex justify-center z-50">
    <AddToCart product={product} />
  </div>
)}

      </div>
    </div>
  );
}
