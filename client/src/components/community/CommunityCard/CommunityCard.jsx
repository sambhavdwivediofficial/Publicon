import { Link } from 'react-router-dom';
import { Avatar } from '../../common/Avatar/Avatar';
import { Button } from '../../common/Button/Button';
import { formatNumber } from '../../../utils/formatters';
import styles from './CommunityCard.module.css';

export const CommunityCard = ({ community }) => {
  return (
    <div className={styles.communityCard}>
      <Avatar src={community.avatarUrl} alt={community.name} size="lg" />
      <div className={styles.info}>
        <Link to={`/communities/${community.slug}`} className={styles.name}>
          {community.name}
        </Link>
        <p className={styles.description}>{community.description}</p>
        <span className={styles.members}>{formatNumber(community.membersCount)} members</span>
      </div>
      <Button variant="outline" size="sm">Join</Button>
    </div>
  );
};