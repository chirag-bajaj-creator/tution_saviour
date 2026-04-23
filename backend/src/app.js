const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());

const parseCorsOrigins = () => (
  process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',').map(url => url.trim()).filter(Boolean)
    : []
);

const corsOrigins = parseCorsOrigins();
const allowAllOrigins = corsOrigins.length === 0;

console.log('✅ CORS Origins configured:', corsOrigins);

app.use(cors({
  origin: allowAllOrigins ? true : corsOrigins,
  credentials: !allowAllOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Global request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] 📨 ${req.method} ${req.path}`);
  console.log('Body:', req.body);
  next();
});

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/students', require('./routes/students.routes'));
app.use('/api/batches', require('./routes/batches.routes'));
app.use('/api/attendance', require('./routes/attendance.routes'));
app.use('/api/fees', require('./routes/fees.routes'));
app.use('/api/performance', require('./routes/performance.routes'));
app.use('/api/reports', require('./routes/reports.routes'));
app.use('/api/dashboard', require('./routes/dashboard.routes'));
app.use('/api/admin', require('./routes/admin.routes'));
app.use('/api/parent', require('./routes/parent.routes'));

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

module.exports = app;
