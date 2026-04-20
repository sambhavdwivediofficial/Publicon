import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Dropdown.module.css';

export const Dropdown = ({ trigger, items, align = 'right' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div className={`${styles.menu} ${styles[align]}`}>
          {items.map((item, idx) =>
            item.divider ? (
              <hr key={idx} className={styles.divider} />
            ) : (
              <Item key={idx} {...item} onClick={() => setIsOpen(false)} />
            )
          )}
        </div>
      )}
    </div>
  );
};

const Item = ({ label, icon, to, onClick }) => {
  const content = (
    <>
      {icon && <span className={styles.icon}>{icon}</span>}
      <span>{label}</span>
    </>
  );
  if (to) {
    return (
      <Link to={to} className={styles.item} onClick={onClick}>
        {content}
      </Link>
    );
  }
  return (
    <button className={styles.item} onClick={onClick}>
      {content}
    </button>
  );
};