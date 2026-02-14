'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

interface Bookmark {
  id: number
  title: string
  url: string
  user_id: string
}

export default function BookmarkList() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    const loadBookmarks = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const { data } = await supabase
        .from('bookmarks')
        .select('*')
        .eq('user_id', user.id)
        .order('id', { ascending: false })

      if (data) setBookmarks(data)
    }

    loadBookmarks()
  }, [])

  const handleAdd = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return
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

    if (!error && data) {
      setBookmarks((prev) => [data, ...prev]) // 🔥 instant
      setTitle('')
      setUrl('')
    }
  }

  const handleDelete = async (id: number) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id))
    await supabase.from('bookmarks').delete().eq('id', id)
  }

  return (
    <div>
      {/* Single Form */}
      <div className="flex gap-2 mb-6">
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

      {bookmarks.length === 0 && (
        <p className="text-gray-500">No bookmarks yet.</p>
      )}

      {bookmarks.map((bookmark) => (
        <div
          key={bookmark.id}
          className="flex justify-between items-center border-b py-3"
        >
          <div>
            <h3 className="font-semibold">{bookmark.title}</h3>
            <a
              href={bookmark.url}
              target="_blank"
              className="text-blue-600 text-sm"
            >
              {bookmark.url}
            </a>
          </div>

          <button
            onClick={() => handleDelete(bookmark.id)}
            className="text-red-500 text-lg font-bold hover:text-red-700"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}
