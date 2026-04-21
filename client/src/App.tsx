import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import JoinPage from './pages/JoinPage';
import ChatPage from './pages/ChatPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/join" element={<JoinPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/" element={<Navigate to="/join" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
