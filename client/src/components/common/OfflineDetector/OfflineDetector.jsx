import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useNetworkStatus } from '../../../hooks/useNetworkStatus';

export const OfflineDetector = () => {
  const isOnline = useNetworkStatus();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isOnline && location.pathname !== '/offline') {
      navigate('/offline', { state: { from: location.pathname } });
    }
    if (isOnline && location.pathname === '/offline') {
      const from = location.state?.from || '/';
      navigate(from, { replace: true });
    }
  }, [isOnline, location, navigate]);

  return null;
};