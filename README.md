# Smart Bookmark App

A simple bookmark management app built with **Next.js** and **Supabase**, allowing users to **add, view, and delete bookmarks**. Fully deployable on **Vercel**.

---

## Features

- User login via Supabase Auth
- Add new bookmarks (title + URL)
- View all bookmarks
- Delete bookmarks with an “X” button
- Fully client-side reactive
- Ready for Vercel deployment

---

## Tech Stack

- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS  
- **Backend:** Supabase (PostgreSQL + Auth)  
- **Deployment:** Vercel

---

## Getting Started

### 1. Clone the repository

###bash
git clone https://github.com/divyaambavaram/smart-bookmark.git
cd smart-bookmark

###Install dependencies
npm install

###Environment Variables

Create a .env.local file in the project root:

NEXT_PUBLIC_SUPABASE_URL=https://chtkfgprburaoksinlkh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_31NnrrPcRKdHTDTAVpk0HQ_8cUi7K8t

###Run Locally
npm run dev

folder structure
smart-bookmark/
│
├─ app/                  # Next.js pages (page.tsx, dashboard, login, etc.)
├─ components/           # React components (BookmarkList.tsx, AddBookmark.tsx)
├─ lib/                  # Supabase client (supabaseClient.ts)
├─ public/               # Static assets
├─ styles/               # Tailwind CSS / global styles
├─ package.json
├─ tsconfig.json
└─ README.md
###Usage

Add a bookmark: Enter title + URL → Click Add

View bookmarks: Displayed in a list

Delete bookmark: Click the “X” next to a bookmark
