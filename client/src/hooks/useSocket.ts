import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useChatStore } from '../store/useChatStore';

const SOCKET_URL = 'http://localhost:3001';

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const { addMessage, setUsers, currentUser, setCurrentUser, activeChatId, incrementUnreadCount } = useChatStore();

  useEffect(() => {
    if (!currentUser) return;

    if (!socketRef.current) {
      socketRef.current = io(SOCKET_URL);

      socketRef.current.on('connect', () => {
        if (socketRef.current) {
          setCurrentUser({
            ...currentUser,
            id: socketRef.current.id || ''
          });
          socketRef.current.emit('join', currentUser.username);
        }
      });

      socketRef.current.on('users', (users) => {
        setUsers(users);
      });

      socketRef.current.on('receive_message', (message) => {
        addMessage(message);
        
        // ✅ Dynamic Unread Logic
        // If message is from someone else and NOT the current active chat
        if (message.senderId !== socketRef.current?.id && message.senderId !== activeChatId) {
          incrementUnreadCount(message.senderId);
        }
      });

      socketRef.current.on('message', (message) => {
        addMessage(message);
      });
    }

    return () => {};
  }, [currentUser, addMessage, setUsers, setCurrentUser, activeChatId, incrementUnreadCount]);

  const sendMessage = (text: string, recipientId: string, type: 'incoming' | 'outgoing' | 'image' = 'outgoing', imageUrl?: string) => {
    if (socketRef.current && currentUser) {
      socketRef.current.emit('send_message', {
        senderId: socketRef.current.id,
        senderName: currentUser.username,
        recipientId,
        text,
        type,
        imageUrl
      });
    }
  };

  const emitTyping = (isTyping: boolean) => {
    if (socketRef.current && currentUser) {
      socketRef.current.emit('typing', { username: currentUser.username, isTyping });
    }
  };

  return { sendMessage, emitTyping };
};
