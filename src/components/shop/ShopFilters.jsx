'use client'
import { useState } from 'react'
import { FaChevronDown, FaChevronUp, FaFilter, FaTimes } from 'react-icons/fa'

export default function ShopFilters({
  types,
  brands,
  selectedType,
  selectedBrand,
  setType,
  setBrand,
}) {
  const [showType, setShowType] = useState(true)
  const [showBrand, setShowBrand] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)

  const FilterSection = () => (
    <div className="space-y-8">
      {/* Type */}
      <div>
        <div
          className="flex justify-between items-center cursor-pointer mb-3"
          onClick={() => setShowType(!showType)}
        >
          <h4 className="font-semi text-gray-900 tracking-wide">Type</h4>
          {showType ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />}
        </div>
        {showType && (
          <div className="flex flex-wrap gap-2">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setType(t === selectedType ? '' : t)}
                className={`px-3 py-1.5 capitalize  rounded-full border text-sm font-medium transition whitespace-nowrap ${
                  selectedType === t
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Brand */}
      <div>
        <div
          className="flex justify-between items-center cursor-pointer mb-3"
          onClick={() => setShowBrand(!showBrand)}
        >
          <h4 className="font-semi text-gray-900 tracking-wide">Brand</h4>
          {showBrand ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />}
        </div>
        {showBrand && (
          <div className="flex flex-wrap gap-2">
            {brands.map((b) => (
              <button
                key={b}
                onClick={() => setBrand(b === selectedBrand ? '' : b)}
                className={`px-3 py-1.5 capitalize  rounded-full border text-sm font-medium transition whitespace-nowrap ${
                  selectedBrand === b
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block bg-white p-5 rounded-2xl border shadow-lg h-fit sticky top-24 w-full md:w-72">
        {FilterSection()}
      </div>

      {/* Mobile Button */}
      <div className="fixed bottom-5 left-0 right-0 z-40 md:hidden flex justify-center">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-pink-500 text-white rounded-full shadow-xl"
        >
          <FaFilter />
          Filters
        </button>
      </div>

      {/* Mobile Popup */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-white p-6 overflow-y-auto md:hidden">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-">Filters</h3>
            <button onClick={() => setMobileOpen(false)} className="text-gray-600">
              <FaTimes size={20} />
            </button>
          </div>
          {FilterSection()}
        </div>
      )}
    </>
  )
}
