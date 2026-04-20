import { Button } from '../../common/Button/Button';
import { Avatar } from '../../common/Avatar/Avatar';
import { formatNumber } from '../../../utils/formatters';
import styles from './CommunityHeader.module.css';

export const CommunityHeader = ({ community, isMember, onJoin, onLeave }) => {
  return (
    <div className={styles.communityHeader}>
      {community.coverUrl && (
        <div className={styles.cover} style={{ backgroundImage: `url(${community.coverUrl})` }} />
      )}
      <div className={styles.info}>
        <Avatar src={community.avatarUrl} alt={community.name} size="xl" />
        <h1>{community.name}</h1>
        <p>{community.description}</p>
        <span>{formatNumber(community.membersCount)} members</span>
        <Button onClick={isMember ? onLeave : onJoin}>
          {isMember ? 'Leave' : 'Join'}
        </Button>
      </div>
    </div>
  );
};