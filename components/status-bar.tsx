export default function StatusBar() {
  return (
    <div className="flex justify-between items-center px-6 pt-4 pb-2">
      <div className="text-white text-xl font-semibold">9:41</div>
      <div className="flex items-center gap-1">
        <div className="w-5 h-4">
          <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.33 4.67c.98-.98 2.56-.98 3.54 0l3.54 3.54c.98.98.98 2.56 0 3.54l-8.13 8.13c-.98.98-2.56.98-3.54 0l-3.54-3.54c-.98-.98-.98-2.56 0-3.54l8.13-8.13z" />
          </svg>
        </div>
        <div className="w-5 h-4">
          <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
          </svg>
        </div>
        <div className="w-8 h-4 bg-white rounded-sm ml-1"></div>
      </div>
    </div>
  )
}

