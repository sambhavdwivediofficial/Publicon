import api from './api';

export const mediaService = {
  upload: (file, type = 'post') => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post(`/media/upload?type=${type}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  getToken: (mediaId) => api.get(`/media/token/${mediaId}`),
  getProxyUrl: (token) => `${import.meta.env.VITE_API_URL}/media/proxy/${token}`,
};