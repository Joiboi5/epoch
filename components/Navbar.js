import Link from 'next/link';
import { useState } from 'react';

const links = [
  { href: '/', label: 'Dashboard' },
  { href: '/habits', label: 'Habits' },
  { href: '/timer', label: 'Timer' },
  { href: '/analytics', label: 'Analytics' },
  { href: '/settings', label: 'Settings' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-widest text-indigo-400">
          EPOCH
        </Link>

        <div className="hidden md:flex gap-6 text-sm font-medium">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-indigo-400 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-3 flex flex-col gap-3 text-sm font-medium px-2 pb-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="hover:text-indigo-400"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
