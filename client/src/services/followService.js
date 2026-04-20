import api from './api';

export const followService = {
  follow: (userId) => api.post(`/follows/${userId}`),
  unfollow: (userId) => api.delete(`/follows/${userId}`),
  getStatus: (userId) => api.get(`/follows/${userId}/status`),
};