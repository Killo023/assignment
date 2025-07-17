'use client'

import Link from 'next/link'

const navItems = [
  { label: 'Classes', href: '/dashboard/institution/classes' },
  { label: 'Assignments', href: '/dashboard/institution/assignments' },
  { label: 'Plagiarism', href: '/dashboard/institution/plagiarism' },
  { label: 'Grading', href: '/dashboard/institution/grading' },
  { label: 'Analytics', href: '/dashboard/institution/analytics' },
  { label: 'Settings', href: '/dashboard/institution/settings' },
]

export default function InstitutionLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-950 flex pt-18">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col py-8 px-4 min-h-screen">
        <h2 className="text-2xl font-bold text-blue-400 mb-8">Institution Admin</h2>
        <nav className="flex flex-col gap-4">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-gray-300 hover:text-white px-3 py-2 rounded-lg transition">
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-10">
        {children}
      </main>
    </div>
  )
} 