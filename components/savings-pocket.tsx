"use client"

import { useState } from "react"
import { Info } from "lucide-react"

interface SavingsPocketProps {
  pocket: {
    id: string
    name: string
    target: number
    current: number
    icon: string
    autoDebit: number
  }
}

export default function SavingsPocket({ pocket }: SavingsPocketProps) {
  const [showDetails, setShowDetails] = useState(false)
  const progress = (pocket.current / pocket.target) * 100

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value)
  }

  // Calculate estimated completion date
  const getEstimatedCompletion = () => {
    const remaining = pocket.target - pocket.current
    const monthsRemaining = Math.ceil(remaining / pocket.autoDebit)

    const today = new Date()
    const completionDate = new Date(today)
    completionDate.setMonth(today.getMonth() + monthsRemaining)

    return completionDate.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
    })
  }

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{pocket.icon}</span>
            <h3 className="font-semibold">{pocket.name}</h3>
          </div>
          <p className="text-sm text-gray-500 mt-1">Auto debit: {formatCurrency(pocket.autoDebit)}/month</p>
        </div>
        <button className="text-blue-500">Edit</button>
      </div>

      <div className="mt-4">
        <div className="flex justify-between text-sm mb-1">
          <span>Progress</span>
          <span>
            Rp {(pocket.current / 1000000).toFixed(1)} jt / Rp {(pocket.target / 1000000).toFixed(1)} jt
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {showDetails && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex justify-between text-xs">
            <span className="text-gray-600">Auto-debit:</span>
            <span className="font-medium">{formatCurrency(pocket.autoDebit)}/month</span>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span className="text-gray-600">Est. completion:</span>
            <span className="font-medium">{getEstimatedCompletion()}</span>
          </div>
          <div className="mt-2 flex justify-end">
            <button className="text-xs text-blue-600 font-medium">Adjust Settings</button>
          </div>
        </div>
      )}
    </div>
  )
}

