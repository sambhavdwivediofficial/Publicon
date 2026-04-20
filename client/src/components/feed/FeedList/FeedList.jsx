import { useRef } from 'react';
import { FeedCard } from '../FeedCard/FeedCard';
import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll';
import { Skeleton } from '../../common/Skeleton/Skeleton';
import styles from './FeedList.module.css';

export const FeedList = ({ items, onLoadMore, hasMore, loading }) => {
  const loadMoreRef = useRef();
  useInfiniteScroll(() => {
    if (hasMore && !loading) onLoadMore();
  }, hasMore);

  return (
    <div className={styles.feedList}>
      {items.map((item) => (
        <FeedCard key={item.id} item={item} />
      ))}
      {loading && (
        <>
          <Skeleton className={styles.skeleton} height="120px" />
          <Skeleton className={styles.skeleton} height="120px" />
        </>
      )}
      <div ref={loadMoreRef} style={{ height: 1 }} />
    </div>
  );
};