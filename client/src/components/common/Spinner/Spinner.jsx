import { Loader2 } from 'lucide-react';
import styles from './Spinner.module.css';

export const Spinner = ({ size = 'md', className }) => {
  return <Loader2 className={`${styles.spinner} ${styles[size]} ${className}`} />;
};