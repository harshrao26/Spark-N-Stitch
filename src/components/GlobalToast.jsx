'use client'
import { useEffect, useState } from 'react'

export default function GlobalToast({ icon: Icon, iconColor = 'text-pink-600', message = '' }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl shadow-lg px-5 py-3 w-[300px] animate-slideIn">
        <div className={`text-xl ${iconColor}`}>
          <Icon />
        </div>
        <div className="flex-1 text-sm text-gray-800">{message}</div>
      </div>
      {/* Pink loader */}
      <div className="h-1 bg-pink-500 w-full animate-toastLoader mt-1 rounded-b-xl" />
    </div>
  )
}
