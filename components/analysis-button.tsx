"use client"

import { useState } from "react"
import { X } from "lucide-react"

interface AnalysisButtonProps {
  expenseData: {
    name: string
    value: number
    color: string
    budget: number
  }[]
}

export default function AnalysisButton({ expenseData }: AnalysisButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Define formatCurrency before it's used in generateAnalysis
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value)
  }

  // Generate AI-like analysis based on expense data
  const generateAnalysis = () => {
    if (!expenseData || expenseData.length === 0) {
      return {
        budgetStatus: "You haven't recorded any expenses yet.",
        categoryAnalysis: "Start tracking your expenses to get detailed category analysis.",
        recommendation: "Try adding your daily expenses to get personalized insights.",
        pattern: "No spending patterns to analyze yet.",
      }
    }

    const totalSpent = expenseData.reduce((sum, item) => sum + item.value, 0)
    const totalBudget = expenseData.reduce((sum, item) => sum + item.budget, 0)

    const overBudgetCategories = expenseData
      .filter((item) => item.value > item.budget)
      .sort((a, b) => b.value - b.budget - (a.value - a.budget))

    const biggestCategory = [...expenseData].sort((a, b) => b.value - a.value)[0]

    const budgetStatus =
      totalSpent <= totalBudget
        ? `Masih masuk nih! Kamu baru keluarin  ${formatCurrency(totalSpent)} dari anggaran ${formatCurrency(totalBudget)}.`
        : `You've exceeded your monthly budget by ${formatCurrency(totalSpent - totalBudget)}.`

    const categoryAnalysis =
      overBudgetCategories.length > 0
        ? `Dari pengeluaranmu, kamu terlalu boros di ${overBudgetCategories.length} kategori, paling boncos di ${overBudgetCategories[0].name} (bablas ${formatCurrency(overBudgetCategories[0].value - overBudgetCategories[0].budget)} nih!).`
        : `Great job! You've stayed within budget for all spending categories.`

    const recommendation =
      overBudgetCategories.length > 0
        ? `Coba deh kurangin dulu nongki dan nontonnnya bulan depan. Atau sesuaikan lagi anggarannya.`
        : `You could consider increasing your savings rate since you're managing your budget well.`

    const pattern = `Kategori pengeluaran utamamu ${biggestCategory.name}, mewakili ${Math.round((biggestCategory.value / totalSpent) * 100)}% total pengeluaran.`

    return {
      budgetStatus,
      categoryAnalysis,
      recommendation,
      pattern,
    }
  }

  const analysis = generateAnalysis()

  return (
    <>
      <button
        className="bg-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2"
        onClick={() => setIsModalOpen(true)}
      >
        <span className="text-sm font-medium">Analisis AI</span>
        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">AI</span>
        </div>
      </button>

      {/* AI Analysis Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold">AI Analisis Finansial</h3>
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">AI</span>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>

            <div className="p-4">
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Kondisi Budget</h4>
                <p className="text-sm">{analysis.budgetStatus}</p>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Kategori pengeluaranmu</h4>
                <p className="text-sm">{analysis.categoryAnalysis}</p>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Gimana duit pergi meninggalkanmu</h4>
                <p className="text-sm">{analysis.pattern}</p>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Rekomendasi</h4>
                <p className="text-sm">{analysis.recommendation}</p>
              </div>

              <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <h4 className="font-medium text-blue-800 mb-2">Tips Buat Kamu</h4>
                <p className="text-sm text-blue-700">
                  Dari pola pengeluaranmu, kamu harus cobain fitur "Automated Savings Plan".
                  Fitur ini bisa otomatis sisihin duit ke target tabunganmu dengan memantau pola pengeluaranmu
                </p>
              </div>
            </div>

            <div className="border-t p-4">
              <button onClick={() => setIsModalOpen(false)} className="w-full py-2 bg-blue-500 text-white rounded-md">
                Okee
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

