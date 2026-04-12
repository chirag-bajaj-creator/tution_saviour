require('dotenv').config();
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const app = require('./app');

// Create HTTP server for Socket.io
const httpServer = http.createServer(app);
const io = socketIo(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
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
      console.log(`✅ Server running on port ${process.env.PORT || 5000}`);
      console.log(`✅ WebSocket ready at ws://localhost:${process.env.PORT || 5000}`);
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
