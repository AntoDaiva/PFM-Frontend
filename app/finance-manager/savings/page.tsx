"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Plus } from "lucide-react"
import Link from "next/link"
import SavingsPocket from "@/components/savings-pocket"
const API_BASE_URL: string = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

interface SavingsGoal {
  _id: string
  name: string
  target: number
  current: number
  icon: string
  auto_debit: number
}

export default function SavingsPage() {
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchSavingsGoals = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
        if (!accessToken) {
          setError("Authentication token not found")
          return
        }

        const response = await fetch(`${API_BASE_URL}/api/finance/savings`, {
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        })
        const data = await response.json()
        if (data.success) {
          setSavingsGoals(data.data.goals)
        } else {
          setError(data.error?.message || "Failed to fetch savings goals")
        }
      } catch (err) {
        setError("Failed to fetch savings goals. Please try again later.")
        console.error("Error fetching savings goals:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSavingsGoals()
  }, [])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value)
  }

  // Calculate total savings
  const totalSavings = savingsGoals.reduce((sum, pocket) => sum + pocket.current, 0)
  const totalTarget = savingsGoals.reduce((sum, pocket) => sum + pocket.target, 0)
  const totalProgress = (totalSavings / totalTarget) * 100

  // Calculate monthly auto-debit
  const monthlyAutoDebit = savingsGoals.reduce((sum, pocket) => sum + pocket.auto_debit, 0)

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col bg-gray-100">
        <div className="bg-[#1E88E5] text-white p-4">
          <div className="flex items-center justify-between">
            <Link href="/finance-manager" className="p-2">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-xl font-bold">Savings Goals</h1>
            <div className="w-8"></div>
          </div>
        </div>
        <div className="flex items-center justify-center flex-1">
          <p>Loading...</p>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="flex min-h-screen flex-col bg-gray-100">
        <div className="bg-[#1E88E5] text-white p-4">
          <div className="flex items-center justify-between">
            <Link href="/finance-manager" className="p-2">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-xl font-bold">Savings Goals</h1>
            <div className="w-8"></div>
          </div>
        </div>
        <div className="flex items-center justify-center flex-1">
          <p className="text-red-500">{error}</p>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col bg-gray-100">
      {/* Top Navigation */}
      <div className="bg-[#1E88E5] text-white p-4">
        <div className="flex items-center justify-between">
          <Link href="/finance-manager" className="p-2">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-xl font-bold">Savings Goals</h1>
          <div className="w-8"></div>
        </div>
      </div>

      {/* Summary Card */}
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h2 className="text-lg font-bold mb-2">Savings Summary</h2>

          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Total Saved:</span>
            <span className="font-bold text-green-600">{formatCurrency(totalSavings)}</span>
          </div>

          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Total Target:</span>
            <span className="font-bold">{formatCurrency(totalTarget)}</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${totalProgress}%` }}></div>
          </div>

          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">Monthly Auto-Debit:</span>
              <span className="font-medium">{formatCurrency(monthlyAutoDebit)}</span>
            </div>
          </div>
        </div>

        {/* Savings Pockets */}
        <h2 className="text-lg font-bold mb-2">Your Savings Goals</h2>
        <div className="space-y-4 mb-4">
          {savingsGoals.map((pocket) => (
            <SavingsPocket 
              key={pocket._id} 
              pocket={{
                id: pocket._id,
                name: pocket.name,
                target: Number(pocket.target),
                current: Number(pocket.current),
                icon: pocket.icon,
                autoDebit: Number(pocket.auto_debit)
              }} 
            />
          ))}
        </div>

        <Link href="/finance-manager/add-savings">
          <button className="w-full flex items-center justify-center gap-2 py-3 bg-blue-500 text-white rounded-lg">
            <Plus size={18} />
            <span>Add New Saving Goal</span>
          </button>
        </Link>
      </div>
    </main>
  )
}

