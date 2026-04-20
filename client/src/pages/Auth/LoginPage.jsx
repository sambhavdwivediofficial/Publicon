import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button/Button';
import { Chrome } from 'lucide-react';
import { SEO } from '../../components/seo/SEO';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (user) navigate(from, { replace: true });
  }, [user, navigate, from]);

  const handleLogin = async () => {
    try {
      await login();
      navigate(from);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <>
      <SEO title="Sign In" />
      <div className={styles.page}>
        <div className={styles.card}>
          <h1 className={styles.title}>Welcome to Publicon</h1>
          <p className={styles.subtitle}>Join the knowledge network.</p>
          <Button onClick={handleLogin} size="lg" className={styles.googleBtn}>
            <Chrome size={20} />
            Continue with Google
          </Button>
        </div>
      </div>
    </>
  );
};
export default LoginPage;