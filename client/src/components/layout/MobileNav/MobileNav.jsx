import { NavLink } from 'react-router-dom';
import { Home, Compass, Bell, User } from 'lucide-react';
import styles from './MobileNav.module.css';

export const MobileNav = () => {
  return (
    <nav className={styles.mobileNav}>
      <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''}>
        <Home size={24} />
        <span>Home</span>
      </NavLink>
      <NavLink to="/explore">
        <Compass size={24} />
        <span>Explore</span>
      </NavLink>
      <NavLink to="/notifications">
        <Bell size={24} />
        <span>Notifications</span>
      </NavLink>
      <NavLink to="/profile">
        <User size={24} />
        <span>Profile</span>
      </NavLink>
    </nav>
  );
};