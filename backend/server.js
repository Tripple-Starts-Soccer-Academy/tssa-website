const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(compression());
app.use(morgan('combined'));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import routes
const matchesRouter = require('./routes/matches');
const eventsRouter = require('./routes/events');
const newsRouter = require('./routes/news');
const storeRouter = require('./routes/store');
const galleryRouter = require('./routes/gallery');
const scheduleRouter = require('./routes/schedule');
const stadiumRouter = require('./routes/stadium');
const clubRouter = require('./routes/club');
const trophiesRouter = require('./routes/trophies');
const uploadRouter = require('./routes/upload');
const googleDriveRouter = require('./routes/googleDrive');

// API Routes
app.use('/api/matches', matchesRouter);
app.use('/api/events', eventsRouter);
app.use('/api/news', newsRouter);
app.use('/api/store', storeRouter);
app.use('/api/gallery', galleryRouter);
app.use('/api/schedule', scheduleRouter);
app.use('/api/stadium', stadiumRouter);
app.use('/api/club', clubRouter);
app.use('/api/trophies', trophiesRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/googledrive', googleDriveRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'TSYA Backend API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 TSYA Backend Server is running on port ${PORT}`);
  console.log(`📊 API Documentation: http://localhost:${PORT}/api/health`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
