"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Plus, X } from "lucide-react"
const API_BASE_URL: string = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

interface ExpenseCategory {
  _id: string
  name: string
  icon: string
  budget: number
  color: string
}

export default function AddExpenseButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [amount, setAmount] = useState("")
  const [merchant, setMerchant] = useState("")
  const [description, setDescription] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [categories, setCategories] = useState<ExpenseCategory[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Fetch categories when modal opens
  useEffect(() => {
    if (isModalOpen) {
      fetchCategories()
    }
  }, [isModalOpen])

  const fetchCategories = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
      if (!accessToken) {
        setError("Authentication token not found")
        return
      }

      const response = await fetch(`${API_BASE_URL}/api/finance/expense-categories`, {
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        }
      })
      
      const data = await response.json()
      if (data.success && data.data.categories.length > 0) {
        setCategories(data.data.categories)
        setCategoryId(data.data.categories[0]._id) // Select first category by default
      } else {
        setError("No categories found. Please create categories first.")
      }
    } catch (err) {
      console.error("Error fetching categories:", err)
      setError("Failed to load categories. Please try again.")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)
    
    try {
      const accessToken = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
      if (!accessToken) {
        setError("Authentication token not found")
        setIsLoading(false)
        return
      }

      // Format the date properly - Python's fromisoformat doesn't accept the 'Z' at the end
      const now = new Date()
      const formattedDate = now.toISOString().replace('Z', '+00:00')

      const expenseData = {
        amount: Number(amount),
        category_id: categoryId,
        description: description || merchant, // Use merchant as description if not provided
        merchant: merchant,
        date: formattedDate
      }

      const response = await fetch(`${API_BASE_URL}/api/finance/expenses`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(expenseData)
      })

      const result = await response.json()
      if (result.success) {
        setSuccess("Expense added successfully!")
        resetForm()
        setTimeout(() => {
          setIsModalOpen(false)
          // Reload the page to reflect new data
          window.location.reload()
        }, 1500)
      } else {
        setError(result.error?.message || "Failed to add expense")
      }
    } catch (err) {
      console.error("Error adding expense:", err)
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setAmount("")
    setMerchant("")
    setDescription("")
    setCategoryId(categories.length > 0 ? categories[0]._id : "")
  }

  return (
    <>
      <button
        className="bg-[#1E88E5] w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white"
        onClick={() => setIsModalOpen(true)}
      >
        <Plus size={24} />
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-bold">Add New Expense</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4">
              {error && (
                <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="mb-4 p-2 bg-green-100 text-green-700 rounded-md text-sm">
                  {success}
                </div>
              )}

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (Rp)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="0"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Merchant</label>
                <input
                  type="text"
                  value={merchant}
                  onChange={(e) => setMerchant(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Where did you spend?"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="What did you purchase?"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                {categories.length > 0 ? (
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  >
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.icon} {cat.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="text-sm text-gray-500">Loading categories...</div>
                )}
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-blue-300"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save Expense"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

