const express = require("express");
const path = require("path");
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/index.html"));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/html/login.html'));
});

router.get('/chatroom', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/chatroom.html'));
});

module.exports = router;