import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { likeService } from '../../../services/likeService';
import { useRealtime } from '../../../context/RealtimeContext';
import { useAuth } from '../../../context/AuthContext';
import styles from './LikeButton.module.css';

export const LikeButton = ({ targetType, targetId, initialCount, initialLiked }) => {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const { socket } = useRealtime();
  const { user } = useAuth();

  useEffect(() => {
    if (!socket) return;
    const handleUpdate = (data) => {
      if (data.targetType === targetType && data.targetId === targetId) {
        setCount(data.newCount);
      }
    };
    socket.on('like_updated', handleUpdate);
    return () => socket.off('like_updated', handleUpdate);
  }, [socket, targetType, targetId]);

  const toggleLike = async () => {
    if (!user) return;
    try {
      if (liked) {
        await likeService.unlike(targetType, targetId);
        setCount(c => c - 1);
      } else {
        await likeService.like(targetType, targetId);
        setCount(c => c + 1);
      }
      setLiked(!liked);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button className={`${styles.likeButton} ${liked ? styles.liked : ''}`} onClick={toggleLike}>
      <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
      <span>{count}</span>
    </button>
  );
};