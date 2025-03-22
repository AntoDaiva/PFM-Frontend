"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Fingerprint } from "lucide-react"
import StatusBar from "@/components/status-bar"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      const accessToken = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
      
      if (accessToken) {
        try {
          const response = await fetch("http://localhost:5000/api/auth/verify", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })

          const data = await response.json()

          if (data.success) {
            // User is already logged in, redirect to dashboard
            router.push("/dashboard")
          } else {
            // Clear invalid tokens
            localStorage.clear()
            sessionStorage.clear()
          }
        } catch (error) {
          // Clear tokens on error
          localStorage.clear()
          sessionStorage.clear()
        }
      }
    }

    checkAuth()
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please enter both email and password")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!data.success) {
        setError(data.error?.message || "Login failed")
        setIsLoading(false)
        return
      }

      // Store tokens and user data
      if (rememberMe) {
        localStorage.setItem("accessToken", data.data.access_token)
        localStorage.setItem("refreshToken", data.data.refresh_token)
        localStorage.setItem("userData", JSON.stringify(data.data.user))
      } else {
        sessionStorage.setItem("accessToken", data.data.access_token)
        sessionStorage.setItem("refreshToken", data.data.refresh_token)
        sessionStorage.setItem("userData", JSON.stringify(data.data.user))
      }

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (err) {
      setError("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleBiometricLogin = () => {
    setError("Biometric login is not yet implemented")
  }

  return (
    <main className="flex min-h-screen flex-col bg-[#1E88E5]">
      {/* Status Bar */}
      <StatusBar />

      {/* Header */}
      <div className="flex justify-center items-center pt-6 pb-10">
        <div className="text-white font-cursive text-4xl">
          <h1 className="font-bold">livin'</h1>
          <p className="text-sm -mt-1 ml-12">by mandiri</p>
        </div>
      </div>

      {/* Login Form */}
      <div className="flex-1 bg-white rounded-t-3xl px-6 pt-8 pb-6 flex flex-col">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Login to Your Account</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{error}</div>
        )}

        <form onSubmit={handleLogin} className="flex-1 flex flex-col">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>

            <button type="button" className="text-sm text-blue-600 font-medium">
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-lg font-medium text-white ${
              isLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="mx-4 text-sm text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <button
            type="button"
            onClick={handleBiometricLogin}
            className="w-full py-3 border border-gray-300 rounded-lg font-medium text-gray-700 flex items-center justify-center gap-2"
          >
            <Fingerprint size={20} />
            <span>Login with Biometric</span>
          </button>
        </form>

        <div className="mt-auto pt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account? <button className="text-blue-600 font-medium">Register</button>
          </p>
        </div>
      </div>
    </main>
  )
}

