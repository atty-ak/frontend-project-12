import {
  BrowserRouter as Router, Routes, Route, Navigate, useLocation,
} from 'react-router-dom';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import ChatPage from './components/chat/ChatPage';
import ErrorPage from './components/ErrorPage';
import LoginPage from './components/LoginPage';
import routes from './routes';
import AuthProvider from './providers/AuthProvider';
import useAuth from './hooks/useAuth';
import SocketProvider from './providers/SocketProvider';
import { addMessage } from './slices/messages';
import { addChannel, removeChannel, renameChannel } from './slices/channels';
import SignupPage from './components/SignupPage';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to={routes.loginPage} state={{ from: location }} />
  );
};

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
      <SocketProvider socket={socket}>
        <Router>
          <Routes>
            <Route path={routes.chatPage} element={<PrivateRoute><ChatPage /></PrivateRoute>} />
            <Route path={routes.loginPage} element={<LoginPage />} />
            <Route path={routes.signupPage} element={<SignupPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Router>
      </SocketProvider>
    </AuthProvider>
  );
};

export default App;
