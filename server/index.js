const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send('Nocturne Backend Server is running. Connection is via Socket.io.');
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    // Allow localhost for dev and regex for production domains
    origin: ["http://localhost:5173", /\.vercel\.app$/, /\.railway\.app$/],
    methods: ["GET", "POST"],
    credentials: true
  }
});

let users = [];

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join', (username) => {
    // Leave any previous identity rooms (shouldn't happen often but good practice)
    socket.rooms.forEach(room => {
      if (room.startsWith('user:')) socket.leave(room);
    });
    
    // Join a private room named by username
    socket.join(`user:${username}`);
    
    const user = { id: socket.id, username, status: 'online' };
    
    // Remove any existing user entries with this username (prevents duplicates)
    users = users.filter(u => u.username !== username);
    users.push(user);
    
    io.emit('users', users);
    socket.broadcast.emit('message', {
      id: Date.now(),
      senderId: 'system',
      senderName: 'System',
      text: `${username} joined the chat.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'system'
    });
  });

  socket.on('send_message', (data) => {
    const { text, recipientId, recipientName, senderName, type, imageUrl } = data;
    
    const message = {
      id: Date.now(),
      senderId: socket.id,
      senderName,
      recipientId,
      recipientName, // Store the name for easier filtering
      text,
      type,
      imageUrl,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    // ✅ DELIVERY: Send exclusively to the recipient's identity room
    if (recipientName) {
      io.to(`user:${recipientName}`).emit('receive_message', message);
    }
    
    // ✅ DELIVERY: Send back to the sender
    socket.emit('receive_message', message);
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('user_typing', data);
  });

  socket.on('disconnect', () => {
    const user = users.find(u => u.id === socket.id);
    if (user) {
      users = users.filter(u => u.id !== socket.id);
      io.emit('users', users);
      socket.broadcast.emit('message', {
        id: Date.now(),
        senderId: 'system',
        senderName: 'System',
        text: `${user.username} left the chat.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'system'
      });
    }
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
