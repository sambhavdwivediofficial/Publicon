import { useParams } from 'react-router-dom';
import { useProfile } from '../../hooks/useProfile';
import { ProfileHeader } from '../../components/profile/ProfileHeader/ProfileHeader';
import { ProfileTabs } from '../../components/profile/ProfileTabs/ProfileTabs';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../../context/AuthContext';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const { username } = useParams();
  const { user: currentUser } = useAuth();
  const { profile, loading } = useProfile(username);

  if (loading || !profile) return null;

  const isOwner = currentUser?.id === profile.id;

  return (
    <>
      <Helmet><title>{profile.name} · Publicon</title></Helmet>
      <div className={styles.profilePage}>
        <ProfileHeader profile={profile} isOwner={isOwner} />
        <ProfileTabs basePath={`/profile/${username}`} />
      </div>
    </>
  );
};
export default ProfilePage;