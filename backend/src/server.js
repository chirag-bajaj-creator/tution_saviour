require('dotenv').config();
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const app = require('./app');

const parseCorsOrigins = () => (
  process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',').map(url => url.trim()).filter(Boolean)
    : []
);

const corsOrigins = parseCorsOrigins();
const allowAllOrigins = corsOrigins.length === 0;

// Create HTTP server for Socket.io
const httpServer = http.createServer(app);
const io = socketIo(httpServer, {
  cors: {
    origin: allowAllOrigins ? true : corsOrigins,
    methods: ['GET', 'POST'],
    credentials: !allowAllOrigins,
  }
});

// Make io accessible to routes
app.set('io', io);

// WebSocket connection handler
io.on('connection', (socket) => {
  console.log('📱 Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('📱 Client disconnected:', socket.id);
  });
});

const connectDB = async (retries = 5) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    console.log('✅ MongoDB connected');
    httpServer.listen(process.env.PORT || 5000, () => {
      const publicUrl = process.env.PUBLIC_API_URL || `http://localhost:${process.env.PORT || 5000}`;
      console.log(`✅ Server running on port ${process.env.PORT || 5000}`);
      console.log(`✅ WebSocket ready at ${publicUrl.replace(/^http/, 'ws')}`);
    });
  } catch (err) {
    if (retries > 0) {
      console.log(`⏳ Retrying MongoDB connection... (${retries} retries left)`);
      console.log(`Error: ${err.message}`);
      setTimeout(() => connectDB(retries - 1), 5000);
    } else {
      console.error('❌ Failed to connect to MongoDB after retries');
      console.error(err);
      process.exit(1);
    }
  }
};

connectDB();
