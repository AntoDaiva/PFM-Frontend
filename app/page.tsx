import { redirect } from "next/navigation"

// Redirect from root to login page
export default function Home() {
  redirect("/login")
  return null
}

