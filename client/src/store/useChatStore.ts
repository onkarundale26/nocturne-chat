import { create } from 'zustand';

interface User {
  id: string;
  username: string;
  status: 'online' | 'offline' | 'dnd';
}

interface Message {
  id: number;
  senderId: string;
  senderName: string;
  recipientId?: string;
  text: string;
  timestamp: string;
  type: 'incoming' | 'outgoing' | 'system' | 'image';
  imageUrl?: string;
}

interface ChatState {
  currentUser: User | null;
  users: User[];
  messages: Message[];
  activeChatId: string | null;
  unreadCounts: Record<string, number>;
  setCurrentUser: (user: User | null) => void;
  setUsers: (users: User[]) => void;
  addMessage: (message: Message) => void;
  setActiveChatId: (id: string | null) => void;
  incrementUnreadCount: (userId: string) => void;
  clearUnreadCount: (userId: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  currentUser: null,
  users: [],
  messages: [],
  activeChatId: null,
  unreadCounts: {},
  setCurrentUser: (user) => set({ currentUser: user }),
  setUsers: (users) => set({ users: users }),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  setActiveChatId: (id) => set((state) => {
    // Clear unread count for the newly active chat
    const newUnreadCounts = { ...state.unreadCounts };
    if (id) delete newUnreadCounts[id];
    return { activeChatId: id, unreadCounts: newUnreadCounts };
  }),
  incrementUnreadCount: (userId) => set((state) => ({
    unreadCounts: {
      ...state.unreadCounts,
      [userId]: (state.unreadCounts[userId] || 0) + 1
    }
  })),
  clearUnreadCount: (userId) => set((state) => {
    const newUnreadCounts = { ...state.unreadCounts };
    delete newUnreadCounts[userId];
    return { unreadCounts: newUnreadCounts };
  }),
}));
