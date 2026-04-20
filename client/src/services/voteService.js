import api from './api';

export const voteService = {
  vote: (targetType, targetId, value) => api.post(`/votes/${targetType}/${targetId}`, { value }),
  removeVote: (targetType, targetId) => api.delete(`/votes/${targetType}/${targetId}`),
};