import api from './api';

export const feedService = {
  getFeed: (page = 1, limit = 10) => api.get('/feed', { params: { page, limit } }),
};