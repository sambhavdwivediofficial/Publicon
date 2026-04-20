import { useState } from 'react';
import styles from './Tooltip.module.css';

export const Tooltip = ({ children, content, position = 'top' }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div className={`${styles.tooltip} ${styles[position]}`}>{content}</div>
      )}
    </div>
  );
};