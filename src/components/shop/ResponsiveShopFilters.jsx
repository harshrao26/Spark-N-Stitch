'use client'
import { useState } from 'react'
import { FaFilter, FaTimes } from 'react-icons/fa'
import ShopFilters from './ShopFilters'

export default function ResponsiveShopFilters({
  types,
  brands,
  selectedType,
  selectedBrand,
  setType,
  setBrand,
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="md:hidden mb-4 px-4">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 w-full justify-center px-4 py-2 bg-gray-900 text-white rounded-full font-medium shadow hover:bg-gray-800 transition"
        >
          <FaFilter />
          Show Filters
        </button>
      </div>

      {/* Mobile Popup */}
      {open && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          ></div>

          {/* Sidebar */}
          <div className="relative ml-auto w-4/5 max-w-xs bg-white h-full shadow-xl p-6 overflow-y-auto rounded-l-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-600 hover:text-black"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* Filter Content */}
            <ShopFilters
              types={types}
              brands={brands}
              selectedType={selectedType}
              selectedBrand={selectedBrand}
              setType={setType}
              setBrand={setBrand}
            />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <ShopFilters
          types={types}
          brands={brands}
          selectedType={selectedType}
          selectedBrand={selectedBrand}
          setType={setType}
          setBrand={setBrand}
        />
      </div>
    </>
  )
}
