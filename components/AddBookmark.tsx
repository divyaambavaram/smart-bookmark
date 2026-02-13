'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

interface AddBookmarkProps {
  onAdded: () => void
}

export default function AddBookmark({ onAdded }: AddBookmarkProps) {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const handleAdd = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return alert('Please login first')

    const { error } = await supabase.from('bookmarks').insert({
      title,
      url,
      user_id: user.id, // ✅ matches RLS policy
    })

    if (error) {
      alert(error.message)
    } else {
      setTitle('')
      setUrl('')
      onAdded()
    }
  }

  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 mr-2 rounded"
      />
      <input
        type="url"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border p-2 mr-2 rounded"
      />
      <button
        onClick={handleAdd}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Bookmark
      </button>
    </div>
  )
}
