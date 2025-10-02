'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { PostCard } from '@/components/posts/PostCard'; // Ensure this path is correct
import { Button } from '@/components/ui/Button'; // Ensure this path is correct
import { FaEdit, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendar, FaStar, FaAward, FaUsers, FaBookOpen } from 'react-icons/fa';
import { format } from 'date-fns';

export const UserProfile = ({ userId, userData, posts, reviews, onEdit }) => {
  const { user: currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('posts');

  // Check if the profile being viewed belongs to the logged-in user
  const isOwnProfile = currentUser?.id === userId;

  const stats = [
    { icon: <FaStar />, label: 'Rating', value: userData.rating || 0, color: 'text-yellow-500' },
    { icon: <FaAward />, label: 'Reviews', value: userData.totalReviews || 0, color: 'text-blue-500' },
    { icon: <FaUsers />, label: 'Exchanges', value: userData.completedExchanges || 0, color: 'text-green-500' },
    { icon: <FaBookOpen />, label: 'Posts', value: posts?.length || 0, color: 'text-purple-500' }
  ];

  const skillsToTeach = userData.skillsToTeach || [];
  const skillsToLearn = userData.skillsToLearn || [];

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8"
      >
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          {/* Avatar */}
          <div className="relative">
            <img
              src={userData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=random`}
              alt={userData.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
            />
            {userData.isOnline && (
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-gray-700"></div>
            )}
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {userData.name}
                </h1>
                {userData.bio && (
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {userData.bio}
                  </p>
                )}
              </div>
              {/* ===== UPDATED PART: Use onEdit prop ===== */}
              {isOwnProfile && (
                <Button
                  onClick={onEdit} // Use the passed function to trigger edit mode in the parent
                  variant="outline"
                  className="hidden md:flex items-center space-x-2"
                >
                  <FaEdit />
                  <span>Edit Profile</span>
                </Button>
              )}
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {userData.email && (
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <FaEnvelope className="w-4 h-4 mr-2" />
                  <span>{userData.email}</span>
                </div>
              )}
              {userData.phone && (
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <FaPhone className="w-4 h-4 mr-2" />
                  <span>{userData.phone}</span>
                </div>
              )}
              {userData.location?.city && (
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <FaMapMarkerAlt className="w-4 h-4 mr-2" />
                  <span>{userData.location.city}</span>
                </div>
              )}
              {userData.createdAt && (
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <FaCalendar className="w-4 h-4 mr-2" />
                  <span>Joined {format(new Date(userData.createdAt), 'MMMM yyyy')}</span>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className={`text-2xl font-bold mb-1 ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <div className="text-xl font-semibold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* ===== UPDATED PART: Use onEdit prop for mobile button ===== */}
        {isOwnProfile && (
          <div className="md:hidden mt-6">
            <Button
              onClick={onEdit}
              variant="outline"
              className="w-full flex items-center justify-center space-x-2"
            >
              <FaEdit />
              <span>Edit Profile</span>
            </Button>
          </div>
        )}
      </motion.div>

      {/* Skills Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
      >
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Skills</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
              <FaAward className="w-5 h-5 mr-2 text-green-500" />
              Can Teach
            </h3>
            <div className="flex flex-wrap gap-2">
              {skillsToTeach.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
              {skillsToTeach.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 text-sm">No skills listed yet</p>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
              <FaBookOpen className="w-5 h-5 mr-2 text-blue-500" />
              Wants to Learn
            </h3>
            <div className="flex flex-wrap gap-2">
              {skillsToLearn.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
              {skillsToLearn.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 text-sm">No skills listed yet</p>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'posts', label: 'Posts', icon: <FaBookOpen /> },
              { id: 'reviews', label: 'Reviews', icon: <FaStar /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
        <div className="p-6">
          <AnimatePresence mode="wait">
            {activeTab === 'posts' && (
              <motion.div
                key="posts"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {posts && posts.length > 0 ? (
                  <div className="grid gap-6">
                    {posts.map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">No posts yet</p>
                  </div>
                )}
              </motion.div>
            )}
            {activeTab === 'reviews' && (
              <motion.div
                key="reviews"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {reviews && reviews.length > 0 ? (
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center">
                            <img
                              src={review.fromUser.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.fromUser.name)}&background=random`}
                              alt={review.fromUser.name}
                              className="w-10 h-10 rounded-full object-cover mr-3"
                            />
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">
                                {review.fromUser.name}
                              </h4>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <FaStar
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {format(new Date(review.createdAt), 'MMM dd, yyyy')}
                          </span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mb-2">{review.comment}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Skill exchanged: {review.skillExchanged}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">No reviews yet</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};