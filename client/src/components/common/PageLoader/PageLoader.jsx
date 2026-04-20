import { Loader2 } from 'lucide-react';
import styles from './PageLoader.module.css';

export const PageLoader = () => (
  <div className={styles.pageLoader}>
    <Loader2 className={styles.spinner} />
  </div>
);