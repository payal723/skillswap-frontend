'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { usePosts } from '@/context/PostsContext'; 
import { PostCard } from '@/components/posts/PostCard';
import { SearchBar } from '@/components/search/SearchBar';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { FaPlus, FaFilter, FaList, FaTh } from 'react-icons/fa';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { SearchFilters } from '@/components/search/SearchFilters'; 

const DashboardPage = () => {
  const { user } = useAuth();
  const { posts: allPosts, loading: postsLoading, error: postsError } = usePosts();
  const router = useRouter();

  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredPosts = useMemo(() => {
    return allPosts
      .filter(post => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
          post.title.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query) ||
          post.skillsOffered?.some(skill => skill.toLowerCase().includes(query)) ||
          post.skillsNeeded?.some(skill => skill.toLowerCase().includes(query))
        );
      })
      .filter(post => {
        if (filters.category?.length > 0 && !filters.category.includes(post.category)) {
          return false;
        }
        return true;
      });
  }, [allPosts, searchQuery, filters]);


  const handleLike = (postId) => console.log(`Liking post ${postId}`);
  const handleBookmark = (postId) => console.log(`Bookmarking post ${postId}`);
  const handleShare = (postId) => console.log(`Sharing post ${postId}`);

  if (postsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header Section */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
          <div className="container mx-auto px-4 sm:px-6 py-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Welcome back, {user?.name}!
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Discover amazing skills to learn and share.
                </p>
              </div>
              <Button onClick={() => router.push('/create-post')} className="flex items-center gap-2">
                <FaPlus /> Create Post
              </Button>
            </div>
            <div className="mt-6">
              <SearchBar onSearch={setSearchQuery} />
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="container mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
                <FaFilter className="mr-2"/> Filters
              </Button>
            </div>
            <div className="flex items-center gap-2 p-1 bg-gray-200 dark:bg-gray-700 rounded-lg">
              <button onClick={() => setViewMode('grid')} className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-white dark:bg-gray-800 shadow' : ''}`}><FaTh /></button>
              <button onClick={() => setViewMode('list')} className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-white dark:bg-gray-800 shadow' : ''}`}><FaList /></button>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mb-6 overflow-hidden"
              >
                <SearchFilters filters={filters} onFiltersChange={setFilters} />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Posts Grid/List */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-xl font-semibold">No Posts Found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <PostCard post={post} onLike={handleLike} onBookmark={handleBookmark} onShare={handleShare} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;