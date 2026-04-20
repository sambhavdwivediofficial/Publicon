import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

export const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  const overlayRef = useRef();

  useEffect(() => {
    const handleEscape = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.overlay} ref={overlayRef} onClick={onClose}>
      <div
        className={`${styles.modal} ${styles[size]}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <X />
          </button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>,
    document.body
  );
};