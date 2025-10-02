'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import { getAllPosts, createPost } from '@/services/postService';
import { useAuth } from '@/hooks/useAuth';
import socketService from '@/services/socketService';
import toast from 'react-hot-toast';

const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const { data } = await getAllPosts();
        setPosts(data);
      } catch (err) {
        setError('Failed to load posts.');
        toast.error('Could not fetch posts.');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const handlePostCreated = (newPost) => {
        setPosts(prevPosts => [newPost, ...prevPosts]);
        toast.success(`New post created: "${newPost.title}"`);
      };
      const handlePostUpdated = (updatedPost) => {
        setPosts(prevPosts => prevPosts.map(p => p.postId === updatedPost.postId ? updatedPost : p));
      };
      const handlePostDeleted = (postId) => {
        setPosts(prevPosts => prevPosts.filter(p => p.postId !== postId));
      };

      socketService.on('postCreated', handlePostCreated);
      socketService.on('postUpdated', handlePostUpdated);
      socketService.on('postDeleted', handlePostDeleted);

      return () => {
        socketService.off('postCreated', handlePostCreated);
        socketService.off('postUpdated', handlePostUpdated);
        socketService.off('postDeleted', handlePostDeleted);
      };
    }
  }, [isAuthenticated]);

  
  const addNewPost = async (postData) => {
    try {
      const { data } = await createPost(postData);
     
      return data;
    } catch (error) {
      toast.error('Failed to create post.');
      throw error;
    }
  };

  const value = { posts, setPosts, loading, error, addNewPost };

  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (context === undefined) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
};