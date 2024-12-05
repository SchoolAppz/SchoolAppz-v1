// server.js

const http = require('http');
const fs = require('fs');
const path = require('path');

// Create the server
const server = http.createServer((req, res) => {
    // Set default response type
    res.setHeader('Content-Type', 'text/html');

    // Serve index.html on the root route
    if (req.url === '/' || req.url === '/index.html') {
        fs.readFile(path.join(__dirname, 'index.html'), 'utf-8', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end('Error loading the HTML file');
            } else {
                res.statusCode = 200;
                res.end(data);
            }
        });
    } 
    // Serve styles.css on the /styles.css route
    else if (req.url === '/styles.css') {
        fs.readFile(path.join(__dirname, 'styles.css'), 'utf-8', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end('Error loading the CSS file');
            } else {
                res.setHeader('Content-Type', 'text/css');
                res.statusCode = 200;
                res.end(data);
            }
        });
    } 
    // Serve the ISO file when requested
    else if (req.url === '/#') {
        const filePath = path.join(__dirname, '#');
        fs.exists(filePath, (exists) => {
            if (exists) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/octet-stream');
                res.setHeader('Content-Disposition', 'attachment; filename="#"');
                const fileStream = fs.createReadStream(filePath);
                fileStream.pipe(res);
            } else {
                res.statusCode = 404;
                res.end('File not found');
            }
        });
    } 
    // If the route is not found
    else {
        res.statusCode = 404;
        res.end('Page Not Found');
    }
});

// Set the port and host
const PORT = 3000;
const HOST = '10.42.15.0';

// Start the server
server.listen(PORT, HOST, () => {
    console.log(`Server is running at http://${HOST}:${PORT}`);
});
