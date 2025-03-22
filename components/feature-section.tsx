import { Settings } from "lucide-react"

interface FeatureProps {
  title: string
  showSettings?: boolean
  features: {
    icon: string
    label: string
    color: string
  }[]
}

export default function FeatureSection({ title, showSettings = false, features }: FeatureProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "transfer":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        )
      case "wallet":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <path d="M16 12h.01" />
          </svg>
        )
      case "invoice":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6" />
            <path d="M16 13H8" />
            <path d="M16 17H8" />
            <path d="M10 9H8" />
          </svg>
        )
      case "credit":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <line x1="2" y1="10" x2="22" y2="10" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        {showSettings && (
          <div className="flex items-center text-blue-500">
            <span className="mr-1">Atur</span>
            <Settings size={20} />
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-4">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center`}>
              <div className="w-8 h-8">{getIcon(feature.icon)}</div>
            </div>
            <span className="text-center mt-2 text-sm">{feature.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

