import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { exploreService } from '../../services/exploreService';
import { SearchBar } from '../../components/explore/SearchBar/SearchBar';
import { AIAnswerBlock } from '../../components/explore/AIAnswerBlock/AIAnswerBlock';
import { FeedCard } from '../../components/feed/FeedCard/FeedCard';
import styles from './ExplorePage.module.css';

const ExplorePage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (query) {
      exploreService.search(query).then(setResults);
    }
  }, [query]);

  return (
    <>
      <Helmet><title>Explore · Publicon</title></Helmet>
      <div className={styles.explorePage}>
        <SearchBar />
        {query && results && (
          <>
            {results.aiAnswer && <AIAnswerBlock answer={results.aiAnswer} />}
            {results.items?.map(item => <FeedCard key={item.id} item={item} />)}
          </>
        )}
      </div>
    </>
  );
};

export default ExplorePage;