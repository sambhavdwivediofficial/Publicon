import { useEffect, useRef } from 'react';

export const useInfiniteScroll = (callback, hasMore) => {
  const observerRef = useRef();

  useEffect(() => {
    if (!hasMore) return;
    const observer = new IntersectionObserver(
      entries => { if (entries[0].isIntersecting) callback(); },
      { threshold: 0.5 }
    );
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [callback, hasMore]);

  return observerRef;
};