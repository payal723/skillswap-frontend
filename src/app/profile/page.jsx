'use client';

import React from 'react';
import Image from 'next/image';
import { mockUser } from '../../../data/mockData.js';
import PostCard from '../../../components/PostCard.jsx';
import { useAppContext } from '../../../context/AppProvider.js';

export default function ProfilePage() {
  const { posts } = useAppContext();
  const myPosts = posts.filter((post) => post.authorName === mockUser.name);

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Profile Card */}
      <div className="max-w-3xl mx-auto bg-white rounded-lg border border-gray-200 p-6 mb-8 flex items-center gap-6">
        <Image
          src={mockUser.dp}
          alt={mockUser.name}
          width={100}
          height={100}
          className="rounded-full border-2 border-gray-200"
        />
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
            <h1 className="text-2xl font-semibold text-gray-900">{mockUser.name}</h1>
            <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition">
              Edit Profile
            </button>
          </div>
          <p className="text-gray-600 text-sm mb-4">{mockUser.bio}</p>

          {/* Skills */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Top Skills</h3>
            <div className="flex flex-wrap gap-2">
              {mockUser.mySkills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 text-sm rounded-full bg-blue-50 text-blue-700 border border-blue-100"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* My Posts */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">My Skill Swap Posts</h2>
        {myPosts.length > 0 ? (
          <div className="space-y-5">
            {myPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-600">You haven't posted any swaps yet.</p>
            <button className="mt-3 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition">
              Create Your First Swap
            </button>
          </div>
        )}
      </div>
    </main>
  );
}