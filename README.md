# Nocturne Chat

A premium, glassmorphic real-time chat application built with React, Node.js, and Socket.io.

## Features
- **Real-time Messaging**: Private 1-on-1 conversations using Socket.io.
- **Premium Design**: Dark-mode aesthetic with glassmorphism and mesh backgrounds.
- **Presence Tracking**: Real-time online/offline status.
- **Dynamic Unread Counts**: Instant notification for background conversations.

## Tech Stack
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS.
- **Backend**: Node.js, Express, Socket.io.
- **State**: Zustand.

## Setup

### Prerequisites
- Node.js (v18+)
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd chat-application
   ```

2. **Setup Server**
   ```bash
   cd server
   npm install
   npm start
   ```

3. **Setup Client**
   ```bash
   cd ../client
   npm install
   npm run dev
   ```

## Development
- Backend runs on: `http://localhost:3001`
- Frontend runs on: `http://localhost:5173`
