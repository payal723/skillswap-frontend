'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { ImageGallery } from '@/components/ui/ImageGallery';
import { FaHeart, FaComment, FaShare, FaBookmark, FaStar } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';

export const PostCard = ({ post, onLike, onBookmark, onShare }) => {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(post.isLiked || false); // You might get this from API later
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked || false);
  const [likesCount, setLikesCount] = useState(post.likesCount || 0);

  // ... (handleLike, handleBookmark, handleShare functions remain the same) ...

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <Link href={`/profile/${post.authorId}`} className="flex items-center group">
            <img
              src={post.authorDP || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.authorName)}`}
              alt={post.authorName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="ml-3">
              <h4 className="font-semibold text-gray-900 dark:text-white">{post.authorName}</h4>
              {/* You might need to fetch author's rating separately or have it in the post object */}
            </div>
          </Link>
          <button onClick={() => onBookmark(post.postId)} className="...">
            <FaBookmark />
          </button>
        </div>

        {/* Content */}
        <Link href={`/post/${post.postId}`}>
          <h3 className="text-xl font-bold mb-2">{post.title}</h3>
          <p className="text-gray-600 line-clamp-3 mb-4">{post.description}</p>
        </Link>
        
        {/* Skills */}
        <div className="mb-4">
          {post.skillsOffered?.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-1">Offering:</p>
              <div className="flex flex-wrap gap-2">
                {post.skillsOffered.map(skill => <span key={skill} className="skill-tag-offering">{skill}</span>)}
              </div>
            </div>
          )}
          {post.skillsNeeded?.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-medium mb-1">Seeking:</p>
              <div className="flex flex-wrap gap-2">
                {post.skillsNeeded.map(skill => <span key={skill} className="skill-tag-seeking">{skill}</span>)}
              </div>
            </div>
          )}
        </div>

        {/* Images */}
        {post.images && post.images.length > 0 && (
          <div className="mb-4">
            <ImageGallery images={post.images} />
          </div>
        )}
        
        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t dark:border-gray-700">
           {/* Like, Comment, Share buttons here... */}
           <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
        </div>
      </div>
    </motion.div>
  );
};