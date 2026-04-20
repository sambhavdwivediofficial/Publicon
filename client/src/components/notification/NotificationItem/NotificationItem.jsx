import { Link } from 'react-router-dom';
import { Avatar } from '../../common/Avatar/Avatar';
import { formatRelativeTime } from '../../../utils/formatters';
import styles from './NotificationItem.module.css';

export const NotificationItem = ({ notification }) => {
  return (
    <Link to={notification.targetUrl || '#'} className={styles.notificationItem}>
      <Avatar src={notification.actor?.avatarUrl} size="sm" />
      <div className={styles.content}>
        <p>{notification.message}</p>
        <span className={styles.time}>{formatRelativeTime(notification.createdAt)}</span>
      </div>
      {!notification.isRead && <span className={styles.unreadDot} />}
    </Link>
  );
};