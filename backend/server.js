// Import required packages
const express = require('express');
const cors = require('cors');
const path = require('path');

// Create express app
const app = express();

// Basic settings
app.use(cors());  // Allow requests from other domains
app.use(express.json());  // Parse JSON data in requests
app.use(express.static(path.join(__dirname, '../frontend')));  // Serve frontend files

// Import routes
const chatRoutes = require('./routes/chatRoutes');
const router = require('./routes/router');

// Use routes
app.use('/', router);  // Main routes
app.use('/api/chat', chatRoutes);  // Chat API routes

// Serve main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Serve chat page
app.get('/chatroom', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/chatroom.html'));
});

// Handle errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Server Error' });
});

// Start server
const PORT = 3000;  // Server port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});