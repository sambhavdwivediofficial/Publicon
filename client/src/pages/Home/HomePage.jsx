import { useCallback, useEffect } from 'react';
import { SEO } from '../../components/seo/SEO';
import { FeedList } from '../../components/feed/FeedList/FeedList';
import { useFeedStore } from '../../store/feedStore';
import { feedService } from '../../services/feedService';
import { useAuth } from '../../context/AuthContext';
import styles from './HomePage.module.css';

const HomePage = () => {
  const { items, appendItems, page, incrementPage, hasMore, reset } = useFeedStore();
  const { user } = useAuth();

  const fetchFeed = useCallback(
    async (pageNum) => {
      try {
        const data = await feedService.getFeed(pageNum);
        if (pageNum === 1) {
          useFeedStore.setState({
            items: data.data,
            hasMore: data.pagination?.hasNext ?? false,
          });
        } else {
          appendItems(data.data);
          useFeedStore.setState({
            hasMore: data.pagination?.hasNext ?? false,
          });
        }
      } catch (error) {
        console.error('Failed to load feed:', error);
      }
    },
    [appendItems]
  );

  useEffect(() => {
    reset();
    fetchFeed(1);
  }, [reset, fetchFeed]);

  const loadMore = () => {
    if (hasMore) {
      incrementPage();
      fetchFeed(page + 1);
    }
  };

  return (
    <>
      <SEO title="Home" description="Your personalized feed" />
      <div className={styles.container}>
        <h1 className={styles.greeting}>
          Welcome back, {user?.name?.split(' ')[0]}!
        </h1>
        <FeedList items={items} onLoadMore={loadMore} hasMore={hasMore} />
      </div>
    </>
  );
};

export default HomePage;