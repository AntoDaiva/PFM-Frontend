"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
const API_BASE_URL: string = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

const publicPaths = ["/login", "/register"]

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
      
      if (!accessToken && !publicPaths.includes(pathname)) {
        router.push("/login")
        return
      }

      if (accessToken && !publicPaths.includes(pathname)) {
        try {
          const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })

          const data = await response.json()

          if (!data.success) {
            // Token is invalid
            localStorage.clear()
            sessionStorage.clear()
            router.push("/login")
            return
          }

          setIsAuthenticated(true)
        } catch (error) {
          console.error("Auth verification failed:", error)
          localStorage.clear()
          sessionStorage.clear()
          router.push("/login")
          return
        }
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [pathname, router])

  // Show nothing while checking authentication
  if (isLoading) {
    return null
  }

  // Allow access to public paths without authentication
  if (publicPaths.includes(pathname)) {
    return <>{children}</>
  }

  // Show protected content only if authenticated
  return isAuthenticated ? <>{children}</> : null
} 