import {
  BrowserRouter as Router, Routes, Route, Navigate, useLocation,
} from 'react-router-dom';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import resources from './locales/index';
import ChatPage from './components/chat/ChatPage';
import ErrorPage from './components/ErrorPage';
import LoginPage from './components/LoginPage';
import routes from './routes';
import useAuth from './hooks/useAuth';
import SocketProvider from './providers/SocketProvider';
import { addMessage } from './slices/messages';
import { addChannel, removeChannel, renameChannel } from './slices/channels';
import SignupPage from './components/SignupPage';
import NavBar from './components/NavBar';
import AuthProvider from './providers/AuthProvider';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to={routes.loginPage} state={{ from: location }} />
  );
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ru',
  });

const App = () => {
  const dispatch = useDispatch();
  const socket = io();

  socket.on('newMessage', (message) => {
    dispatch(addMessage(message));
  });

  socket.on('newChannel', (channel) => {
    dispatch(addChannel(channel));
  });

  socket.on('removeChannel', ({ id }) => {
    dispatch(removeChannel(id));
  });
  socket.on('renameChannel', ({ id, name }) => {
    dispatch(renameChannel({ id, changes: { name } }));
  });

  return (
    <AuthProvider>
      <I18nextProvider i18n={i18n}>
        <SocketProvider socket={socket}>
          <div className="d-flex flex-column h-100">
            <NavBar />
            <Router>
              <Routes>
                <Route path={routes.chatPage} element={<PrivateRoute><ChatPage /></PrivateRoute>} />
                <Route path={routes.loginPage} element={<LoginPage />} />
                <Route path={routes.signupPage} element={<SignupPage />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </Router>
          </div>
        </SocketProvider>
      </I18nextProvider>
    </AuthProvider>
  );
};

export default App;
