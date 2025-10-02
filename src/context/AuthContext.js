'use client';

import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser, registerUser, getMyProfile } from '@/services/authService';
import { mockLoginUser, mockRegisterUser, mockGetMyProfile } from '@/services/mockAuthService';
import socketService from '@/services/socketService';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const logout = useCallback(() => {
    localStorage.removeItem('skillswap_token');
    setUser(null);
    socketService.disconnect();
    router.push('/login');
  }, [router]);

  const loadUserFromToken = useCallback(async () => {
    const token = localStorage.getItem('skillswap_token');
    if (token) {
      try {
        let userData;
        if (token.startsWith('mock_token_')) {
          userData = await mockGetMyProfile();
        } else {
          userData = await getMyProfile();
        }
        setUser(userData.data);
        if (!token.startsWith('mock_token_')) {
          socketService.connect(token);
        }
      } catch (error) {
        logout();
        console.error("Session expired or token is invalid.", error);
      }
    }
    setLoading(false);
  }, [logout]);

  useEffect(() => {
    loadUserFromToken();
  }, [loadUserFromToken]);

  const login = async (credentials) => {
    try {
      let response;
      try {
        response = await loginUser(credentials);
      } catch (error) {
        // Fallback to mock service if backend is not available
        if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
          response = await mockLoginUser(credentials);
        } else {
          throw error;
        }
      }
      
      const { data } = response;
      localStorage.setItem('skillswap_token', data.token);
      setUser(data.user);
      
      if (!data.token.startsWith('mock_token_')) {
        socketService.connect(data.token);
      }
      
      toast.success(`Welcome back, ${data.user.name}!`);
      router.push('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Login failed.');
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      let response;
      try {
        response = await registerUser(userData);
      } catch (error) {
        // Fallback to mock service if backend is not available
        if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
          response = await mockRegisterUser(userData);
        } else {
          throw error;
        }
      }
      
      const { data } = response;
      localStorage.setItem('skillswap_token', data.token);
      setUser(data.user);
      
      if (!data.token.startsWith('mock_token_')) {
        socketService.connect(data.token);
      }
      
      toast.success('Welcome to SkillSwap!');
      router.push('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Registration failed.');
      throw error;
    }
  };

  const value = { user, loading, isAuthenticated: !!user, login, register, logout };

  if (loading) {
    return <div>Loading Application...</div>; 
  }
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;