import { useEffect, useState } from 'react';
import { insightService } from '../../services/insightService';
import { Helmet } from 'react-helmet-async';
import styles from './InsightsPage.module.css';

const InsightsPage = () => {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    insightService.getTrending().then(setTrending);
  }, []);

  return (
    <>
      <Helmet><title>Insights · Publicon</title></Helmet>
      <div className={styles.insightsPage}>
        <h1>Trending</h1>
        {/* render trending items */}
      </div>
    </>
  );
};
export default InsightsPage;