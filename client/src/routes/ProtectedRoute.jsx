import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PageLoader } from '../components/common/PageLoader/PageLoader';

export const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  if (loading) return <PageLoader />;
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};