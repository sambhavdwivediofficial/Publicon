import api from './api';

export const tagService = {
  list: () => api.get('/tags'),
  suggest: (q) => api.get('/tags/suggest', { params: { q } }),
};