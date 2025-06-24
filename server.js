const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const globalErrorHandler = require('./middlewares/error.middleware');

dotenv.config({ path: './.env' });

const app = express();

// Connect to database
require('./config/db')();

// Middlewares
// Add these at the top of your middleware chain
app.use(express.json({ limit: '10mb' })); // For parsing application/json
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // For parsing form data

// CORS configuration (update with your frontend URL)
app.use(cors({
  origin: ['http://localhost:8080', 'https://comment-cal-media-flow.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const routes = require('./routes');
app.use('/api', routes);

// Error handling middleware
app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;
app.use('/',(req,res)=>{
    res.send(`backend is running on port ${PORT}`)
})

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});