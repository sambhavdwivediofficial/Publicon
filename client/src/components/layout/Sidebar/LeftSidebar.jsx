import { NavLink } from 'react-router-dom';
import { Home, Compass, Users, Lightbulb, PlusCircle } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import styles from './Sidebar.module.css';

export const LeftSidebar = () => {
  const { user } = useAuth();
  return (
    <aside className={styles.leftSidebar}>
      <nav className={styles.nav}>
        <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''}>
          <Home size={20} /> Home
        </NavLink>
        <NavLink to="/explore" className={({ isActive }) => isActive ? styles.active : ''}>
          <Compass size={20} /> Explore
        </NavLink>
        <NavLink to="/communities" className={({ isActive }) => isActive ? styles.active : ''}>
          <Users size={20} /> Communities
        </NavLink>
        <NavLink to="/insights" className={({ isActive }) => isActive ? styles.active : ''}>
          <Lightbulb size={20} /> Insights
        </NavLink>
        <NavLink to="/ask" className={styles.askBtn}>
          <PlusCircle size={20} /> Ask Question
        </NavLink>
      </nav>
      {user && (
        <div className={styles.userSection}>
          <NavLink to={`/profile/${user.username}`}>Profile</NavLink>
          <NavLink to="/settings">Settings</NavLink>
        </div>
      )}
    </aside>
  );
};