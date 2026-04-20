import api from './api';

export const questionService = {
  create: (data) => api.post('/questions', data),
  get: (id) => api.get(`/questions/${id}`),
  list: (params) => api.get('/questions', { params }),
  update: (id, data) => api.put(`/questions/${id}`, data),
  delete: (id) => api.delete(`/questions/${id}`),
  vote: (id, value) => api.post(`/votes/question/${id}`, { value }),
};