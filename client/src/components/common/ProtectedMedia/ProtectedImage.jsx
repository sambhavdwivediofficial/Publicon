import { useEffect, useState } from 'react';
import { getProtectedMediaUrl } from '../../../utils/mediaRenderer';
import { Skeleton } from '../Skeleton/Skeleton';
import styles from './ProtectedMedia.module.css';

export const ProtectedImage = ({ mediaId, alt, className }) => {
  const [src, setSrc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;
    const fetchUrl = async () => {
      try {
        const url = await getProtectedMediaUrl(mediaId);
        if (mounted) setSrc(url);
      } catch {
        if (mounted) setError(true);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchUrl();
    return () => { mounted = false; };
  }, [mediaId]);

  if (loading) return <Skeleton className={`${styles.image} ${className}`} />;
  if (error) return <div className={`${styles.error} ${className}`}>Failed to load</div>;
  return <img src={src} alt={alt} className={`${styles.image} ${className}`} />;
};