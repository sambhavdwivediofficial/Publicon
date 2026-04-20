import { useState, useEffect } from 'react';
import { getProtectedMediaUrl } from '../utils/mediaRenderer';

export const useProtectedMedia = (mediaId) => {
  const [url, setUrl] = useState(null);
  useEffect(() => {
    if (mediaId) getProtectedMediaUrl(mediaId).then(setUrl);
  }, [mediaId]);
  return url;
};