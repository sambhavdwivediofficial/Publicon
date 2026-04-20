import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { notificationService } from '../../../services/notificationService';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import styles from './NotificationPanel.module.css';

export const NotificationPanel = ({ onClose }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    notificationService.list({ limit: 10 }).then(res => setNotifications(res.data));
  }, []);

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h3>Notifications</h3>
        <Link to="/notifications" onClick={onClose}>See all</Link>
      </div>
      {notifications.map(n => <NotificationItem key={n.id} notification={n} />)}
    </div>
  );
};