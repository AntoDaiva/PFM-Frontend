interface ExpenseItemProps {
  expense: {
    id: string
    amount: number
    date: string
    category: string
    merchant: string
    categoryIcon?: string
  }
}

export default function ExpenseItem({ expense }: ExpenseItemProps) {
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short"
    })
  }

  // Format currency with thousand separators
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-xl">
          {expense.categoryIcon || "💰"}
        </div>
        <div>
          <h3 className="font-medium">{expense.merchant}</h3>
          <p className="text-sm text-gray-500">{expense.category}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-medium">{formatCurrency(expense.amount)}</p>
        <p className="text-sm text-gray-500">{formatDate(expense.date)}</p>
      </div>
    </div>
  )
}

