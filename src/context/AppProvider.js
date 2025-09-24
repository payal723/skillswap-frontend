'use client';

import React, { createContext, useContext, useState } from 'react';
import { mockPosts as initialPosts } from '@/data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [posts, setPosts] = useState(initialPosts);
const [isLoggedIn, setIsLoggedIn] = useState(false);
  const addPost = (post) => {
    const newPost = {
      ...post,
      id: Date.now(), 
      createdAt: new Date().toISOString().split('T')[0],
      authorName: "John Wick", 
      authorDP: "https://i.pravatar.cc/150?u=john_wick",
    };
    setPosts([newPost, ...posts]);
  };

  const value = {
    posts,
    addPost,
    isLoggedIn,
    setIsLoggedIn,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};