import React from 'react';
import { Avatar } from './Avatar';
import { useChatStore } from '../store/useChatStore';

const Sidebar: React.FC = () => {
  const currentUser = useChatStore((state) => state.currentUser);

  const navItems = [
    { icon: 'forum', label: 'Messages', active: true },
    { icon: 'contacts', label: 'Contacts' },
    { icon: 'group', label: 'Groups' },
    { icon: 'archive', label: 'Archive' },
  ];

  return (
    <aside className="w-20 lg:w-64 bg-surface-container-low flex flex-col items-center lg:items-stretch py-6 px-4 border-r border-outline-variant/10">
      {/* Logo */}
      <div className="flex items-center gap-3 px-2 mb-10 overflow-hidden">
        <div className="w-10 h-10 rounded-xl primary-gradient flex-shrink-0 flex items-center justify-center">
          <span className="material-symbols-outlined text-on-primary filled text-xl">bolt</span>
        </div>
        <div className="hidden lg:block">
          <div className="text-xl font-black tracking-tighter primary-text-gradient leading-none">Nocturne</div>
          <div className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] mt-1">Indigo Pulse</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-4 py-3 px-4 rounded-full transition-all group ${
              item.active 
              ? 'primary-gradient text-on-primary font-bold shadow-lg shadow-primary-dim/20' 
              : 'text-on-surface-variant hover:bg-surface-bright hover:text-on-surface'
            }`}
          >
            <span className={`material-symbols-outlined ${item.active ? 'filled' : ''} group-hover:scale-110 transition-transform`}>
              {item.icon}
            </span>
            <span className="hidden lg:block text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="hidden lg:block space-y-6 mt-auto">
        <div className="bg-surface-container rounded-3xl p-5 space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-on-surface uppercase tracking-wider">
            <span>Storage</span>
            <span className="text-on-surface-variant">75%</span>
          </div>
          <div className="h-2 bg-background rounded-full overflow-hidden">
            <div className="h-full primary-gradient rounded-full w-3/4"></div>
          </div>
        </div>

        <div className="flex items-center gap-3 px-2">
          <Avatar username={currentUser?.username || 'User'} status="online" />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold text-on-surface truncate">{currentUser?.username}</div>
            <div className="text-[10px] text-on-surface-variant uppercase tracking-widest">Active Now</div>
          </div>
          <button className="text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined">settings</span>
          </button>
        </div>
      </div>

      {/* Mobile Profile Only */}
      <div className="lg:hidden mt-auto">
        <Avatar username={currentUser?.username || 'User'} status="online" size="md" />
      </div>
    </aside>
  );
};

export default Sidebar;
