import api from './api';

export const communityService = {
  list: (params) => api.get('/communities', { params }),
  get: (slug) => api.get(`/communities/${slug}`),
  create: (data) => api.post('/communities', data),
  update: (slug, data) => api.put(`/communities/${slug}`, data),
  join: (slug) => api.post(`/communities/${slug}/join`),
  leave: (slug) => api.delete(`/communities/${slug}/leave`),
};