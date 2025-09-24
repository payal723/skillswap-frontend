

'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import PostCard from '../components/PostCard.jsx';
import CreatePostModal from '../components/CreatePostModal.jsx';
import Sidebar from '../components/Sidebar.jsx';
import { useAppContext } from '../context/AppProvider.js';
import { FaPlus } from 'react-icons/fa';

/* ---------- Splash ---------- */
const SplashScreen = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700">
    <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg animate-pulse">
      SkillSwap
    </h1>
  </div>
);

/* ---------- Hero ---------- */
const HeroSection = ({ onAddPostClick }) => {
  const el = useRef(); // root hero div

  useEffect(() => {
    const q = gsap.utils.selector(el);
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(q('h1'), { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1 })
      .fromTo(q('p'), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, '-=0.6')
      .fromTo(q('button'), { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7 }, '-=0.4');
  }, []);

  return (
    <div ref={el} className="relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-xl border border-white/20 shadow-2xl p-8 md:p-16 mb-12 text-center">
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-full blur-3xl opacity-30"></div>

      <h1 className="text-5xl md:text-7xl font-extrabold text-gray-800 leading-tight">
        Share Your Spark.
        <br />
        <span className="bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
          Ignite Your Project.
        </span>
      </h1>

      <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto">
        A creative ecosystem where passion is currency. Trade expertise with
        brilliant minds and build together.
      </p>

      <button
        onClick={onAddPostClick}
        className="mt-10 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center mx-auto space-x-3"
      >
        <FaPlus />
        <span>Post a Skill Swap</span>
      </button>
    </div>
  );
};

/* ---------- Main Page ---------- */
export default function Home() {
  const { posts } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const postsRef = useRef();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  /* ---- Stagger cards on load ---- */
  useEffect(() => {
    if (!loading && posts.length) {
      gsap.fromTo(
        postsRef.current.children,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.6, ease: 'power3.out' }
      );
    }
  }, [loading, posts]);

  if (loading) return <SplashScreen />;

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <HeroSection onAddPostClick={() => setIsModalOpen(true)} />

        <div className="flex flex-col lg:flex-row gap-10">
          <main className="w-full lg:w-3/4">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Latest Swaps</h2>
            <div ref={postsRef} className="grid gap-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </main>

          <Sidebar />
        </div>
      </div>

      {/* Floating + button */}
      <button
        onClick={() => setIsModalOpen(true)}
        aria-label="Add post"
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xl hover:shadow-2xl transform hover:scale-110 transition grid place-items-center animate-pulse"
      >
        <FaPlus className="text-2xl" />
      </button>

      <CreatePostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}