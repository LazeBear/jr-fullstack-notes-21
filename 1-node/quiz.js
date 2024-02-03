const http = require('http');
const fs = require('fs');

const notes = require('./notes.json');

const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    res.end(JSON.stringify(notes));
    return;
  }
  if (req.url === '/' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      // body -> JSON
      // data <- JS object
      const data = JSON.parse(body);

      notes.push(data);

      // write file with notes
      fs.writeFile('./notes.json', JSON.stringify(notes), (err) => {
        if (err) {
          console.log(err);
          res.end('error');
          return;
        }
        res.end('Successfully added note');
      });
    });
  }
});

server.listen(3000, () => {
  console.log('server is listening on port 3000');
});

// debug
