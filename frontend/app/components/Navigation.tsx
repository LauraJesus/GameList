// Componente de navegação

'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="hidden md:flex gap-6">
            <Link href="/" className="hover:text-blue-400 transition">
              Home
            </Link>
            <Link href="/pages/auth/login" className="hover:text-blue-400 transition">
              Login
            </Link>
            <Link href="/pages/auth/register" className="hover:text-blue-400 transition">
              Registrar
            </Link>
            <Link href="/pages/wishlist" className="hover:text-blue-400 transition">
              Wishlist
            </Link>
            <Link href="/pages/reviews" className="hover:text-blue-400 transition">
              Reviews
            </Link>
          </div>

          {/* Menu mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            ☰
          </button>
        </div>

        {/* Menu dropdown mobile */}
        {isOpen && (
          <div className="md:hidden flex flex-col gap-2 pb-4">
            <Link href="/" className="hover:text-blue-400">
              Home
            </Link>
            <Link href="/pages/auth/login" className="hover:text-blue-400">
              Login
            </Link>
            <Link href="/pages/auth/register" className="hover:text-blue-400">
              Registrar
            </Link>
            <Link href="/pages/wishlist" className="hover:text-blue-400">
              Wishlist
            </Link>
            <Link href="/pages/reviews" className="hover:text-blue-400">
              Reviews
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
