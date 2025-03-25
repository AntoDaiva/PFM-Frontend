import { ArrowLeft, Download } from "lucide-react"
import Link from "next/link"
import ExpenseChart from "@/components/expense-chart"

export default function MonthlyReportPage() {
  // Mock data for expenses by category
  const expenseData = [
    { name: "Food", value: 2500000, color: "#FF6384", budget: 2000000 },
    { name: "Shopping", value: 1800000, color: "#36A2EB", budget: 1000000 },
    { name: "Transport", value: 800000, color: "#FFCE56", budget: 1000000 },
    { name: "Bills", value: 1200000, color: "#4BC0C0", budget: 1500000 },
    { name: "Entertainment", value: 600000, color: "#9966FF", budget: 500000 },
  ]

  // Mock data for monthly comparison
  const monthlyComparison = [
    { month: "January", expenses: 5800000 },
    { month: "February", expenses: 6200000 },
    { month: "March", expenses: 6900000 },
  ]

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value)
  }

  // Calculate budget status for each category
  const categoryStatus = expenseData.map((category) => {
    const status = category.value <= category.budget ? "under" : "over"
    const difference = Math.abs(category.value - category.budget)
    const percentDiff = Math.round((difference / category.budget) * 100)

    return {
      ...category,
      status,
      difference,
      percentDiff,
    }
  })

  return (
    <main className="flex min-h-screen flex-col bg-gray-100">
      {/* Top Navigation */}
      <div className="bg-[#1E88E5] text-white p-4">
        <div className="flex items-center justify-between">
          <Link href="/finance-manager" className="p-2">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-xl font-bold">Laporan Maret 2025</h1>
          <button className="p-2">
            <Download size={24} />
          </button>
        </div>
      </div>

      {/* Expense Overview */}
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h2 className="text-lg font-bold mb-2">Ringkasan Pengeluaran</h2>
          <div className="h-64">
            <ExpenseChart data={expenseData} />
          </div>
        </div>

        {/* Budget Performance */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h2 className="text-lg font-bold mb-2">Kinerja Anggaran</h2>

          <div className="space-y-4">
            {categoryStatus.map((category, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: category.color }}></div>
                    <span>{category.name}</span>
                  </div>
                  <div
                    className={`text-sm font-medium ${category.status === "under" ? "text-green-600" : "text-red-500"}`}
                  >
                    {category.status === "under" ? "Under Budget" : "Over Budget"}
                  </div>
                </div>

                <div className="flex justify-between text-sm mb-1">
                  <span>Spent: {formatCurrency(category.value)}</span>
                  <span>Budget: {formatCurrency(category.budget)}</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${category.status === "under" ? "bg-green-500" : "bg-red-500"}`}
                    style={{ width: `${Math.min(100, (category.value / category.budget) * 100)}%` }}
                  ></div>
                </div>

                <div className="text-xs text-gray-500 mt-1">
                  {category.status === "under"
                    ? `${formatCurrency(category.difference)} (${category.percentDiff}%) under budget`
                    : `${formatCurrency(category.difference)} (${category.percentDiff}%) over budget`}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Comparison */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h2 className="text-lg font-bold mb-2">Perbandingan Bulanan</h2>

          <div className="space-y-3">
            {monthlyComparison.map((month, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span>{month.month}</span>
                  <span className="font-medium">{formatCurrency(month.expenses)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{
                      width: `${(month.expenses / Math.max(...monthlyComparison.map((m) => m.expenses))) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm">
              Pengeluaran Anda di bulan Maret meningkat sebesar
              <span className="font-medium"> 11.3% </span>
              dibandingkan dengan Februari.
            </p>
          </div>
        </div>

        {/* Insights */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h2 className="text-lg font-bold mb-2">Key Insights</h2>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-xl flex-shrink-0">
                ⚠️
              </div>
              <div>
                <h3 className="font-medium">Pengeluaran Belanja</h3>
                <p className="text-sm text-gray-600">
                Pengeluaran belanja Anda bulan ini melebihi anggaran sebesar 80%. Pertimbangkan untuk meninjau kembali pembelian Anda.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-xl flex-shrink-0">
                ✅
              </div>
              <div>
                <h3 className="font-medium">Pengelolaan Tagihan</h3>
                <p className="text-sm text-gray-600">
                Tagihan kamu bulan ini 20% di bawah anggaran. Keren! Kamu berhasil mengelola pengeluaran tetap dengan baik!
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-xl flex-shrink-0">
                💡
              </div>
              <div>
                <h3 className="font-medium">Rekomendasi</h3>
                <p className="text-sm text-gray-600">
                  Coba atur peringatan pengeluaran untuk kategori yang sering melebihi anggaran.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

