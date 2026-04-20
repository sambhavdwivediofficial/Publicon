import api from './api';

export const exploreService = {
  search: (query, includeAI = true) => api.get('/explore/search', { params: { q: query, includeAI } }),
  getTopic: (slug) => api.get(`/explore/topic/${slug}`),
  getRelated: (slug) => api.get(`/explore/related/${slug}`),
};