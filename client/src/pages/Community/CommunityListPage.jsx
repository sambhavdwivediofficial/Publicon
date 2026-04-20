import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { communityService } from '../../services/communityService';
import { CommunityCard } from '../../components/community/CommunityCard/CommunityCard';
import styles from './Community.module.css';

const CommunityListPage = () => {
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    communityService.list().then(res => setCommunities(res.data));
  }, []);

  return (
    <>
      <Helmet><title>Communities · Publicon</title></Helmet>
      <div className={styles.container}>
        <h1>Communities</h1>
        <div className={styles.grid}>
          {communities.map(c => <CommunityCard key={c.id} community={c} />)}
        </div>
      </div>
    </>
  );
};

export default CommunityListPage;