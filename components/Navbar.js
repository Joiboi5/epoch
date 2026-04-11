import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-widest text-indigo-400">
          EPOCH
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-indigo-400 transition-colors">Dashboard</Link>
          <Link href="/habits" className="hover:text-indigo-400 transition-colors">Habits</Link>
          <Link href="/timer" className="hover:text-indigo-400 transition-colors">Timer</Link>
        </div>

        {/* Mobile Hamburger */}
        <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-3 flex flex-col gap-3 text-sm font-medium px-2 pb-2">
          <Link href="/" onClick={() => setMenuOpen(false)} className="hover:text-indigo-400">Dashboard</Link>
          <Link href="/habits" onClick={() => setMenuOpen(false)} className="hover:text-indigo-400">Habits</Link>
          <Link href="/timer" onClick={() => setMenuOpen(false)} className="hover:text-indigo-400">Timer</Link>
        </div>
      )}
    </nav>
  );
}