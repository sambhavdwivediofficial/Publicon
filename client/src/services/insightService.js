import api from './api';

export const insightService = {
  getTrending: (limit = 20) => api.get('/insights/trending', { params: { limit } }),
  getTopAnswers: (limit = 20) => api.get('/insights/top-answers', { params: { limit } }),
};