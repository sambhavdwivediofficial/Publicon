import { Link } from 'react-router-dom';
import { Github, Twitter } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link to="/" className={styles.logo}>Publicon</Link>
            <p className={styles.tagline}>Knowledge that matters.</p>
          </div>
          <div className={styles.links}>
            <div className={styles.column}>
              <h4>Product</h4>
              <Link to="/about">About</Link>
              <Link to="/insights">Insights</Link>
              <Link to="/explore">Explore</Link>
            </div>
            <div className={styles.column}>
              <h4>Support</h4>
              <Link to="/help">Help Center</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/privacy">Privacy</Link>
            </div>
            <div className={styles.column}>
              <h4>Legal</h4>
              <Link to="/terms">Terms</Link>
              <Link to="/cookies">Cookies</Link>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} Publicon. Crafted by Sambhav Dwivedi.</p>
          <div className={styles.social}>
            <a href="https://github.com" target="_blank" rel="noreferrer"><Github size={20} /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer"><Twitter size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;