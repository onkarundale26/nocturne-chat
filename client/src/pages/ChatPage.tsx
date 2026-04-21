import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ChatList from '../components/ChatList';
import ChatWindow from '../components/ChatWindow';
import { useChatStore } from '../store/useChatStore';

const ChatPage: React.FC = () => {
  const currentUser = useChatStore((state) => state.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/join');
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  return (
    <div className="flex h-screen bg-surface overflow-hidden w-full">
      <Sidebar />
      <ChatList />
      <ChatWindow />
    </div>
  );
};

export default ChatPage;
