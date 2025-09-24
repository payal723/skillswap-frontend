// src/app/profile/page.jsx

'use client'; 

import React from 'react';
import Image from 'next/image';
import { mockUser } from '../../data/mockData.js';
import PostCard from '../../components/PostCard.jsx';
import Button from '../../components/ui/Button.jsx';
import { useAppContext } from '../../context/AppProvider.js';
import { FaEdit } from 'react-icons/fa';

const ProfilePage = () => {
    const { posts } = useAppContext();
    const myPosts = posts.filter(post => post.authorName === mockUser.name);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 mb-8 flex items-center space-x-6">
                <Image src={mockUser.dp} alt={mockUser.name} width={120} height={120} className="rounded-full border-4 border-blue-200" />
                <div className="flex-1">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold text-gray-800">{mockUser.name}</h1>
                        <Button className="bg-gray-200 text-gray-800 hover:bg-gray-300">
                            <FaEdit className="mr-2" /> Edit Profile
                        </Button>
                    </div>
                    <p className="text-gray-600 mt-1">{mockUser.bio}</p>
                    <div className="mt-4">
                        <h3 className="font-semibold text-gray-700 mb-2">My Top Skills:</h3>
                        <div className="flex flex-wrap gap-2">
                            {mockUser.mySkills.map(skill => (
                                <span key={skill} className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">My Skill Swap Posts</h2>
                <div className="space-y-6">
                    {myPosts.length > 0 ? (
                        myPosts.map(post => <PostCard key={post.id} post={post} />)
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-lg">
                            <p className="text-gray-500">You haven't posted any swaps yet.</p>
                            <Button className="mt-4">Create Your First Swap</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;