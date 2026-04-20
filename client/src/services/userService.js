import api from './api';

export const userService = {
  getProfile: (userId) => api.get(`/users/${userId}`),
  getProfileByUsername: (username) => api.get(`/users/username/${username}`),
  updateProfile: (data) => api.put('/users/profile', data),
  follow: (userId) => api.post(`/follows/${userId}`),
  unfollow: (userId) => api.delete(`/follows/${userId}`),
};