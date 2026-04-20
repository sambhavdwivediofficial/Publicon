import { useEffect, useState } from 'react';
import { notificationService } from '../../services/notificationService';
import { NotificationItem } from '../../components/notification/NotificationItem/NotificationItem';
import { Helmet } from 'react-helmet-async';
import styles from './NotificationsPage.module.css';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    notificationService.list().then(res => setNotifications(res.data));
  }, []);

  return (
    <>
      <Helmet><title>Notifications · Publicon</title></Helmet>
      <div className={styles.page}>
        <h1>Notifications</h1>
        {notifications.map(n => <NotificationItem key={n.id} notification={n} />)}
      </div>
    </>
  );
};
export default NotificationsPage;