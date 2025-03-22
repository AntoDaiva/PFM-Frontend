"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, Plus, BarChart3, Settings } from "lucide-react"
import Link from "next/link"
import ExpenseChart from "@/components/expense-chart"
import SavingsPocket from "@/components/savings-pocket"
import ExpenseItem from "@/components/expense-item"
import RecapBanner from "@/components/recap-banner"
import AddExpenseButton from "@/components/add-expense-button"
import AnalysisButton from "@/components/analysis-button"
import MonthSelector from "@/components/month-selector"

interface Expense {
  _id: string
  amount: number
  date: string
  category_id: string
  merchant: string
  description?: string
}

interface SavingsGoal {
  _id: string
  name: string
  target: number
  current: number
  icon: string
  auto_debit: number
  target_date: string
}

interface ExpenseCategory {
  _id: string
  name: string
  icon: string
  budget: number
  color: string
  is_default: boolean
}

export default function FinanceManagerPage() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([])
  const [expenseCategories, setExpenseCategories] = useState<ExpenseCategory[]>([])
  const [isLoading, setIsLoading] = useState(true)
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

        // Fetch expenses
        const expensesResponse = await fetch("http://localhost:5000/api/finance/expenses", {
          headers
        })
        const expensesData = await expensesResponse.json()
        console.log("Expenses response:", expensesData)
        if (expensesData.success) {
          setExpenses(expensesData.data.expenses)
        }

        // Fetch savings goals
        const savingsResponse = await fetch("http://localhost:5000/api/finance/savings", {
          headers
        })
        const savingsData = await savingsResponse.json()
        if (savingsData.success) {
          setSavingsGoals(savingsData.data.goals)
        }

        // Fetch expense categories
        const categoriesResponse = await fetch("http://localhost:5000/api/finance/expense-categories", {
          headers
        })
        const categoriesData = await categoriesResponse.json()
        console.log("Categories response:", categoriesData)
        if (categoriesData.success) {
          setExpenseCategories(categoriesData.data.categories)
        }

      } catch (err) {
        setError("Failed to fetch data. Please try again later.")
        console.error("Error fetching data:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Calculate expense data for the chart and analysis
  const expenseData = expenseCategories.map(category => {
    const categoryExpenses = expenses.filter(expense => expense.category_id === category._id)
    const totalExpense = categoryExpenses.reduce((sum, expense) => sum + Number(expense.amount), 0)

    return {
      name: category.name,
      value: totalExpense,
      color: category.color || "#808080"  // Fallback color if none is set
    }
  }).filter(data => data.value > 0)  // Only show categories with expenses

  // Prepare data for analysis (including budget)
  const analysisData = expenseData.map(data => ({
    ...data,
    budget: Number(expenseCategories.find(cat => cat.name === data.name)?.budget || 0)
  }))

  // Calculate total budget and expenses
  const totalBudget = expenseCategories.reduce((sum, category) => sum + Number(category.budget), 0)
  const totalExpenses = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0)
  const budgetPercentage = Math.min(100, (totalExpenses / totalBudget) * 100)

  // Get category details for an expense
  const getCategoryDetails = (categoryId: string) => {
    return expenseCategories.find(cat => cat._id === categoryId)
  }

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  }

  if (error) {
    return <div className="flex min-h-screen items-center justify-center text-red-500">{error}</div>
  }

  return (
    <main className="flex min-h-screen flex-col bg-gray-100 pb-24">
      {/* Top Navigation */}
      <div className="bg-[#1E88E5] text-white p-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="p-2">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-xl font-bold">Financial Manager</h1>
          <div className="w-8"></div>
        </div>
      </div>

      {/* Recap Banner */}
      <RecapBanner />

      {/* Second Section - Month Selector and Budget */}
      <div className="flex justify-between items-center p-4">
        <Link href="/finance-manager/budget-settings">
          <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
            <Settings size={18} />
            <span>Budget Settings</span>
          </button>
        </Link>
        <MonthSelector />
      </div>

      {/* Main Financial Overview */}
      <div className="bg-white rounded-lg shadow-sm mx-4 p-4 mb-4">
        <h2 className="text-lg font-bold mb-2">Expense Overview</h2>
        <div className="h-64">
          <ExpenseChart data={expenseData} />
        </div>
        <div className="mt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Monthly Budget</h3>
            <span className="text-sm text-gray-500">
              Rp {(totalExpenses / 1000000).toFixed(1)} jt / Rp {(totalBudget / 1000000).toFixed(1)} jt
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div
              className={`h-2.5 rounded-full ${budgetPercentage > 90 ? "bg-red-500" : "bg-blue-600"}`}
              style={{ width: `${budgetPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Savings Section */}
      <div className="bg-white rounded-lg shadow-sm mx-4 p-4 mb-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Savings Goals</h2>
          <Link href="/finance-manager/savings">
            <button className="text-blue-500 font-medium">View All</button>
          </Link>
        </div>
        <div className="space-y-4">
          {savingsGoals.slice(0, 3).map((pocket) => (
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
          <Link href="/finance-manager/add-savings">
            <button className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500">
              <Plus size={18} />
              <span>Add New Saving Goal</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Expense List */}
      <div className="bg-white rounded-lg shadow-sm mx-4 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Recent Expenses</h2>
          <Link href="/finance-manager/expenses">
            <button className="text-blue-500 font-medium">View All</button>
          </Link>
        </div>
        <div className="space-y-3">
          {expenses.slice(0, 5).map((expense) => {
            const category = getCategoryDetails(expense.category_id)
            return (
              <ExpenseItem 
                key={expense._id} 
                expense={{
                  id: expense._id,
                  amount: Number(expense.amount),
                  date: expense.date,
                  category: category?.name || "Other",
                  merchant: expense.merchant,
                  categoryIcon: category?.icon
                }} 
              />
            )
          })}
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-20 right-6 flex flex-col gap-4">
        <Link href="/finance-manager/monthly-report">
          <button className="bg-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-blue-500">
            <BarChart3 size={24} />
          </button>
        </Link>
        <AddExpenseButton />
      </div>

      {/* AI Analysis Button */}
      <div className="fixed bottom-20 left-6">
        <AnalysisButton expenseData={analysisData} />
      </div>
    </main>
  )
}

