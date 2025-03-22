import Link from "next/link"

export default function PromoBanner() {
  return (
    <div className="bg-orange-400 rounded-xl p-4 mt-4 flex justify-between items-center">
      <div className="max-w-[60%]">
        <h3 className="text-xl font-bold text-gray-800">Personal Finance Manager</h3>
        <p className="text-gray-800 text-sm">Kelola keuanganmu dan kembangkan asetmu</p>
      </div>
      <Link href="/finance-manager">
        <button className="bg-white text-gray-800 px-4 py-2 rounded-lg font-medium">Coba Sekarang!</button>
      </Link>
    </div>
  )
}

