"use client"

import { useRouter } from "next/navigation"
import StatusBar from "@/components/status-bar"
import AccountCard from "@/components/account-card"
import FeatureSection from "@/components/feature-section"
import BottomNavigation from "@/components/bottom-navigation"
import PromoBanner from "@/components/promo-banner"

export default function Dashboard() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      // Call the logout endpoint
      const accessToken = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        }
      })

      // Clear all stored data
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("userData")
      sessionStorage.removeItem("accessToken")
      sessionStorage.removeItem("refreshToken")
      sessionStorage.removeItem("userData")

      // Redirect to login page
      router.push("/login")
    } catch (error) {
      console.error("Logout failed:", error)
      // Even if the API call fails, we still want to clear local data and redirect
      localStorage.clear()
      sessionStorage.clear()
      router.push("/login")
    }
  }

  return (
    <main className="flex min-h-screen flex-col bg-[#1E88E5] pb-20">
      {/* Status Bar */}
      <StatusBar />

      {/* Header */}
      <div className="flex justify-between items-center px-6 pt-2 pb-4">
        <div className="text-white font-cursive text-3xl">
          <h1 className="font-bold">livin'</h1>
          <p className="text-xs -mt-1 ml-8">by mandiri</p>
        </div>
        <div className="flex gap-8">
          <div className="flex flex-col items-center">
            <div className="w-6 h-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <span className="text-white text-sm mt-1">Pesan</span>
          </div>
          <button 
            onClick={handleLogout}
            className="flex flex-col items-center"
          >
            <div className="w-6 h-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </div>
            <span className="text-white text-sm mt-1">Keluar</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 rounded-t-3xl px-4 pt-4">
        {/* Account Info Card */}
        <AccountCard />

        {/* Promo Banner */}
        <PromoBanner />

        {/* Main Features */}
        <FeatureSection
          title="Fitur Utama Anda"
          showSettings={true}
          features={[
            { icon: "transfer", label: "Transfer Uang", color: "bg-emerald-400" },
            { icon: "wallet", label: "Isi Saldo e-Money", color: "bg-orange-400" },
            { icon: "invoice", label: "Bayar VA", color: "bg-sky-400" },
            { icon: "credit", label: "Kredit", color: "bg-lime-400" },
          ]}
        />

        {/* Other Features */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Fitur Lainnya</h2>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            <div className="px-5 py-2 bg-blue-500 text-white rounded-full whitespace-nowrap">Sering Dipakai</div>
            <div className="px-5 py-2 bg-white border border-gray-300 rounded-full whitespace-nowrap">Transfer</div>
            <div className="px-5 py-2 bg-white border border-gray-300 rounded-full whitespace-nowrap">Top-Up</div>
            <div className="px-5 py-2 bg-white border border-gray-300 rounded-full whitespace-nowrap">Bayar</div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </main>
  )
}

