"use client"

import { useState } from "react"
import { X } from "lucide-react"
import Link from "next/link"

export default function RecapBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mx-4 my-3 rounded-md relative">
      <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={() => setIsVisible(false)}>
        <X size={16} />
      </button>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <span className="text-2xl">🎉</span>
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700">Your yearly financial recap is ready!</p>
          <div className="mt-1">
            <Link href="/finance-manager/yearly-recap">
              <button className="text-xs font-medium text-yellow-800 underline">View Now</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

