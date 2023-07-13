import {
  BrowserRouter as Router, Routes, Route, Navigate, useLocation,
} from 'react-router-dom';
import ChatPage from './components/ChatPage';
import ErrorPage from './components/ErrorPage';
import LoginPage from './components/LoginPage';
import routes from './routes';
import AuthProvider from './providers/AuthProvider';
import useAuth from './hooks/useAuth';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to={routes.loginPage} state={{ from: location }} />
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path={routes.loginPage} element={<LoginPage />} />
        <Route path={routes.chatPage} element={<PrivateRoute><ChatPage /></PrivateRoute>} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
