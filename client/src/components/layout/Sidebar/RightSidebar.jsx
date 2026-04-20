import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { communityService } from '../../../services/communityService';
import { insightService } from '../../../services/insightService';
import { Avatar } from '../../common/Avatar/Avatar';
import styles from './Sidebar.module.css';

export const RightSidebar = () => {
  const [trending, setTrending] = useState([]);
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const [trendRes, commRes] = await Promise.all([
          insightService.getTrending(5),
          communityService.list({ limit: 5, sort: 'popular' }),
        ]);
        setTrending(trendRes);
        setCommunities(commRes.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);

  return (
    <aside className={styles.rightSidebar}>
      <section className={styles.section}>
        <h3>Trending</h3>
        {trending.map((item) => (
          <Link to={`/questions/${item.id}`} key={item.id} className={styles.trendItem}>
            {item.title}
          </Link>
        ))}
      </section>
      <section className={styles.section}>
        <h3>Popular Communities</h3>
        {communities.map((c) => (
          <Link to={`/communities/${c.slug}`} key={c.id} className={styles.commItem}>
            <Avatar src={c.avatarUrl} alt={c.name} size="sm" />
            <span>{c.name}</span>
          </Link>
        ))}
      </section>
      <footer className={styles.footer}>
        <Link to="/privacy">Privacy</Link> · <Link to="/terms">Terms</Link>
        <p>© Publicon · Sambhav Dwivedi</p>
      </footer>
    </aside>
  );
};