const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const helmet = require('helmet');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 8000;
const htmlPath = path.join(__dirname, "../html");

// Security Middleware
app.use(helmet());
app.disable('x-powered-by');

// Basic Middleware
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static Files
app.use(express.static(path.join(__dirname, "../")));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(htmlPath, "index.html"));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(htmlPath, "login.html"));
});

app.get('/chatroom', (req, res) => {
    res.sendFile(path.join(htmlPath, "chatroom.html"));
});

// 404 Handler - Should be after all routes
app.use((req, res) => {
    res.status(404).sendFile(path.join(htmlPath, "404.html"));
});

// Error Handler - Should be last
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    console.error('Stack:', err.stack);
    res.status(500).sendFile(path.join(htmlPath, "500.html"));
});

// Server
const run = () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log(`http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

// Handle uncaught errors
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
});

module.exports = run;
