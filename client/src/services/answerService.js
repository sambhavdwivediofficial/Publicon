import api from './api';

export const answerService = {
  create: (questionId, body) => api.post(`/answers/${questionId}`, { body }),
  list: (questionId, params) => api.get(`/answers/question/${questionId}`, { params }),
  update: (id, body) => api.put(`/answers/${id}`, { body }),
  delete: (id) => api.delete(`/answers/${id}`),
  vote: (id, value) => api.post(`/votes/answer/${id}`, { value }),
};