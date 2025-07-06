'use client';

import { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaCartPlus } from 'react-icons/fa';
import { useCartStore } from '@/lib/cartStore';

export default function ProductDetails({ product }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || product.color || null);
  const add = useCartStore((s) => s.add);

  const images = product.images || [];
  const selectedImage = images[selectedImageIndex];

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Please select size and color");
      return;
    }

    add({
      ...product,
      selectedSize,
      color: selectedColor,
    });
  };

  return (
    <div className="p-0 md:p-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
      {/* Image Gallery */}
      <div className="space-y-4 relative">
        <img
          src={selectedImage || "/placeholder.jpg"}
          alt={product.name}
          className="w-full relative h-72 md:h-[450px] object-contain bg-white rounded-xl shadow"
        />

        {/* Prev/Next Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
            >
              <FaChevronRight />
            </button>
          </>
        )}

        {/* Thumbnails */}
        <div className=" flex-wrap flex gap-2 mt-2">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              onClick={() => setSelectedImageIndex(i)}
              className={`w-10 object-cover rounded border cursor-pointer ${
                i === selectedImageIndex ? 'ring-2 ring-pink-500' : ''
              }`}
            />
          ))}
        </div>
      </div>

      {/* Product Details */}
      <div className="md:space-y-5 space-y-2">
        <h1 className="text-xl md:text-3xl capitalize font-bold text-gray-900">{product.name}</h1>

        <p className="text-sm text-gray-500 capitalize">
          {product.brand} {product.type && `| ${product.type}`}
        </p>

        <div className="flex items-center capitalize gap-3">
          <span className="text-pink-600 font-bold text-xl md:text-2xl">
            ₹{product.price}
          </span>
          <span className="text-sm  line-through text-gray-400">
            ₹{Math.round(product.price * 1.05)}
          </span>
        </div>

        {/* Sizes */}
        {product.sizes?.length > 0 && (
          <div className="space-y-1">
            <p className="font-medium">Select Size:</p>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded ${
                    selectedSize === size
                      ? 'bg-pink-500 text-white border-pink-500'
                      : 'text-gray-700 border-gray-300 hover:border-pink-500'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Colors */}
        {product.colors?.length > 0 && (
          <div className="space-y-1">
            <p className="font-medium">Select Color:</p>
            <div className="flex gap-2 flex-wrap">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 border rounded ${
                    selectedColor === color
                      ? 'bg-pink-500 text-white border-pink-500'
                      : 'text-gray-700 border-gray-300 hover:border-pink-500'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Stock info */}
        <p
          className={`text-sm font-medium ${
            product.stock > 0 ? 'text-green-600' : 'text-red-500'
          }`}
        >
          {product.stock > 0 ? `${product.stock} in stock` : 'Currently unavailable'}
        </p>

        {/* Description */}
        <div
          className="text-sm text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />

        {/* Attributes */}
        <div className="mt-4 space-y-2 text-sm text-gray-700">
          {product.color && (
            <p>
              <strong>Color:</strong> {product.color}
            </p>
          )}
          {product.clothType && (
            <p>
              <strong>Cloth Type:</strong> {product.clothType}
            </p>
          )}
        </div>

        {/* Add to Cart */}
        {product.stock > 0 && (
          <div className="fixed   bottom-0 left-0 w-full md:static md:w-auto bg-pink-500 md:bg-transparent p-2 flex md:justify-start justify-center z-50">
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 md:bg-pink-500 hover:bg-pink-700 text-pink-600 text-white font-medium px-6 py-2 rounded-md transition"
            >
              <FaCartPlus size={16} />
              Add
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
