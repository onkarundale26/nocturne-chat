import React from 'react';
import { Avatar } from './Avatar';
import { useChatStore } from '../store/useChatStore';

const ChatList: React.FC = () => {
  const users = useChatStore((state) => state.users);
  const messages = useChatStore((state) => state.messages);
  const activeChatId = useChatStore((state) => state.activeChatId);
  const unreadCounts = useChatStore((state) => state.unreadCounts);
  const setActiveChatId = useChatStore((state) => state.setActiveChatId);
  const currentUser = useChatStore((state) => state.currentUser);

  // Filter out current user from the list
  const activeUsers = users.filter(u => u.id !== currentUser?.id);

  // Helper to get the last message for a specific user
  const getLastMessage = (userId: string) => {
    const chatMessages = messages.filter(msg => 
      (msg.senderId === currentUser?.id && msg.recipientId === userId) ||
      (msg.senderId === userId && msg.recipientId === currentUser?.id)
    );
    return chatMessages[chatMessages.length - 1];
  };

  return (
    <div className="w-80 bg-surface-container-low flex flex-col border-r border-outline-variant/10">
      <header className="px-6 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-extrabold tracking-tight text-on-surface">Messages</h2>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-surface-bright rounded-full transition-colors text-on-surface-variant">
              <span className="material-symbols-outlined">search</span>
            </button>
            <button className="p-2 hover:bg-surface-bright rounded-full transition-colors text-on-surface-variant">
              <span className="material-symbols-outlined">edit_square</span>
            </button>
          </div>
        </div>

        <div className="relative group">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors group-focus-within:text-primary">search</span>
          <input 
            type="text" 
            placeholder="Search conversations..." 
            className="w-full bg-surface-container rounded-full py-3 pl-12 pr-6 text-sm outline-none ring-1 ring-outline-variant/10 focus:ring-primary/30 transition-all placeholder:text-on-surface-variant/40"
          />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar px-3 pb-8">
        {activeUsers.length === 0 ? (
          <div className="text-center py-20 px-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-surface-container mx-auto flex items-center justify-center text-on-surface-variant">
              <span className="material-symbols-outlined">group_off</span>
            </div>
            <p className="text-xs text-on-surface-variant font-medium uppercase tracking-widest leading-relaxed">No users online yet.<br/>Wait for others to join.</p>
          </div>
        ) : (
          activeUsers.map((user) => {
            const lastMsg = getLastMessage(user.id);
            const unreadCount = unreadCounts[user.id] || 0;

            return (
              <button
                key={user.id}
                onClick={() => setActiveChatId(user.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-3xl transition-all mb-1 group ${
                  activeChatId === user.id 
                  ? 'bg-surface-container-highest shadow-sm' 
                  : 'hover:bg-surface-bright/50'
                }`}
              >
                <Avatar username={user.username} status="online" />
                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center justify-between gap-2 overflow-hidden">
                    <span className="font-bold text-on-surface truncate group-hover:text-primary transition-colors">{user.username}</span>
                    {lastMsg && (
                      <span className="text-[10px] text-on-surface-variant uppercase tracking-widest flex-shrink-0">{lastMsg.timestamp}</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-1 overflow-hidden">
                    <p className="text-xs text-on-surface-variant truncate">
                      {lastMsg ? lastMsg.text : 'Start a conversation'}
                    </p>
                    {unreadCount > 0 && (
                      <div className="w-5 h-5 primary-gradient rounded-full flex items-center justify-center text-[10px] font-black text-on-primary flex-shrink-0 shadow-sm animate-in zoom-in duration-300">
                        {unreadCount}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ChatList;
