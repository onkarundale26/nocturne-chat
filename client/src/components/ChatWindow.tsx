import React, { useEffect, useRef } from 'react';
import { Avatar } from './Avatar';
import { MessageBubble } from './MessageBubble';
import MessageInput from './MessageInput';
import { useChatStore } from '../store/useChatStore';
import { useSocket } from '../hooks/useSocket';

const ChatWindow: React.FC = () => {
  const activeChatId = useChatStore((state) => state.activeChatId);
  const users = useChatStore((state) => state.users);
  const messages = useChatStore((state) => state.messages);
  const currentUser = useChatStore((state) => state.currentUser);
  const { sendMessage, emitTyping } = useSocket();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeUser = users.find(u => u.id === activeChatId);

  // ✅ FILTER: Tight privacy logic using usernames (stable across refreshes)
  const filteredMessages = messages.filter(msg => {
    if (msg.type === 'system') return true;
    
    const isFromMe = msg.senderName === currentUser?.username;
    const isToMe = msg.recipientName === currentUser?.username;
    const isFromActiveChat = msg.senderName === activeUser?.username;
    const isToActiveChat = msg.recipientName === activeUser?.username;

    return (isFromMe && isToActiveChat) || (isFromActiveChat && isToMe);
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [filteredMessages]);

  const handleSendMessage = (text: string, type: 'incoming' | 'outgoing' | 'image' = 'outgoing', imageUrl?: string) => {
    if (activeChatId) {
      sendMessage(text, activeChatId, type, imageUrl);
    }
  };

  if (!activeChatId) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-surface space-y-6">
        <div className="w-24 h-24 rounded-3xl primary-gradient flex items-center justify-center shadow-[0_0_60px_-15px_#7e51ff] opacity-50">
          <span className="material-symbols-outlined text-6xl text-on-primary filled">forum</span>
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-extrabold text-on-surface">No Chat Selected</h2>
          <p className="text-on-surface-variant max-w-xs mx-auto">Pick a vibration from the sidebar to start architects of culture.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-surface overflow-hidden">
      {/* Header */}
      <header className="h-20 glass flex items-center justify-between px-8 z-20 border-b border-outline-variant/10">
        <div className="flex items-center gap-4">
          <Avatar username={activeUser?.username || 'User'} status="online" size="lg" />
          <div>
            <div className="text-lg font-bold text-on-surface">{activeUser?.username}</div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
              <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Online • Active Now</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {['call', 'videocam', 'info', 'more_vert'].map((icon, idx) => (
            <React.Fragment key={icon}>
              <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-bright text-on-surface-variant hover:text-primary transition-all">
                <span className="material-symbols-outlined">{icon}</span>
              </button>
              {idx === 1 && <div className="w-[1px] h-6 bg-outline-variant/20 mx-2"></div>}
            </React.Fragment>
          ))}
        </div>
      </header>

      {/* Message Feed */}
      <main className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-outline-variant/20 scrollbar-track-transparent">
        <div className="max-w-4xl mx-auto">
          {filteredMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-on-surface-variant/40">
              <span className="material-symbols-outlined text-6xl mb-4 opacity-20">forum</span>
              <p className="text-sm font-medium uppercase tracking-widest">No messages yet</p>
              <p className="text-xs mt-2 italic">Start the conversation with a vibe...</p>
            </div>
          ) : (
            filteredMessages.map((msg, index) => (
              <MessageBubble 
                key={index}
                senderId={msg.senderId}
                senderName={msg.senderName}
                text={msg.text}
                timestamp={msg.timestamp}
                type={msg.type || 'outgoing'}
                imageUrl={msg.imageUrl}
              />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input */}
      <MessageInput 
        onSendMessage={handleSendMessage}
        onTyping={emitTyping}
      />
    </div>
  );
};

export default ChatWindow;
