'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/navigation'
import BookmarkList from '../components/BookmarkList'

export default function Home() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login') // redirect if not logged in
      } else {
        setLoading(false)
      }
    }

    checkUser()
  }, [router])

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error signing out:', error.message)
    } else {
      router.push('/login') // redirect after logout
    }
  }

  if (loading) return <p className="text-center mt-10">Loading...</p>

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-10">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-xl p-6 mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Smart Bookmark App</h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="w-full max-w-2xl bg-white shadow-md rounded-xl p-6">
        <BookmarkList />
      </div>
    </div>
  )
}
