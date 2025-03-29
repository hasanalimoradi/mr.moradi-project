const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// دریافت پیام‌های یک کاربر خاص
router.get('/messages/:userId', chatController.getUserMessages);

// ارسال پیام جدید
router.post('/messages', chatController.sendMessage);

module.exports = router;