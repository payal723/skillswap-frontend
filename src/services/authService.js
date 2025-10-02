import api from './api';

export const loginUser = (credentials) => {
  return api.post('/auth/login', credentials);
};

export const registerUser = (userData) => {
  return api.post('/auth/register', userData);
};

export const getMyProfile = () => {
  return api.get('/auth/profile');
};

export const updateProfile = (profileData) => {
  return api.put('/auth/profile', profileData);
};

export const changePassword = (passwordData) => {
  return api.put('/auth/change-password', passwordData);
};