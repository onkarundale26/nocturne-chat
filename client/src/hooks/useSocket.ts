import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useChatStore } from '../store/useChatStore';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001';

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const { addMessage, setUsers, currentUser, setCurrentUser, activeChatId, incrementUnreadCount } = useChatStore();

  // Use a ref to keep track of activeChatId for the socket listener without causing stale closures
  const activeChatIdRef = useRef<string | null>(null);
  useEffect(() => {
    activeChatIdRef.current = activeChatId;
  }, [activeChatId]);

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
        
        // Use the ref here to always have the latest activeChatId
        if (message.senderId !== socketRef.current?.id && message.senderId !== activeChatIdRef.current) {
          incrementUnreadCount(message.senderId);
        }
      });

      socketRef.current.on('message', (message) => {
        addMessage(message);
      });
    }

    return () => {};
  }, [currentUser, addMessage, setUsers, setCurrentUser, incrementUnreadCount]);

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
