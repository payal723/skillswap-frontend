'use client';

import { useState, useCallback } from 'react';
import api from '@/services/api'; 
import toast from 'react-hot-toast';

export const useApi = (apiFunction) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFunction(...args);
      setData(response.data);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'An unexpected error occurred.';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err; 
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  return { data, loading, error, request };
};