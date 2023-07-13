import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatPage from './components/ChatPage';
import ErrorPage from './components/ErrorPage';
import LoginPage from './components/LoginPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
