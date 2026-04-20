import api from './api';

export const searchService = {
  global: (q, type = 'all') => api.get('/search', { params: { q, type } }),
};