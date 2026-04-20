import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import api from './api';

// Firebase config from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase (only once)
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const authService = {
  async googleLogin() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const idToken = await result.user.getIdToken();
    const response = await api.post('/auth/google', { idToken });
    return response.data;
  },

  async getCurrentUser() {
    const response = await api.get('/users/me');
    return response.data;
  },

  logout: () => {
    auth.signOut();
  },
};