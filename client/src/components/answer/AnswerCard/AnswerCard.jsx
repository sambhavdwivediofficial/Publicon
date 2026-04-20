import { Link } from 'react-router-dom';
import { Avatar } from '../../common/Avatar/Avatar';
import { LikeButton } from '../../realtime/LikeButton/LikeButton';
import { AnswerVote } from '../AnswerVote/AnswerVote';
import { formatRelativeTime } from '../../../utils/formatters';
import styles from './AnswerCard.module.css';

export const AnswerCard = ({ answer }) => {
  return (
    <div className={styles.answerCard}>
      <div className={styles.header}>
        <Avatar src={answer.author?.avatarUrl} alt={answer.author?.name} size="sm" />
        <div>
          <Link to={`/profile/${answer.author?.username}`}>{answer.author?.name}</Link>
          <span className={styles.time}>{formatRelativeTime(answer.createdAt)}</span>
        </div>
      </div>
      <div className={styles.body} dangerouslySetInnerHTML={{ __html: answer.body }} />
      <div className={styles.footer}>
        <AnswerVote answerId={answer.id} initialVotes={answer.votesCount} />
        <LikeButton targetType="answer" targetId={answer.id} initialCount={answer.likesCount} />
      </div>
    </div>
  );
};