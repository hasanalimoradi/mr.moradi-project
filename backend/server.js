const express = require('express');
const cors = require('cors');
const path = require('path');
const chatRoutes = require('./routes/chatRoutes');
const router = require('./routes/router');

const app = express();

// CORS settings
app.use(cors());

// JSON settings
app.use(express.json());

// Static files for frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes
app.use('/', router);

// API routes
app.use('/api/chat', chatRoutes);

// Main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Chat room page
app.get('/chatroom', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/chatroom.html'));
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Server Error' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});