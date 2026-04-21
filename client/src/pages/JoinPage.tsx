import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChatStore } from '../store/useChatStore';

const JoinPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const setCurrentUser = useChatStore((state) => state.setCurrentUser);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        username: username,
        status: 'online' as const
      };
      setCurrentUser(newUser);
      navigate('/chat');
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-surface">
      {/* Mesh Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(at_0%_0%,rgba(126,81,255,0.15)_0px,transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(at_100%_100%,rgba(0,175,254,0.1)_0px,transparent_50%)]"></div>
      </div>

      {/* Top Nav */}
      <nav className="fixed top-0 left-0 w-full h-20 px-8 flex items-center justify-between glass z-50">
        <div className="text-2xl font-black tracking-tighter primary-text-gradient">Nocturne</div>
        <div className="hidden md:flex items-center gap-8 text-on-surface-variant text-sm font-medium">
          {['Features', 'Security', 'Download', 'Support'].map(item => (
            <a key={item} href="#" className="hover:text-on-surface transition-colors">{item}</a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button className="text-on-surface font-medium px-4 py-2 hover:bg-surface-bright rounded-full transition-all">Login</button>
          <button className="primary-gradient text-on-primary font-bold px-6 py-2 rounded-full hover:scale-[0.98] active:scale-95 transition-transform shadow-lg shadow-primary-dim/20">Sign Up</button>
        </div>
      </nav>

      {/* Center Card */}
      <div className="relative z-10 w-full max-w-md p-1 px-4 lg:px-0">
        <div className="glass-card rounded-xl p-8 lg:p-12 relative overflow-hidden">
          {/* Decorative Orbs */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 blur-3xl rounded-full"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-secondary/10 blur-3xl rounded-full"></div>

          <div className="flex flex-col items-center text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl primary-gradient flex items-center justify-center shadow-[0_0_40px_-10px_#7e51ff]">
              <span className="material-symbols-outlined text-4xl text-on-primary filled">bolt</span>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-3xl font-extrabold tracking-tight text-on-surface">Join the Conversation</h1>
              <p className="text-on-surface-variant">Secure, private, and beautifully asynchronous.</p>
            </div>

            <form onSubmit={handleJoin} className="w-full space-y-6">
              <div className="space-y-2 text-left">
                <label className="text-[10px] font-bold tracking-widest text-on-surface-variant uppercase">Username</label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">alternate_email</span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="vibe_architect"
                    className="w-full bg-surface-container-low text-on-surface rounded-full py-4 pl-12 pr-6 outline-none ring-1 ring-outline-variant/30 focus:ring-primary focus:bg-surface-container transition-all"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full primary-gradient text-on-primary font-bold py-4 rounded-full flex items-center justify-center gap-2 hover:scale-[0.98] active:scale-95 transition-transform shadow-lg shadow-primary-dim/25"
              >
                Join Chat
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </form>

            <div className="w-full flex items-center gap-4 py-2">
              <div className="h-[1px] flex-1 bg-outline-variant/15"></div>
              <span className="text-xs text-on-surface-variant font-medium">or connect with</span>
              <div className="h-[1px] flex-1 bg-outline-variant/15"></div>
            </div>

            <div className="w-full grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 py-3 px-4 bg-surface-container-high hover:bg-surface-bright rounded-full text-sm font-semibold text-on-surface transition-all border border-outline-variant/10">
                <span className="material-symbols-outlined text-lg">code</span>
                GitHub
              </button>
              <button className="flex items-center justify-center gap-2 py-3 px-4 bg-surface-container-high hover:bg-surface-bright rounded-full text-sm font-semibold text-on-surface transition-all border border-outline-variant/10">
                <span className="material-symbols-outlined text-lg">account_balance_wallet</span>
                Wallet
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 w-full h-16 px-8 flex items-center justify-between text-xs text-on-surface-variant border-t border-outline-variant/15 z-10 glass">
        <div>Nocturne © 2024 • All rights reserved</div>
        <div className="flex gap-6">
          {['Privacy Policy', 'Terms', 'Cookies', 'Contact'].map(link => (
            <a key={link} href="#" className="hover:text-on-surface transition-colors">{link}</a>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default JoinPage;
