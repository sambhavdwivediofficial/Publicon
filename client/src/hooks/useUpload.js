import { useState } from 'react';
import { mediaService } from '../services/mediaService';

export const useUpload = () => {
  const [uploading, setUploading] = useState(false);
  const upload = async (file, type) => {
    setUploading(true);
    try {
      const res = await mediaService.upload(file, type);
      return res.mediaId;
    } finally {
      setUploading(false);
    }
  };
  return { upload, uploading };
};