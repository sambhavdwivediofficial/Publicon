import { useState } from 'react';
import { Button } from '../../common/Button/Button';
import { followService } from '../../../services/followService';
import { useAuth } from '../../../context/AuthContext';

export const FollowButton = ({ userId, initialIsFollowing }) => {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const { user } = useAuth();

  const handleToggle = async () => {
    if (!user) return;
    try {
      if (isFollowing) {
        await followService.unfollow(userId);
      } else {
        await followService.follow(userId);
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error(error);
    }
  };

  if (user?.id === userId) return null;
  return (
    <Button variant={isFollowing ? 'outline' : 'primary'} onClick={handleToggle}>
      {isFollowing ? 'Following' : 'Follow'}
    </Button>
  );
};