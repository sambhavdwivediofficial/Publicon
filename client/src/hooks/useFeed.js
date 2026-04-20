import { useEffect } from 'react';
import { useFeedStore } from '../store/feedStore';
import { feedService } from '../services/feedService';

export const useFeed = () => {
  const { items, page, hasMore, setItems, appendItems, incrementPage } = useFeedStore();

  const fetchFeed = async (pageNum = 1) => {
    const res = await feedService.getFeed(pageNum);
    if (pageNum === 1) setItems(res.data);
    else appendItems(res.data);
    useFeedStore.setState({ hasMore: res.pagination.hasNext });
  };

  useEffect(() => {
    fetchFeed(1);
  }, []);

  const loadMore = () => {
    if (hasMore) {
      incrementPage();
      fetchFeed(page + 1);
    }
  };

  return { items, loadMore, hasMore };
};