const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    // res.setHeader('Content-type', 'text/html');
    // res.end('<h1> Home </h1>');
    fs.readFile(path.join(__dirname, 'home.html'), 'utf-8', (error, data) => {
      if (error) {
        console.log(error);
        return;
      }

      res.end(data);
    });
  }
  if (req.url === '/about') {
    fs.readFile(path.join(__dirname, 'about.html'), 'utf-8', (error, data) => {
      if (error) {
        console.log(error);
        return;
      }

      res.end(data);
    });
  }
  if (req.url === '/url') {
    res.end('hello from node.js server');
  }
});

server.listen(3000);

// browser address: http://localhost:3000/url
