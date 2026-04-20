import { Link } from 'react-router-dom';
import { MessageCircle, Eye } from 'lucide-react';
import { Avatar } from '../../common/Avatar/Avatar';
import { LikeButton } from '../../realtime/LikeButton/LikeButton';
import { ShareButton } from '../../realtime/ShareButton/ShareButton';
import { formatRelativeTime, formatNumber } from '../../../utils/formatters';
import styles from './FeedCard.module.css';

export const FeedCard = ({ item }) => {
  const isQuestion = item.type === 'question';
  const content = item;
  return (
    <article className={styles.feedCard}>
      <div className={styles.header}>
        <Avatar src={content.author?.avatarUrl} alt={content.author?.name} size="sm" />
        <div className={styles.authorInfo}>
          <Link to={`/profile/${content.author?.username}`} className={styles.authorName}>
            {content.author?.name}
          </Link>
          <span className={styles.time}>{formatRelativeTime(content.createdAt)}</span>
        </div>
      </div>
      <Link to={`/questions/${content.id}`} className={styles.content}>
        <h3 className={styles.title}>{content.title}</h3>
        <p className={styles.excerpt}>{content.body?.substring(0, 200)}...</p>
      </Link>
      <div className={styles.footer}>
        <div className={styles.stats}>
          <span><Eye size={16} /> {formatNumber(content.viewsCount)}</span>
          <span><MessageCircle size={16} /> {formatNumber(content.answersCount || content.commentsCount)}</span>
        </div>
        <div className={styles.actions}>
          <LikeButton targetType="question" targetId={content.id} initialCount={content.likesCount} />
          <ShareButton targetType="question" targetId={content.id} />
        </div>
      </div>
    </article>
  );
};