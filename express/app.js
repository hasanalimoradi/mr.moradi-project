const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const helmet = require('helmet');
const compression = require('compression');
const router = require('./routes/router');

const app = express();
const PORT = process.env.PORT || 8000;
const htmlPath = path.join(__dirname, "../html");

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../")));

// Routes
app.use('/', router);

// 404 Handler
app.use((req, res) => {
    res.status(404).sendFile(path.join(htmlPath, "404.html"));
});

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).sendFile(path.join(htmlPath, "500.html"));
});

// Server
const run = () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`http://localhost:${PORT}`);
    });
};

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Promise Rejection:', err);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

module.exports = run;
