import { WifiOff } from 'lucide-react';
import { Button } from '../../components/common/Button/Button';
import { SEO } from '../../components/seo/SEO';
import styles from './OfflinePage.module.css';

const OfflinePage = () => {
  return (
    <>
      <SEO title="Offline" noindex />
      <div className={styles.page}>
        <WifiOff className={styles.icon} />
        <h1>No Internet Connection</h1>
        <p>Please check your connection and try again.</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    </>
  );
};
export default OfflinePage;