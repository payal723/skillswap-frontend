'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { FaUsers, FaExchangeAlt, FaLightbulb } from 'react-icons/fa';
import { PostCard } from '@/components/posts/PostCard'; 
import { usePosts } from '@/context/PostsContext'; 

const FeatureCard = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
  >
    <div className="flex justify-center items-center mb-4 text-primary-500">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </motion.div>
);

export default function LandingPage() {
  const { posts } = usePosts(); 
  const examplePosts = (posts || []).slice(0, 3); 

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center py-20 md:py-28">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-7xl font-extrabold leading-tight
                     bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                     bg-clip-text text-transparent mb-6"
        >
          Share Your Spark.
          <br/>
          Ignite Your Project.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8"
        >
          Welcome to a creative ecosystem where your passion is the ultimate currency. 
          Trade your expertise and bring your vision to life—together.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <Link href="/register">
            <Button size="lg">Get Started for Free</Button>
          </Link>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<FaLightbulb size={40} />}
            title="Post a Skill"
            description="Share what you're an expert in, or post a skill you need help with."
            delay={0.2}
          />
          <FeatureCard 
            icon={<FaExchangeAlt size={40} />}
            title="Find a Match"
            description="Browse posts from our talented community and find the perfect partner for your project."
            delay={0.4}
          />
          <FeatureCard 
            icon={<FaUsers size={40} />}
            title="Collaborate & Grow"
            description="Connect with your match, collaborate on projects, and grow your skills together."
            delay={0.6}
          />
        </div>
      </div>

      {/* Example Posts Section */}
      <div className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Latest Skill Swaps</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {examplePosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <PostCard post={post} />
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/dashboard">
            <Button variant="outline" size="lg">Explore More</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}