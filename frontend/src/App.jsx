import {
  BrowserRouter as Router, Routes, Route, Navigate, useLocation,
} from 'react-router-dom';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import ChatPage from './components/ChatPage';
import ErrorPage from './components/ErrorPage';
import LoginPage from './components/LoginPage';
import routes from './routes';
import AuthProvider from './providers/AuthProvider';
import useAuth from './hooks/useAuth';
import SocketProvider from './providers/SocketProvider';
import { addMessage } from './slices/messages';
import { addChannel } from './slices/channels';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  console.log(auth.loggedIn);

  return (
    auth.loggedIn ? children : <Navigate to={routes.loginPage} state={{ from: location }} />
  );
};

const App = () => {
  const dispatch = useDispatch();
  const socket = io();

  socket.on('newMessage', (message) => {
    console.log(message);
    dispatch(addMessage(message));
  });

  socket.on('newChannel', (channel) => {
    dispatch(addChannel(channel));
  });

  return (
    <AuthProvider>
      <SocketProvider socket={socket}>
        <Router>
          <Routes>
            <Route path={routes.chatPage} element={<PrivateRoute><ChatPage /></PrivateRoute>} />
            <Route path={routes.loginPage} element={<LoginPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Router>
      </SocketProvider>
    </AuthProvider>
  );
};

export default App;
