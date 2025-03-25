"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Search } from "lucide-react"
import Link from "next/link"
import ExpenseItem from "@/components/expense-item"
const API_BASE_URL: string = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

interface ExpenseCategory {
  _id: string
  name: string
  icon: string
  budget: number
  color: string
  is_default: boolean
}

interface Expense {
  _id: string
  amount: number
  date: string
  category_id: string
  merchant: string
  description: string
}

export default function ExpensesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [expenseCategories, setExpenseCategories] = useState<ExpenseCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
        if (!accessToken) {
          setError("Authentication token not found")
          return
        }

        const headers = {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        }

        // Fetch categories
        const categoryResponse = await fetch(`${API_BASE_URL}/api/finance/expense-categories`, {
          headers
        })
        if (!categoryResponse.ok) throw new Error("Failed to fetch categories")
        const categoryData = await categoryResponse.json()
        setExpenseCategories(categoryData.data.categories)

        // Fetch expenses
        const expenseResponse = await fetch(`${API_BASE_URL}/api/finance/expenses`, {
          headers
        })
        if (!expenseResponse.ok) throw new Error("Failed to fetch expenses")
        const expenseData = await expenseResponse.json()
        setExpenses(expenseData.data.expenses)
      } catch (err) {
        console.error(err)
        setError("Failed to load data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Get unique categories
  const categories = ["All", ...new Set(expenseCategories.map((category) => category.name))]

  // Get category details for an expense
  const getCategoryDetails = (categoryId: string) => {
    return expenseCategories.find(cat => cat._id === categoryId)
  }

  // Filter expenses based on search and category
  const filteredExpenses = expenses.filter((expense) => {
    const category = getCategoryDetails(expense.category_id)
    const matchesSearch = (expense.merchant?.toLowerCase() || "").includes(searchTerm.toLowerCase()) || 
                        (expense.description?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || category?.name === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Group expenses by date
  const groupedExpenses = filteredExpenses.reduce(
    (groups, expense) => {
      const date = new Date(expense.date)
      const month = date.toLocaleString("default", { month: "long" })
      const day = date.getDate()
      const key = `${month} ${day}`

      if (!groups[key]) {
        groups[key] = []
      }

      groups[key].push(expense)
      return groups
    },
    {} as Record<string, typeof filteredExpenses>,
  )

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  }

  if (error) {
    return <div className="flex min-h-screen items-center justify-center text-red-500">{error}</div>
  }

  return (
    <main className="flex min-h-screen flex-col bg-gray-100">
      {/* Top Navigation */}
      <div className="bg-[#1E88E5] text-white p-4">
        <div className="flex items-center justify-between">
          <Link href="/finance-manager" className="p-2">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-xl font-bold">Semua Pengeluaran</h1>
          <div className="w-8"></div> {/* Empty div for spacing */}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="p-4 bg-white border-b">
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 p-2 border border-gray-300 rounded-md"
            placeholder="Search expenses..."
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-3 py-1 rounded-full whitespace-nowrap ${
                selectedCategory === category ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Expenses List */}
      <div className="p-4">
        {Object.entries(groupedExpenses).length > 0 ? (
          Object.entries(groupedExpenses).map(([date, expenses]) => (
            <div key={date} className="mb-4">
              <h2 className="text-sm font-medium text-gray-500 mb-2">{date}</h2>
              <div className="bg-white rounded-lg shadow-sm">
                {expenses.map((expense) => {
                  const category = getCategoryDetails(expense.category_id)
                  return (
                    <ExpenseItem 
                      key={expense._id} 
                      expense={{
                        id: expense._id,
                        amount: Number(expense.amount),
                        date: expense.date,
                        category: category?.name || "Other",
                        merchant: expense.merchant || "Unknown",
                        categoryIcon: category?.icon
                      }} 
                    />
                  )
                })}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">Wah, kamu belum ada pengeluaran</p>
          </div>
        )}
      </div>
    </main>
  )
}

