'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function Dashboard() {
  const [bookmarks, setBookmarks] = useState<any[]>([])
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const fetchBookmarks = async () => {
    const { data } = await supabase.from('bookmarks').select('*')
    setBookmarks(data || [])
  }

  useEffect(() => {
    fetchBookmarks()
  }, [])

  const addBookmark = async () => {
    await supabase.from('bookmarks').insert([{ title, url }])
    fetchBookmarks()
  }

  const deleteBookmark = async (id: string) => {
    await supabase.from('bookmarks').delete().eq('id', id)
    fetchBookmarks()
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <input placeholder="URL" value={url} onChange={e => setUrl(e.target.value)} />
      <button onClick={addBookmark}>Add</button>

      <ul>
        {bookmarks.map(b => (
          <li key={b.id}>
            <a href={b.url} target="_blank">{b.title}</a>
            <button onClick={() => deleteBookmark(b.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}