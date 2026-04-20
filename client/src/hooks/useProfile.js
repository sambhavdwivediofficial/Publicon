import { useState, useEffect } from 'react';
import { userService } from '../services/userService';

export const useProfile = (username) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) {
      setLoading(false);
      return;
    }
    userService
      .getProfileByUsername(username)
      .then(setProfile)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [username]);

  return { profile, loading };
};