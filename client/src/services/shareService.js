import api from './api';

export const shareService = {
  share: (targetType, targetId, platform) => api.post(`/shares/${targetType}/${targetId}`, { platform }),
};