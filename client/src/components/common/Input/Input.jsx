import { forwardRef } from 'react';
import styles from './Input.module.css';

export const Input = forwardRef(({ label, error, className = '', ...props }, ref) => (
  <div className={styles.inputWrapper}>
    {label && <label className={styles.inputLabel}>{label}</label>}
    <input
      ref={ref}
      className={`${styles.inputField} ${error ? styles.inputError : ''} ${className}`}
      {...props}
    />
    {error && <span className={styles.inputErrorMessage}>{error}</span>}
  </div>
));
Input.displayName = 'Input';