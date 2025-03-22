"use client"

import { useState } from "react"
import { Calendar, X } from "lucide-react"

export default function MonthSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState("March 2025")

  const months = ["January 2025", "February 2025", "March 2025", "April 2025", "May 2025", "June 2025"]

  const handleSelectMonth = (month: string) => {
    setSelectedMonth(month)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedMonth}</span>
        <Calendar size={18} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
          <div className="flex justify-between items-center p-2 border-b">
            <h3 className="text-sm font-medium">Select Month</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
              <X size={16} />
            </button>
          </div>
          <div className="py-1">
            {months.map((month) => (
              <button
                key={month}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  month === selectedMonth ? "bg-blue-100 text-blue-800" : "hover:bg-gray-100"
                }`}
                onClick={() => handleSelectMonth(month)}
              >
                {month}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

