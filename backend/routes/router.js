const express = require("express");
const path = require("path");
const router = express.Router();
const htmlPath = path.join(__dirname, "../../frontend/html");

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/index.html"));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(htmlPath, "login.html"));
});

router.get('/chatroom', (req, res) => {
    res.sendFile(path.join(htmlPath, "chatroom.html"));
});

module.exports = router;