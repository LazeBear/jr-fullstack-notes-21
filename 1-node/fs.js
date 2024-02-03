// file system
// package 库 library - framework

// package name
const fs = require('fs');

// fs.writeFileSync('./test.txt', 'hello from node fs');

// encoder utf8 - stream
fs.readFile('./test.txt', 'utf-8', (error, data) => {
  if (error) {
    console.log(error);
    return;
  }

  console.log(data);
});
