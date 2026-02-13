'use client'

import { useState } from 'react'
import AddBookmark from '../components/AddBookmark'
import BookmarkList from '../components/BookmarkList'

export default function Home() {
  const [refresh, setRefresh] = useState(0)

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Bookmarks</h1>
      <AddBookmark onAdded={() => setRefresh(prev => prev + 1)} />
      <BookmarkList key={refresh} />
    </div>
  )
}
