import { useEffect } from 'react';
import { useNotificationStore } from '../store/notificationStore';
import { notificationService } from '../services/notificationService';

export const useNotifications = () => {
  const { unreadCount, setUnreadCount } = useNotificationStore();

  useEffect(() => {
    notificationService.list({ unreadOnly: true }).then(res => setUnreadCount(res.total));
  }, []);
  // expose methods
  return { unreadCount };
};