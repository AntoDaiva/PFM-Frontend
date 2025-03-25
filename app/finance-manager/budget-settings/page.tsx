"use client"

import { useState } from "react"
import { ArrowLeft, Plus, Save } from "lucide-react"
import Link from "next/link"

export default function BudgetSettingsPage() {
  // Mock data for budget categories
  const initialCategories = [
    { id: 1, name: "Food", budget: 2000000, icon: "🍔" },
    { id: 2, name: "Shopping", budget: 1000000, icon: "🛍️" },
    { id: 3, name: "Transport", budget: 1000000, icon: "🚗" },
    { id: 4, name: "Bills", budget: 1500000, icon: "📄" },
    { id: 5, name: "Entertainment", budget: 500000, icon: "🎬" },
  ]

  // Budget profiles
  const budgetProfiles = [
    { id: "frugal", name: "Frugal Living", description: "Pengeluaran minimum, tabungan maksimum" },
    { id: "investor", name: "The Investor", description: "Fokus pada perkembangan investasi" },
    { id: "traveler", name: "The Traveler", description: "Nabung untuk pengalaman dan perjalanan" },
    { id: "fashionista", name: "The Fashionista", description: "Prioritas belanja dan fashion" },
  ]

  const [categories, setCategories] = useState(initialCategories)
  const [activeTab, setActiveTab] = useState("custom")
  const [selectedProfile, setSelectedProfile] = useState("")

  const handleBudgetChange = (id: number, value: string) => {
    const numValue = value === "" ? 0 : Number.parseInt(value.replace(/\D/g, ""))
    setCategories(categories.map((cat) => (cat.id === id ? { ...cat, budget: numValue } : cat)))
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value)
  }

  const handleSave = () => {
    alert("Pengaturan anggaran berhasil ditambah!")
  }

  const handleSelectProfile = (profileId: string) => {
    setSelectedProfile(profileId)

    // In a real app, this would adjust the budget allocations based on the profile
    // For this demo, we'll just show an alert
    alert(`${profileId} profile terpilih! Alokasi anggaran akan menyesuaikan.`)
  }

  return (
    <main className="flex min-h-screen flex-col bg-gray-100">
      {/* Top Navigation */}
      <div className="bg-[#1E88E5] text-white p-4">
        <div className="flex items-center justify-between">
          <Link href="/finance-manager" className="p-2">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-xl font-bold">Pengaturan Anggaran</h1>
          <button className="p-2 text-white" onClick={handleSave}>
            <Save size={24} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b bg-white">
        <button
          className={`flex-1 py-3 text-center ${
            activeTab === "custom" ? "text-blue-600 border-b-2 border-blue-600 font-medium" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("custom")}
        >
          Custom Budgeting
        </button>
        <button
          className={`flex-1 py-3 text-center ${
            activeTab === "profile" ? "text-blue-600 border-b-2 border-blue-600 font-medium" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("profile")}
        >
          Budget Profiles
        </button>
      </div>

      {/* Custom Budgeting Tab */}
      {activeTab === "custom" && (
        <div className="p-4">
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <h2 className="text-lg font-bold mb-4">Alokasi Anggaran Bulanan</h2>

            <div className="space-y-4">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-xl mr-3">
                    {category.icon}
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{category.name}</label>
                    <input
                      type="text"
                      value={category.budget === 0 ? "" : category.budget.toString()}
                      onChange={(e) => handleBudgetChange(category.id, e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="0"
                    />
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full flex items-center justify-center gap-2 py-3 mt-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500">
              <Plus size={18} />
              <span>Tambah Kategori Baru</span>
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-bold mb-2">Jumlah Anggaran Bulanan</h2>
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(categories.reduce((sum, cat) => sum + cat.budget, 0))}
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <h3 className="font-medium mb-1">Tips Anggaran</h3>
              <p className="text-sm text-gray-700">
                Aturan praktis yang baik adalah mengalokasikan 50% untuk kebutuhan, 30% untuk keinginan, dan 20% untuk tabungan.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Profile-Based Budgeting Tab */}
      {activeTab === "profile" && (
        <div className="p-4">
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <h2 className="text-lg font-bold mb-4">Pilih Profil Anggaran</h2>
            <p className="text-sm text-gray-600 mb-4">
              Pilih profil anggaran yang sudah ditentukan sesuai dengan gaya hidup dan tujuan keuangan Anda!
            </p>

            <div className="space-y-3">
              {budgetProfiles.map((profile) => (
                <div
                  key={profile.id}
                  className={`p-3 border rounded-lg cursor-pointer ${
                    selectedProfile === profile.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                  onClick={() => handleSelectProfile(profile.id)}
                >
                  <h3 className="font-medium">{profile.name}</h3>
                  <p className="text-sm text-gray-600">{profile.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-bold mb-2">Bagaimana Cara Kerjanya?</h2>
            <p className="text-sm text-gray-600">
            Saat Anda memilih profil anggaran, kami akan secara otomatis menyesuaikan alokasi kategori berdasarkan persentase yang disarankan dalam profil.
            Anda tetap dapat melakukan penyesuaian secara manual setelah menerapkan profil.
            </p>

            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-100 rounded-lg">
              <p className="text-sm text-yellow-800">
                <span className="font-medium">Cacatan:</span> Mengubah profil anggaran Anda akan menimpa pengaturan anggaran kustom saat ini.
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

