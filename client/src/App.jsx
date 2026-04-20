import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import { RealtimeProvider } from './context/RealtimeContext';
import { OfflineDetector } from './components/common/OfflineDetector/OfflineDetector';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <NotificationProvider>
            <RealtimeProvider>
              <OfflineDetector />
              <AppRouter />
            </RealtimeProvider>
          </NotificationProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;