import { Link } from 'react-router-dom';
import { Avatar } from '../../common/Avatar/Avatar';
import { LikeButton } from '../../realtime/LikeButton/LikeButton';
import { formatRelativeTime } from '../../../utils/formatters';
import styles from './PostCard.module.css';

export const PostCard = ({ post }) => {
  return (
    <div className={styles.postCard}>
      <div className={styles.header}>
        <Avatar src={post.author?.avatarUrl} size="sm" />
        <div>
          <Link to={`/profile/${post.author?.username}`}>{post.author?.name}</Link>
          <span className={styles.time}>{formatRelativeTime(post.createdAt)}</span>
        </div>
      </div>
      <h3 className={styles.title}>{post.title}</h3>
      {post.body && <p className={styles.body}>{post.body}</p>}
      <div className={styles.footer}>
        <LikeButton targetType="post" targetId={post.id} initialCount={post.likesCount} />
        <Link to={`/posts/${post.id}`}>Comments ({post.commentsCount})</Link>
      </div>
    </div>
  );
};