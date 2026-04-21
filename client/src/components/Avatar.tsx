import React from 'react';

interface AvatarProps {
  username: string;
  status?: 'online' | 'offline' | 'dnd';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  imageUrl?: string;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ username, status, size = 'md', imageUrl, className = "" }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-xl',
  };

  const statusColors = {
    online: 'bg-secondary',
    offline: 'bg-outline',
    dnd: 'bg-tertiary',
  };

  const getInitials = (name: string) => {
    if (!name) return '??';
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className={`relative flex-shrink-0 ${className}`}>
      <div className={`${sizeClasses[size]} rounded-2xl flex items-center justify-center font-bold text-on-primary primary-gradient border-2 border-surface-container-low`}>
        {imageUrl ? (
          <img src={imageUrl} alt={username} className="w-full h-full object-cover rounded-2xl" />
        ) : (
          getInitials(username)
        )}
      </div>
      {status && (
        <span className={`absolute bottom-0 right-0 ${size === 'xl' ? 'w-4 h-4' : 'w-3 h-3'} ${statusColors[status]} rounded-full border-2 border-surface shadow-sm`}></span>
      )}
    </div>
  );
};
