import { Button } from '../../common/Button/Button';
import { Avatar } from '../../common/Avatar/Avatar';
import { FollowButton } from '../../realtime/FollowButton/FollowButton';
import { formatNumber } from '../../../utils/formatters';
import styles from './ProfileHeader.module.css';

export const ProfileHeader = ({ profile, isOwner, onEdit }) => {
  return (
    <div className={styles.profileHeader}>
      {profile.coverUrl && <div className={styles.cover} style={{ backgroundImage: `url(${profile.coverUrl})` }} />}
      <div className={styles.info}>
        <Avatar src={profile.avatarUrl} size="xl" />
        <h1>{profile.name}</h1>
        <p className={styles.bio}>{profile.bio}</p>
        <div className={styles.stats}>
          <span><strong>{formatNumber(profile.followersCount)}</strong> followers</span>
          <span><strong>{formatNumber(profile.followingCount)}</strong> following</span>
        </div>
        {isOwner ? (
          <Button onClick={onEdit}>Edit Profile</Button>
        ) : (
          <FollowButton userId={profile.id} initialIsFollowing={profile.isFollowing} />
        )}
      </div>
    </div>
  );
};