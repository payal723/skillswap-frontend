'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa';
import { cn } from '@/utils/helpers'; // हमारे helpers.js से cn फंक्शन

export const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary', // 'primary', 'outline', 'ghost'
  size = 'md', // 'sm', 'md', 'lg'
  isLoading = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    outline: 'bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20',
    ghost: 'bg-transparent text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const disabledStyles = 'disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        disabledStyles,
        className
      )}
      {...props}
    >
      {isLoading && <FaSpinner className="animate-spin mr-2" />}
      {children}
    </motion.button>
  );
};