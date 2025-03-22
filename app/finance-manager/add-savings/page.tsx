"use client"

import type React from "react"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AddSavingsPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [target, setTarget] = useState("")
  const [autoDebit, setAutoDebit] = useState("")
  const [icon, setIcon] = useState("🏦")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const icons = ["🏦", "🏠", "🚗", "✈️", "🎓", "💍", "👶", "🚑", "🎁", "💻", "📱", "⌚️"]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const accessToken = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
      if (!accessToken) {
        setError("Authentication token not found")
        return
      }

      const response = await fetch("http://localhost:5000/api/finance/savings", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          target: Number(target),
          auto_debit: Number(autoDebit),
          icon
        })
      })

      const data = await response.json()
      if (data.success) {
        router.push("/finance-manager/savings")
      } else {
        setError(data.error?.message || "Failed to create savings goal")
      }
    } catch (err) {
      setError("Failed to create savings goal. Please try again later.")
      console.error("Error creating savings goal:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col bg-gray-100">
      {/* Top Navigation */}
      <div className="bg-[#1E88E5] text-white p-4">
        <div className="flex items-center justify-between">
          <Link href="/finance-manager/savings" className="p-2">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-xl font-bold">Add Savings Goal</h1>
          <div className="w-8"></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4">
        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Goal Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="e.g., Home Purchase, Emergency Fund"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Target Amount (Rp)</label>
            <input
              type="number"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="0"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Auto-Debit Amount (Rp/month)</label>
            <input
              type="number"
              value={autoDebit}
              onChange={(e) => setAutoDebit(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="0"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              This amount will be automatically transferred to your savings goal each month.
            </p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
            <div className="grid grid-cols-6 gap-2">
              {icons.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setIcon(emoji)}
                  className={`w-10 h-10 text-xl flex items-center justify-center rounded-lg ${
                    icon === emoji ? "bg-blue-100 border-2 border-blue-500" : "bg-gray-50"
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-xl mr-3">
              {icon}
            </div>
            <div>
              <h3 className="font-medium">{name || "Your Savings Goal"}</h3>
              <p className="text-sm text-gray-600">
                {target ? `Target: Rp ${Number.parseInt(target).toLocaleString("id-ID")}` : "Set your target amount"}
              </p>
            </div>
          </div>

          {target && autoDebit && (
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm">
                With an auto-debit of Rp {Number.parseInt(autoDebit).toLocaleString("id-ID")} per month, you'll reach
                your goal in approximately
                <span className="font-medium">
                  {" "}
                  {Math.ceil(Number.parseInt(target) / Number.parseInt(autoDebit))} months
                </span>
                .
              </p>
            </div>
          )}
        </div>

        <button 
          type="submit" 
          className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create Savings Goal"}
        </button>
      </form>
    </main>
  )
}

