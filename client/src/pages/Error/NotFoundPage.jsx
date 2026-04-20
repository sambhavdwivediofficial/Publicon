import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { SEO } from '../../components/seo/SEO';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => (
  <>
    <SEO title="Page Not Found" noindex />
    <div className={styles.page}>
      <h1 className={styles.code}>404</h1>
      <p className={styles.message}>Page not found</p>
      <Link to="/" className={styles.link}><Home size={18} /> Go Home</Link>
    </div>
  </>
);
export default NotFoundPage;