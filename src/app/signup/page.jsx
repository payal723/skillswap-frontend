// 'use client';

// import React from 'react';
// import Link from 'next/link';
// import Input from '@/components/ui/Input';
// import Button from '@/components/ui/Button';

// const SignupPage = () => {
//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-50">
//             <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
//                 <h2 className="text-2xl font-bold text-center text-gray-800">Create an Account</h2>
//                 <form className="space-y-4">
//                     <Input placeholder="Full Name" />
//                     <Input type="email" placeholder="Email" />
//                     <Input type="password" placeholder="Password" />
//                     <textarea placeholder="Your Bio" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" rows="3"></textarea>
//                     <div>
//                          <label className="block text-sm font-medium text-gray-700 mb-1">Display Picture</label>
//                         <Input type="file" className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
//                     </div>
//                     <Button className="w-full">Sign Up</Button>
//                 </form>
//                 <div className="relative my-4">
//                     <div className="absolute inset-0 flex items-center">
//                         <div className="w-full border-t border-gray-300"></div>
//                     </div>
//                     <div className="relative flex justify-center text-sm">
//                         <span className="px-2 bg-white text-gray-500">Or</span>
//                     </div>
//                 </div>
//                 <Button className="w-full bg-red-500 hover:bg-red-600">
//                     Sign up with Google
//                 </Button>
//                  <p className="text-sm text-center text-gray-600">
//                     Already have an account? <Link href="/login" className="font-medium text-blue-600 hover:underline">Login</Link>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default SignupPage;

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { FiEye, FiEyeOff, FiUploadCloud } from 'react-icons/fi';

export default function SignupPage() {
  const [showPass, setShowPass] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <main className="relative min-h-screen grid place-items-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 overflow-hidden">
      {/* animated blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-2000" />

      <div className="relative w-full max-w-lg p-8 md:p-10 rounded-3xl bg-white/20 backdrop-blur-2xl border border-white/20 shadow-2xl text-white">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-2">Join SkillSwap</h1>
        <p className="text-center text-white/80 mb-8">Create your account in seconds</p>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {/* Name */}
          <div className="relative group">
            <input required className="peer w-full bg-transparent border-b-2 border-white/40 focus:border-white outline-none pt-6 pb-2 placeholder-transparent transition" placeholder="Full Name" />
            <label className="absolute left-0 -top-0 text-white/70 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white/50 peer-placeholder-shown:top-6 peer-focus:-top-0 peer-focus:text-white/90 peer-focus:text-sm">Full Name</label>
          </div>

          {/* Email */}
          <div className="relative group">
            <input type="email" required className="peer w-full bg-transparent border-b-2 border-white/40 focus:border-white outline-none pt-6 pb-2 placeholder-transparent transition" placeholder="Email" />
            <label className="absolute left-0 -top-0 text-white/70 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white/50 peer-placeholder-shown:top-6 peer-focus:-top-0 peer-focus:text-white/90 peer-focus:text-sm">Email</label>
          </div>

          {/* Password */}
          <div className="relative group">
            <input type={showPass ? 'text' : 'password'} required className="peer w-full bg-transparent border-b-2 border-white/40 focus:border-white outline-none pt-6 pb-2 placeholder-transparent transition pr-10" placeholder="Password" />
            <label className="absolute left-0 -top-0 text-white/70 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white/50 peer-placeholder-shown:top-6 peer-focus:-top-0 peer-focus:text-white/90 peer-focus:text-sm">Password</label>
            <button type="button" onClick={() => setShowPass((v) => !v)} className="absolute right-0 top-6 text-white/70 hover:text-white transition"><FiEye size={20} /></button>
          </div>

          {/* Bio */}
          <div className="relative group">
            <textarea required rows="3" className="peer w-full bg-transparent border-b-2 border-white/40 focus:border-white outline-none pt-6 pb-2 placeholder-transparent resize-none transition" placeholder="Your Bio"></textarea>
            <label className="absolute left-0 -top-0 text-white/70 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white/50 peer-placeholder-shown:top-6 peer-focus:-top-0 peer-focus:text-white/90 peer-focus:text-sm">Your Bio</label>
          </div>

          {/* Display Picture ‑ drag & drop */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Display Picture</label>
            <div
              className={`border-2 border-dashed rounded-2xl p-4 text-center transition ${dragOver ? 'border-white' : 'border-white/40'}`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
            >
              {preview ? (
                <img src={preview} alt="preview" className="w-24 h-24 mx-auto rounded-full object-cover ring-4 ring-white/30" />
              ) : (
                <>
                  <FiUploadCloud size={40} className="mx-auto text-white/60" />
                  <p className="text-white/70 mt-2 text-sm">Drag & drop or <label className="underline cursor-pointer">browse<input type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files[0])} /></label></p>
                </>
              )}
            </div>
          </div>

          <button type="submit" className="w-full mt-4 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition">Create Account</button>
        </form>

        {/* divider */}
        <div className="flex items-center my-6"><div className="flex-1 h-px bg-white/30" /><span className="px-3 text-sm text-white/70">Or</span><div className="flex-1 h-px bg-white/30" /></div>

        <button className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-white/90 text-gray-800 font-medium hover:bg-white transition"><FcGoogle size={22} />Sign up with Google</button>

        <p className="text-center text-sm text-white/80 mt-6">Already have an account? <Link href="/login" className="font-semibold text-white relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 hover:after:w-full">Login</Link></p>
      </div>
    </main>
  );
}