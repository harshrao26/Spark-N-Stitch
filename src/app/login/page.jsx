'use client'
import { signIn } from 'next-auth/react'
import { FaGoogle } from 'react-icons/fa'

export default function GoogleLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font- text-gray-900">Welcome Back</h1>
          <p className="text-sm text-gray-500">Login to your account to continue shopping</p>
        </div>

        <button
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-md border border-gray-300 bg-white text-gray-700 font-semi text-sm shadow-sm hover:shadow-md hover:bg-gray-100 transition"
        >
          <FaGoogle className="text-red-500 text-lg" />
          Continue with Google
        </button>

        <p className="text-xs text-center text-gray-400">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  )
}
