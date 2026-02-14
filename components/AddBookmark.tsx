'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

interface Props {
  onBookmarkAdded: (bookmark: any) => void
}

export default function AddBookmark({ onBookmarkAdded }: Props) {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const handleAdd = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return alert('Login first')
    if (!title || !url) return alert('Fill all fields')

    const { data, error } = await supabase
      .from('bookmarks')
      .insert({
        title,
        url,
        user_id: user.id,
      })
      .select()
      .single()

    if (error) {
      alert(error.message)
    } else {
      onBookmarkAdded(data) // 🔥 instant UI update
      setTitle('')
      setUrl('')
    }
  }

  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded w-1/3"
      />
      <input
        type="url"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border p-2 rounded w-1/3"
      />
      <button
        onClick={handleAdd}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add
      </button>
    </div>
  )
}
