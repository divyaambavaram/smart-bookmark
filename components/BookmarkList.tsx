"use client"; // needed in Next.js 14 for client components

import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient"; // adjust path if needed

interface Bookmark {
  id: number;
  title: string;
  url: string;
  user_id: string;
}

const BookmarkList: React.FC = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  // Get logged-in user from Supabase
  const getUser = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) {
      console.error("Error fetching user:", error);
      return;
    }
    if (user) setUserId(user.id);
  };

  // Fetch bookmarks for logged-in user
  const fetchBookmarks = async () => {
    if (!userId) return;
    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", userId)
      .order("id", { ascending: false });

    if (error) console.error("Error fetching bookmarks:", error);
    else setBookmarks(data || []);
  };

  // Delete bookmark
  const deleteBookmark = async (id: number) => {
    const { error } = await supabase.from("bookmarks").delete().eq("id", id);
    if (error) console.error("Error deleting bookmark:", error);
    else setBookmarks(bookmarks.filter((b) => b.id !== id));
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    fetchBookmarks();
  }, [userId]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-3">My Bookmarks</h2>
      <ul>
        {bookmarks.map((bookmark) => (
          <li
            key={bookmark.id}
            className="flex justify-between items-center p-2 border-b"
          >
            <a
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {bookmark.title}
            </a>
            <button
              onClick={() => deleteBookmark(bookmark.id)}
              className="ml-4 text-red-500 font-bold hover:text-red-700"
            >
              X
            </button>
          </li>
        ))}
      </ul>
      {bookmarks.length === 0 && <p>No bookmarks yet.</p>}
    </div>
  );
};

export default BookmarkList;
