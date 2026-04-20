import { mediaService } from '../services/mediaService';

export const getProtectedMediaUrl = async (mediaId) => {
  const { token } = await mediaService.getToken(mediaId);
  return mediaService.getProxyUrl(token);
};