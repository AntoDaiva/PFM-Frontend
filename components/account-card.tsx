import Image from "next/image"
import { Eye } from "lucide-react"

export default function AccountCard() {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full overflow-hidden">
            <Image
              src="/placeholder.svg?height=48&width=48"
              alt="Profile picture"
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Halo, Soebagdja</h2>
            <div className="flex items-center text-gray-500">
              <span>Nasabah Biasa</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-gray-500 text-sm">Poin</div>
          <div className="flex items-center justify-end">
            <span className="text-xl font-bold">12.390</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 rounded-xl p-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-gray-600">Tabungan Now IDR</div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-2xl font-bold">Rp 4.500.000</span>
              <Eye className="text-blue-500" size={20} />
            </div>
            <div className="text-blue-500 mt-2 flex items-center">
              <span>Buka Detail</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div className="w-24 h-16 relative">
            <Image
              src="/placeholder.svg?height=64&width=96"
              alt="Credit card"
              width={96}
              height={64}
              className="object-contain"
            />
          </div>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-1 mt-3">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}

