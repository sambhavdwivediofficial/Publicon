import { Link, NavLink } from 'react-router-dom';
import { Search, Bell, User, LogOut, Settings, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useTheme } from '../../../context/ThemeContext';
import { Avatar } from '../../common/Avatar/Avatar';
import { Dropdown } from '../../common/Dropdown/Dropdown';
import styles from './Navbar.module.css';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>Publicon</Link>
        <nav className={styles.nav}>
          <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''}>Home</NavLink>
          <NavLink to="/explore" className={({ isActive }) => isActive ? styles.active : ''}>Explore</NavLink>
          <NavLink to="/communities" className={({ isActive }) => isActive ? styles.active : ''}>Communities</NavLink>
        </nav>
        <div className={styles.actions}>
          <button className={styles.iconBtn} onClick={toggleTheme}>
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <Link to="/search" className={styles.iconBtn}><Search size={20} /></Link>
          {user ? (
            <>
              <Link to="/notifications" className={styles.iconBtn}><Bell size={20} /></Link>
              <Dropdown
                trigger={
                  <button className={styles.avatarBtn}>
                    <Avatar src={user.avatarUrl} alt={user.name} size="sm" />
                  </button>
                }
                items={[
                  { label: 'Profile', icon: <User size={16} />, to: `/profile/${user.username}` },
                  { label: 'Settings', icon: <Settings size={16} />, to: '/settings' },
                  { divider: true },
                  { label: 'Logout', icon: <LogOut size={16} />, onClick: logout },
                ]}
              />
            </>
          ) : (
            <Link to="/login" className={styles.loginBtn}>Sign In</Link>
          )}
        </div>
      </div>
    </header>
  );
};