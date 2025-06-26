"use client";
import Link from "next/link";
import { useCartStore } from "@/lib/cartStore";
import { FiShoppingCart, FiUser, FiMenu,  } from "react-icons/fi";
import {
  FaSearch,
  FaShoppingCart,
  FaHandshake,
  FaFemale,
  FaGem,
} from "react-icons/fa";
import { useState } from "react";
import Image from "next/image";
import logo from "@/assets/logo.webp";

export default function Navbar() {
  const { items } = useCartStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-0 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl flex items-center gap-2 font-bold tracking-tight text-black"
        >
          <Image src={logo} width={50} height={50} alt="Spark&Stitch Logo" />
          <span className="text-pink-500 md:block hidden"> Spark&Stitch</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 text-  font-medium text-gray-700">
          <Link href="/" className="hover:text-black transition">
            Home
          </Link>
          <Link href="/shop" className="hover:text-black transition">
            Shop
          </Link>
          <Link href="/orders" className="hover:text-black transition">
            Orders
          </Link>
        </nav>

        {/* Icons */}
        <div className="flex gap-4 items-center">
          <Link href="/partner" className="relative flex items-center gap-2">
            <FaHandshake /> Partner
          </Link>
          <Link href="/cart" className="relative">
            <FiShoppingCart size={22} />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {items.length}
              </span>
            )}
          </Link>
          <Link href="/dashboard">
            <FiUser size={22} />
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden"
          >
            <FiMenu size={22} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="md:hidden px-4 py-3 space-y-2 bg-white border-t border-gray-200 text-sm">
          <Link
            href="/shop"
            className="block"
            onClick={() => setMobileOpen(false)}
          >
            Shop
          </Link>
          <Link
            href="/orders"
            className="block"
            onClick={() => setMobileOpen(false)}
          >
            Orders
          </Link>
          <Link
            href="/cart"
            className="block"
            onClick={() => setMobileOpen(false)}
          >
            Cart
          </Link>
          <Link
            href="/dashboard"
            className="block"
            onClick={() => setMobileOpen(false)}
          >
            Profile
          </Link>
        </nav>
      )}
    </header>
  );
}
