

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppContext } from '../context/AppProvider.js';

export default function Header() {
  const { isLoggedIn, setIsLoggedIn } = useAppContext();
  const [open, setOpen] = useState(false);

  const NavLink = ({ href, children }) => (
    <Link href={href} className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition">
      {children}
    </Link>
  );

  const Btn = ({ onClick, className, children }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition ${className}`}
    >
      {children}
    </button>
  );

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <nav className="container mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          SkillSwap
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-1">
          <NavLink href="/">Home</NavLink>
          {isLoggedIn ? (
            <>
              <NavLink href="/profile">My Account</NavLink>
              <Btn onClick={() => setIsLoggedIn(false)} className="bg-red-500 text-white hover:bg-red-600">
                Logout
              </Btn>
            </>
          ) : (
            <>
              <Link href="/login">
                <Btn className="bg-blue-600 text-white hover:bg-blue-700">Login</Btn>
              </Link>
              <Link href="/signup">
                <Btn className="ml-2 bg-gray-800 text-white hover:bg-gray-900">Signup</Btn>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button className="md:hidden p-2" onClick={() => setOpen((v) => !v)} aria-label="menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-6 pb-4 space-y-2">
          <NavLink href="/">Home</NavLink>
          {isLoggedIn ? (
            <>
              <NavLink href="/profile">My Account</NavLink>
              <Btn onClick={() => setIsLoggedIn(false)} className="w-full bg-red-500 text-white hover:bg-red-600">
                Logout
              </Btn>
            </>
          ) : (
            <>
              <Link href="/login">
                <Btn className="w-full bg-blue-600 text-white hover:bg-blue-700">Login</Btn>
              </Link>
              <Link href="/signup">
                <Btn className="w-full mt-2 bg-gray-800 text-white hover:bg-gray-900">Signup</Btn>
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}