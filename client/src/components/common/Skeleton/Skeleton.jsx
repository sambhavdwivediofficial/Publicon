import styles from './Skeleton.module.css';

export const Skeleton = ({ className, variant = 'rect', width, height }) => {
  return (
    <div
      className={`${styles.skeleton} ${styles[variant]} ${className}`}
      style={{ width, height }}
    />
  );
};