// Import required packages
const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Get messages for a user
router.get('/messages/:userId', chatController.getUserMessages);

// Send a message
router.post('/send', chatController.sendMessage);

// Export router
module.exports = router;