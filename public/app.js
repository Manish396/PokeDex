const http = require('http');
const fs = require('fs');
var path = require('path');
const hostname = '127.0.0.1';
const port = 3000;
const fileContent = fs.readFileSync('public/index.html');
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type':'text/html'});
    res.end(fileContent);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});