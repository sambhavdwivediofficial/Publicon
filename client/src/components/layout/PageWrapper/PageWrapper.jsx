import styles from './PageWrapper.module.css';

export const PageWrapper = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};