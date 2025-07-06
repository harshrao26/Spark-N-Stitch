'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
} from 'react-icons/fa'
import logo from '@/assets/logo.webp' // ✅ adjust if placed elsewhere

const Footer = () => {
  return (
    <footer className="bg-[#F5E9D4] text-gray-800 py-10 px-4">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 text-center text-sm">
        {/* Logo & Brand */}
        <div className="flex flex-col items-center gap-2">
          <Image src={logo} alt="Company Logo" className="h-12 w-auto" />
          <h2 className="text-lg font-">Spark & Stitch</h2>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center gap-1 text-gray-700">
          <p className="flex items-center gap-2 text-center">
            <FaMapMarkerAlt />
            Jay Yogeshaver Complex, D124,<br />
            Randesan, Gandhinagar, 382421, India
          </p>
          <p className="flex items-center gap-2">
            <FaEnvelope /> business.sparknstitch@gmail.com
          </p>
        </div>

        {/* Social Media */}
        <div className="flex gap-4 mt-2">
          <a
            href="https://www.facebook.com/people/Spark-N-Stitch/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-600"
          >
            <FaFacebookF size={18} />
          </a>
          <a
            href="https://www.instagram.com/sparknstitch?igsh=MTRkeTB2YmRwdW9hYQ=="
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-600"
          >
            <FaInstagram size={18} />
          </a>
        </div>

        {/* Footer Navigation Links */}
        <div className="flex flex-wrap justify-center gap-4 text-pink-500 font-medium">
          <Link href="/partner" className="hover:underline">
            Affiliate
          </Link>
          <Link href="/terms" className="hover:underline">
            Terms & Conditions
          </Link>
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/refunds" className="hover:underline">
            Refund & Cancellation
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-xs text-gray-500 mt-4">
          © {new Date().getFullYear()} Spark & Stitch. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
