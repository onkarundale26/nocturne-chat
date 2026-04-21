import React from 'react';
import { Avatar } from './Avatar';
import { useChatStore } from '../store/useChatStore';

interface MessageBubbleProps {
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  type: 'incoming' | 'outgoing' | 'system' | 'image';
  imageUrl?: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ 
  senderId,
  senderName, 
  text, 
  timestamp, 
  type, 
  imageUrl 
}) => {
  const currentUser = useChatStore((state) => state.currentUser);

  if (type === 'system') {
    return (
      <div className="flex justify-center my-6">
        <span className="bg-surface-container-high text-on-surface-variant text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border border-outline-variant/10">
          {text} • {timestamp}
        </span>
      </div>
    );
  }

  // ✅ Alignment logic: If I sent it, it's on the right.
  const isOutgoing = senderId === currentUser?.id;

  return (
    <div className={`flex gap-4 mb-6 ${isOutgoing ? 'flex-row-reverse' : 'flex-row'}`}>
      {!isOutgoing && <Avatar username={senderName} size="sm" className="mt-auto" />}
      
      <div className={`max-w-[75%] lg:max-w-[60%] space-y-1 ${isOutgoing ? 'items-end' : 'items-start'}`}>
        <div className={`
          px-5 py-3.5 
          ${isOutgoing 
            ? 'primary-gradient text-on-primary rounded-2xl rounded-br-none shadow-lg shadow-primary-dim/10' 
            : 'bg-surface-container-highest text-on-surface rounded-2xl rounded-bl-none'}
        `}>
          {type === 'image' && imageUrl && (
            <div className="mb-3 rounded-xl overflow-hidden bg-black/20 p-1">
              <img src={imageUrl} alt="attachment" className="w-full h-auto rounded-lg" />
              <div className="flex items-center justify-between p-2 mt-1">
                <span className="text-[10px] opacity-60 font-bold uppercase tracking-wider truncate mr-4">Preview Attachment</span>
                <span className="material-symbols-outlined text-sm opacity-80 cursor-pointer hover:opacity-100 transition-opacity">download</span>
              </div>
            </div>
          )}
          <p className="text-[15px] leading-relaxed font-medium">{text}</p>
        </div>
        
        <div className={`flex items-center gap-2 px-1 ${isOutgoing ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
          <span className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest">{timestamp}</span>
          {isOutgoing && (
            <span className="material-symbols-outlined text-sm text-primary filled">done_all</span>
          )}
        </div>
      </div>
    </div>
  );
};
