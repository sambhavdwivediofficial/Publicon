import { User } from 'lucide-react';
import styles from './Avatar.module.css';

export const Avatar = ({ src, alt, size = 'md', className = '' }) => {
  const sizeClass = styles[size] || '';
  if (!src) {
    return (
      <div className={`${styles.avatar} ${styles.placeholder} ${sizeClass} ${className}`}>
        <User className={styles.icon} />
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className={`${styles.avatar} ${sizeClass} ${className}`}
    />
  );
};