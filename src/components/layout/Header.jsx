'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/Button';
import { FaMoon, FaSun, FaPlus } from 'react-icons/fa';

export const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    // ... बाकी का कोड जैसा है वैसा ही रहेगा ...
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-md">
      <nav className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          SkillSwap
        </Link>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>
          {isAuthenticated ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Dashboard</Button>
              </Link>
              <Link href="/create-post">
                <Button size="sm" className="flex items-center">
                  <FaPlus className="mr-0 sm:mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Create Post</span>
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                 <Link href="/profile" className="flex items-center group">
                    <img
                      src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || '')}`}
                      alt="profile"
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="ml-2 font-semibold hidden lg:inline group-hover:text-blue-600">
                      {user?.name}
                    </span>
                 </Link>
                 <Button onClick={logout} variant="outline" size="sm" className="hidden sm:inline-flex">Logout</Button>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/register">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};