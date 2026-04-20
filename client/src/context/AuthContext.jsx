import { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../services/authService';
import { tokenManager } from '../utils/tokenManager';
import { useAuthStore } from '../store/authStore';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const { user, setUser, logout: storeLogout } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      const token = tokenManager.getToken();
      if (token) {
        // सिर्फ टोकन की मौजूदगी से ऑथेंटिकेटेड मानें – /me कॉल नहीं करेंगे
        setUser({ id: 'temp', name: 'User' });   // JWT में असली डेटा होगा
        useAuthStore.setState({ isAuthenticated: true });
      }
      setLoading(false);
    };
    initAuth();
  }, [setUser]);

  const login = async (idToken) => {
    const { token, user } = await authService.googleLogin(idToken);
    tokenManager.setToken(token);
    setUser(user);
    useAuthStore.setState({ isAuthenticated: true });
  };

  const logout = () => {
    tokenManager.removeToken();
    storeLogout();
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);