import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import styles from './Button.module.css';

export const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  className = '',
  ...props
}, ref) => {
  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={`${styles.btn} ${styles[variant]} ${styles[size]} ${className}`}
      {...props}
    >
      {isLoading && <Loader2 className={styles.spinner} />}
      {children}
    </button>
  );
});
Button.displayName = 'Button';