// IIFE
// Immediately invoked function expression

// const moduleA = { exports: {} };
// (function (__filename, module) {
let count = 0;

function getCount() {
  return count;
}

function increaseCount() {
  count++;
}

module.exports = {
  increaseCount,
  getCount,
};
// })('/Users/mason/Desktop/jr-fullstack-notes-21/1-node/module.js', moduleA);

// moduleA.exports.increaseCount();
// moduleA.exports.increaseCount();
// moduleA.exports.increaseCount();
// moduleA.exports.increaseCount();
// moduleA.exports.increaseCount();
// console.log(moduleA.exports.getCount());
