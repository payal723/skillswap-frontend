
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function LoginPage() {
  const [showPass, setShowPass] = useState(false);

  const handleGoogle = () => alert('Google login clicked');

  return (
    <main className="relative min-h-screen grid place-items-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-2000" />

      <div className="relative w-full max-w-md p-8 md:p-10 rounded-3xl bg-white/20 backdrop-blur-2xl border border-white/20 shadow-2xl text-white">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-2">Welcome Back</h1>
        <p className="text-center text-white/80 mb-8">Login to continue your journey</p>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {/* Email */}
          <div className="relative group">
            <input
              type="email"
              required
              className="peer w-full bg-transparent border-b-2 border-white/40 focus:border-white outline-none pt-6 pb-2 placeholder-transparent transition"
              placeholder="Email"
            />
            <label className="absolute left-0 -top-0 text-white/70 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white/50 peer-placeholder-shown:top-6 peer-focus:-top-0 peer-focus:text-white/90 peer-focus:text-sm">
              Email
            </label>
          </div>

          {/* Password */}
          <div className="relative group">
            <input
              type={showPass ? 'text' : 'password'}
              required
              className="peer w-full bg-transparent border-b-2 border-white/40 focus:border-white outline-none pt-6 pb-2 placeholder-transparent transition pr-10"
              placeholder="Password"
            />
            <label className="absolute left-0 -top-0 text-white/70 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white/50 peer-placeholder-shown:top-6 peer-focus:-top-0 peer-focus:text-white/90 peer-focus:text-sm">
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPass((v) => !v)}
              className="absolute right-0 top-6 text-white/70 hover:text-white transition"
            >
              {showPass ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition"
          >
            Login
          </button>
        </form>

        {/* divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-white/30" />
          <span className="px-3 text-sm text-white/70">Or</span>
          <div className="flex-1 h-px bg-white/30" />
        </div>

        <button
          onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-white/90 text-gray-800 font-medium hover:bg-white transition"
        >
          <FcGoogle size={22} />
          Continue with Google
        </button>

        <p className="text-center text-sm text-white/80 mt-6">
          New here?{' '}
          <Link href="/signup" className="font-semibold text-white relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 hover:after:w-full">
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}