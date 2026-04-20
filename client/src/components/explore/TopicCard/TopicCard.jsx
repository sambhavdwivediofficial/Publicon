import { Link } from 'react-router-dom';
import styles from './TopicCard.module.css';

export const TopicCard = ({ topic }) => (
  <Link to={`/explore/topic/${topic.slug}`} className={styles.topicCard}>
    <h4>{topic.name}</h4>
    <p>{topic.description}</p>
  </Link>
);