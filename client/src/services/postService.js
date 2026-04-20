import api from './api';

export const postService = {
  list: (params) => api.get('/posts', { params }),
  get: (id) => api.get(`/posts/${id}`),
  create: (data) => api.post('/posts', data),
  update: (id, data) => api.put(`/posts/${id}`, data),
  delete: (id) => api.delete(`/posts/${id}`),
  like: (id) => api.post(`/likes/post/${id}`),
  unlike: (id) => api.delete(`/likes/post/${id}`),
};