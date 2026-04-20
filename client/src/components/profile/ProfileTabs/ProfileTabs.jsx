import { NavLink, Outlet } from 'react-router-dom';
// import styles from './ProfileTabs.module.css';

export const ProfileTabs = ({ basePath }) => (
  <div>
    <div className={styles.tabs}>
      <NavLink to={`${basePath}`} end>Posts</NavLink>
      <NavLink to={`${basePath}/answers`}>Answers</NavLink>
      <NavLink to={`${basePath}/questions`}>Questions</NavLink>
    </div>
    <Outlet />
  </div>
);