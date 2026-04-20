import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';
import Layout from '../components/layout/Layout/Layout';

// Pages
import HomePage from '../pages/Home/HomePage';
import LoginPage from '../pages/Auth/LoginPage';
import AskPage from '../pages/Ask/AskPage';
import QuestionDetailPage from '../pages/Question/QuestionDetailPage';
import CommunityListPage from '../pages/Community/CommunityListPage';
import CommunityDetailPage from '../pages/Community/CommunityDetailPage';
import ExplorePage from '../pages/Explore/ExplorePage';
import InsightsPage from '../pages/Insights/InsightsPage';
import ProfilePage from '../pages/Profile/ProfilePage';
import NotificationsPage from '../pages/Notifications/NotificationsPage';
import SettingsPage from '../pages/Settings/SettingsPage';
import OfflinePage from '../pages/Offline/OfflinePage';
import NotFoundPage from '../pages/Error/NotFoundPage';
import SearchNotFoundPage from '../pages/SearchNotFound/SearchNotFoundPage';

const AppRouter = () => (
  <Routes>
    <Route element={<PublicRoute />}>
      <Route path="/login" element={<LoginPage />} />
    </Route>
    <Route element={<ProtectedRoute />}>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/ask" element={<AskPage />} />
        <Route path="/questions/:id" element={<QuestionDetailPage />} />
        <Route path="/communities" element={<CommunityListPage />} />
        <Route path="/communities/:slug" element={<CommunityDetailPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/profile/:username?" element={<ProfilePage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/search/not-found" element={<SearchNotFoundPage />} />
      </Route>
    </Route>
    <Route path="/offline" element={<OfflinePage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRouter;