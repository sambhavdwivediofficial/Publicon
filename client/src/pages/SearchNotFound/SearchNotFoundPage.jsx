import { useSearchParams, Link } from 'react-router-dom';
import { SearchX, ArrowLeft } from 'lucide-react';
import { SEO } from '../../components/seo/SEO';
import styles from './SearchNotFoundPage.module.css';

const SearchNotFoundPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  return (
    <>
      <SEO title={`No results for "${query}"`} noindex />
      <div className={styles.container}>
        <SearchX className={styles.icon} />
        <h1>No results for "{query}"</h1>
        <p>Try checking your spelling or use more general terms.</p>
        <div className={styles.actions}>
          <Link to="/explore" className={styles.secondary}><ArrowLeft size={16} /> Explore</Link>
          <Link to="/ask" className={styles.primary}>Ask a question</Link>
        </div>
      </div>
    </>
  );
};
export default SearchNotFoundPage;