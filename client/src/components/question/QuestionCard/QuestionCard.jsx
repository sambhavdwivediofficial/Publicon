import { Link } from 'react-router-dom';
import { Avatar } from '../../common/Avatar/Avatar';
import { formatRelativeTime } from '../../../utils/formatters';
import styles from './QuestionCard.module.css';

export const QuestionCard = ({ question }) => {
  return (
    <div className={styles.questionCard}>
      <div className={styles.meta}>
        <Avatar src={question.author?.avatarUrl} size="sm" />
        <Link to={`/profile/${question.author?.username}`}>{question.author?.name}</Link>
        <span>{formatRelativeTime(question.createdAt)}</span>
      </div>
      <Link to={`/questions/${question.id}`} className={styles.title}>
        {question.title}
      </Link>
      <div className={styles.tags}>
        {question.tags?.map(tag => <span key={tag}>{tag}</span>)}
      </div>
    </div>
  );
};