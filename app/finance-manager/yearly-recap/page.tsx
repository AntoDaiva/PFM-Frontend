import { ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"

export default function YearlyRecapPage() {
  // Mock data for yearly recap
  const yearlyData = {
    totalSpent: 68500000,
    totalSaved: 42000000,
    topCategories: [
      { name: "Food", percentage: 28, amount: 19180000 },
      { name: "Shopping", percentage: 22, amount: 15070000 },
      { name: "Bills", percentage: 18, amount: 12330000 },
    ], 
    mostExpensiveMonth: "Desember",
    topMerchants: ["Tokopedia", "Grab", "Starbucks"],
    spendingPersona: "Balanced Spender",
    yearOverYearChange: 8, // percentage increase
    biggestSavingsMonth: "Agustus",
    achievements: [
      { name: "Master Cuan", description: "Gapernah boncos selama 9 bulan" },
      { name: "Penabung Handal", description: "Rutin nabung tiap bulan" },
    ],
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value)
  }

  return (
    <main className="flex min-h-screen flex-col bg-gray-100">
      {/* Top Navigation */}
      <div className="bg-[#1E88E5] text-white p-4">
        <div className="flex items-center justify-between">
          <Link href="/finance-manager" className="p-2">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-xl font-bold">2024 Financial Recapmu</h1>
          <div className="w-8"></div> {/* Empty div for spacing */}
        </div>
      </div>

      {/* Intro Section */}
      <div className="bg-[#1E88E5] text-white px-4 pb-8 pt-2">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Flashback Keuanganmu tahun ini</h2>
          <p className="text-blue-100">Seperti ini pengelolaan keuanganmu tahun 2024</p>
        </div>
      </div>

      {/* Content Sections */}
      <div className="px-4 -mt-4">
        {/* Spending Summary Card */}
        <div className="bg-white rounded-lg shadow-sm p-5 mb-4">
          <h3 className="text-xl font-bold mb-4">Ringkasan Pengeluaran</h3>

          <div className="flex justify-between items-center mb-6">
            <div className="text-center">
              <p className="text-gray-500 text-sm">Total Pengeluaran</p>
              <p className="text-xl font-bold">{formatCurrency(yearlyData.totalSpent)}</p>
            </div>
            <div className="text-4xl">vs</div>
            <div className="text-center">
              <p className="text-gray-500 text-sm">Total Tersimpan</p>
              <p className="text-xl font-bold text-green-600">{formatCurrency(yearlyData.totalSaved)}</p>
            </div>
          </div>

          <h4 className="font-medium mb-2">Kamu paling boncos di...</h4>
          {yearlyData.topCategories.map((category, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span>{category.name}</span>
                <span>{formatCurrency(category.amount)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${category.percentage}%` }}></div>
              </div>
            </div>
          ))}

          <div className="mt-4 flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Bulan paling boncos:</span>
              <span className="font-medium">{yearlyData.mostExpensiveMonth}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tempatmu paling sering jajan:</span>
              <span className="font-medium">{yearlyData.topMerchants.join(", ")}</span>
            </div>
          </div>
        </div>

        {/* Spending Persona Card */}
        <div className="bg-white rounded-lg shadow-sm p-5 mb-4">
          <h3 className="text-xl font-bold mb-4">Zodiak keuanganmu</h3>

          <div className="flex items-center justify-center mb-4">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-4xl">🧠</div>
          </div>

          <div className="text-center mb-4">
            <h4 className="text-lg font-bold text-blue-800">Kamu adalah {yearlyData.spendingPersona}!</h4>
            <p className="text-gray-600 text-sm mt-1">
              Perfectly balanced pengeluaran dan tabungan, as it should be 👿(thanos).
            </p>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <h4 className="font-medium mb-2">Trend Pengeluaranmu</h4>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                {yearlyData.yearOverYearChange > 0 ? "📈" : "📉"}
              </div>
              <p className="text-sm">
                Pengeluaranmu meningkat sebesar <span className="font-medium">{yearlyData.yearOverYearChange}%</span>{" "}
                dibandingkan tahun lalu.
              </p>
            </div>
          </div>
        </div>

        {/* Achievements Card */}
        <div className="bg-white rounded-lg shadow-sm p-5 mb-4">
          <h3 className="text-xl font-bold mb-4">Kamu juara di...</h3>

          <div className="space-y-4">
            {yearlyData.achievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-2xl">🏆</div>
                <div>
                  <h4 className="font-bold">{achievement.name}</h4>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-3 bg-green-50 rounded-lg">
            <h4 className="font-medium mb-1">Bulan terfrugal kamu</h4>
            <p className="text-sm">
              Kamu nabung paling banyak di <span className="font-medium">{yearlyData.biggestSavingsMonth}</span>, menyisihkan 35% pendapatanmu!
            </p>
          </div>
        </div>

        {/* What If Scenarios */}
        <div className="bg-white rounded-lg shadow-sm p-5 mb-4">
          <h3 className="text-xl font-bold mb-4">Gimana kalo...</h3>

          <div className="p-3 bg-gray-50 rounded-lg mb-3">
            <p className="text-sm">
              Kalo kamu ngurangin <span className="font-medium">ngopi-ngopi</span> setengahnya aja, kamu bisa
              sudah hemat <span className="font-medium">Rp 2.400.000</span>.
            </p>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm">
              Kalo Kamu investasi return 5% aja, kamu udah bisa cuan{" "}
              <span className="font-medium">Rp 2.100.000</span>.
            </p>
          </div>
        </div>

        {/* Share Section */}
        <div className="bg-white rounded-lg shadow-sm p-5 mb-8">
          <h3 className="text-lg font-bold mb-3">Sebarin Perjalanan Keuanganmu</h3>
          <p className="text-sm text-gray-600 mb-4">
            Sebarkan pencapaian finansialmu dengan teman-teman (Jumlah akan disembunyikan untuk privasi)
          </p>

          <button className="w-full flex items-center justify-center gap-2 py-3 bg-blue-500 text-white rounded-lg">
            <Share2 size={18} />
            <span>Sebarkan Recap Keuanganku</span>
          </button>
        </div>
      </div>
    </main>
  )
}

