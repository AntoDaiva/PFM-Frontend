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
    mostExpensiveMonth: "December",
    topMerchants: ["Tokopedia", "Grab", "Starbucks"],
    spendingPersona: "Balanced Spender",
    yearOverYearChange: 8, // percentage increase
    biggestSavingsMonth: "August",
    achievements: [
      { name: "Budget Master", description: "Stayed within budget for 9 months" },
      { name: "Consistent Saver", description: "Saved money every month" },
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
          <h1 className="text-xl font-bold">Your 2024 Financial Recap</h1>
          <div className="w-8"></div> {/* Empty div for spacing */}
        </div>
      </div>

      {/* Intro Section */}
      <div className="bg-[#1E88E5] text-white px-4 pb-8 pt-2">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Your Year in Finance</h2>
          <p className="text-blue-100">Here's how you managed your money in 2024</p>
        </div>
      </div>

      {/* Content Sections */}
      <div className="px-4 -mt-4">
        {/* Spending Summary Card */}
        <div className="bg-white rounded-lg shadow-sm p-5 mb-4">
          <h3 className="text-xl font-bold mb-4">Spending Summary</h3>

          <div className="flex justify-between items-center mb-6">
            <div className="text-center">
              <p className="text-gray-500 text-sm">Total Spent</p>
              <p className="text-xl font-bold">{formatCurrency(yearlyData.totalSpent)}</p>
            </div>
            <div className="text-4xl">vs</div>
            <div className="text-center">
              <p className="text-gray-500 text-sm">Total Saved</p>
              <p className="text-xl font-bold text-green-600">{formatCurrency(yearlyData.totalSaved)}</p>
            </div>
          </div>

          <h4 className="font-medium mb-2">Top Spending Categories</h4>
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
              <span className="text-gray-600">Most expensive month:</span>
              <span className="font-medium">{yearlyData.mostExpensiveMonth}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Top merchants:</span>
              <span className="font-medium">{yearlyData.topMerchants.join(", ")}</span>
            </div>
          </div>
        </div>

        {/* Spending Persona Card */}
        <div className="bg-white rounded-lg shadow-sm p-5 mb-4">
          <h3 className="text-xl font-bold mb-4">Your Financial Personality</h3>

          <div className="flex items-center justify-center mb-4">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-4xl">🧠</div>
          </div>

          <div className="text-center mb-4">
            <h4 className="text-lg font-bold text-blue-800">You're a {yearlyData.spendingPersona}!</h4>
            <p className="text-gray-600 text-sm mt-1">
              You maintain a good balance between spending and saving, with room for occasional splurges.
            </p>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <h4 className="font-medium mb-2">Spending Trends</h4>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                {yearlyData.yearOverYearChange > 0 ? "📈" : "📉"}
              </div>
              <p className="text-sm">
                Your spending increased by <span className="font-medium">{yearlyData.yearOverYearChange}%</span>{" "}
                compared to last year.
              </p>
            </div>
          </div>
        </div>

        {/* Achievements Card */}
        <div className="bg-white rounded-lg shadow-sm p-5 mb-4">
          <h3 className="text-xl font-bold mb-4">Your Achievements</h3>

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
            <h4 className="font-medium mb-1">Biggest Savings Win</h4>
            <p className="text-sm">
              You saved the most in <span className="font-medium">{yearlyData.biggestSavingsMonth}</span>, setting aside
              35% of your income!
            </p>
          </div>
        </div>

        {/* What If Scenarios */}
        <div className="bg-white rounded-lg shadow-sm p-5 mb-4">
          <h3 className="text-xl font-bold mb-4">What If...</h3>

          <div className="p-3 bg-gray-50 rounded-lg mb-3">
            <p className="text-sm">
              If you had reduced your <span className="font-medium">coffee shop</span> spending by half, you could have
              saved an additional <span className="font-medium">Rp 2.400.000</span>.
            </p>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm">
              If you had invested your savings with a 5% return, you would have earned an additional{" "}
              <span className="font-medium">Rp 2.100.000</span>.
            </p>
          </div>
        </div>

        {/* Share Section */}
        <div className="bg-white rounded-lg shadow-sm p-5 mb-8">
          <h3 className="text-lg font-bold mb-3">Share Your Financial Journey</h3>
          <p className="text-sm text-gray-600 mb-4">
            Share your financial achievements with friends (amounts will be hidden for privacy)
          </p>

          <button className="w-full flex items-center justify-center gap-2 py-3 bg-blue-500 text-white rounded-lg">
            <Share2 size={18} />
            <span>Share My Financial Recap</span>
          </button>
        </div>
      </div>
    </main>
  )
}

