import React, { useState, useRef } from 'react';

interface MessageInputProps {
  onSendMessage: (text: string, type?: 'incoming' | 'outgoing' | 'image', imageUrl?: string) => void;
  onTyping: (isTyping: boolean) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, onTyping }) => {
  const [text, setText] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (text.trim()) {
      onSendMessage(text);
      setText('');
      onTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    onTyping(e.target.value.length > 0);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onSendMessage('Sent an image', 'image', event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 pt-2 sticky bottom-0 glass-card bg-surface-container-low/50 backdrop-blur-xl border-t border-outline-variant/10">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="relative flex items-end gap-3 bg-surface-container-low rounded-[2rem] p-2 pr-3 ring-1 ring-outline-variant/20 focus-within:ring-primary/40 focus-within:border-primary/50 transition-all">
          <div className="flex items-center">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="p-3 text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-bright rounded-full"
            >
              <span className="material-symbols-outlined">add_circle</span>
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange}
            />
            <button className="p-3 text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-bright rounded-full">
              <span className="material-symbols-outlined">image</span>
            </button>
          </div>

          <textarea
            value={text}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            rows={1}
            className="flex-1 bg-transparent border-none outline-none py-4 text-on-surface text-[15px] resize-none max-h-32 no-scrollbar placeholder:text-on-surface-variant/40"
            style={{ height: 'auto' }}
          />

          <div className="flex items-center gap-1">
            <button 
              onClick={() => setShowEmoji(!showEmoji)}
              className="p-3 text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-bright rounded-full"
            >
              <span className="material-symbols-outlined">mood</span>
            </button>
            
            <button 
              onClick={handleSend}
              className={`
                w-10 h-10 rounded-full flex items-center justify-center transition-all
                ${text.trim() ? 'primary-gradient text-on-primary shadow-lg shadow-primary-dim/30' : 'bg-surface-container-high text-on-surface-variant cursor-not-allowed'}
                hover:scale-110 active:scale-95
              `}
            >
              <span className="material-symbols-outlined ml-1">send</span>
            </button>
          </div>
        </div>
        
        <p className="text-[9px] font-bold text-on-surface-variant/40 uppercase tracking-[0.2em] px-8">
          Press enter to send • Shift+Enter for new line
        </p>
      </div>
    </div>
  );
};

export default MessageInput;
