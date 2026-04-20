import api from './api';

export const likeService = {
  like: (targetType, targetId) => api.post(`/likes/${targetType}/${targetId}`),
  unlike: (targetType, targetId) => api.delete(`/likes/${targetType}/${targetId}`),
  getStatus: (targetType, targetId) => api.get(`/likes/${targetType}/${targetId}`),
};