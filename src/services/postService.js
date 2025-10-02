import api from './api';

export const getAllPosts = (params) => {
  return api.get('/posts', { params });
};

export const getPostById = (postId) => {
  return api.get(`/posts/${postId}`);
};
export const createPost = (postData) => {
  return api.post('/posts', postData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updatePost = (postId, postData) => {
  return api.put(`/posts/${postId}`, postData);
};

export const deletePost = (postId) => {
  return api.delete(`/posts/${postId}`);
};

export const likePost = (postId) => {
  return api.post(`/posts/${postId}/like`);
};

export const bookmarkPost = (postId) => {
  return api.post(`/posts/${postId}/bookmark`);
};