import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { communityService } from '../../services/communityService';
import { postService } from '../../services/postService';
import { CommunityHeader } from '../../components/community/CommunityHeader/CommunityHeader';
import { PostCard } from '../../components/post/PostCard/PostCard';
import styles from './Community.module.css';

const CommunityDetailPage = () => {
  const { slug } = useParams();
  const [community, setCommunity] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    communityService.get(slug).then(setCommunity);
    postService.list({ communitySlug: slug }).then(res => setPosts(res.data));
  }, [slug]);

  if (!community) return null;

  return (
    <>
      <Helmet><title>{community.name} · Publicon</title></Helmet>
      <div className={styles.detail}>
        <CommunityHeader community={community} />
        <div className={styles.posts}>
          {posts.map(p => <PostCard key={p.id} post={p} />)}
        </div>
      </div>
    </>
  );
};

export default CommunityDetailPage;