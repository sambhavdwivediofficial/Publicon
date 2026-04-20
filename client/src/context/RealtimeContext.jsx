import { createContext, useContext, useEffect, useState } from 'react';
import { realtimeService } from '../services/realtimeService';
import { useAuth } from './AuthContext';

const RealtimeContext = createContext();

export const RealtimeProvider = ({ children }) => {
  const { user } = useAuth();
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!user) return;
    const token = localStorage.getItem('publicon_session');
    if (!token) return;
    const newSocket = realtimeService.connect(token);
    setSocket(newSocket);
    setIsConnected(true);

    return () => {
      realtimeService.disconnect();
      setIsConnected(false);
    };
  }, [user]);

  return (
    <RealtimeContext.Provider value={{ socket, isConnected }}>
      {children}
    </RealtimeContext.Provider>
  );
};

export const useRealtime = () => useContext(RealtimeContext);