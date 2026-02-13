'use client'

import { supabase } from '../../lib/supabaseClient'

export default function LoginPage() {
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin, queryParams: { prompt: 'select_account' } },
    })
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-10 rounded-xl shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-6">Smart Bookmark App</h1>
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  )
}
