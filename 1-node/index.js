console.log('hello world');

// module
// 模块
// CommonJS vs ES Module

// ES module
// a.js
export function sum(a, b) {}
// b.js
import { sum } from './a';

// CommonJS
// a.js
function sum(a, b) {}
module.exports = { sum }; // <-

// exports.sum = function(){}
// module.exports.sum = function(){}
// x  exports = {sum};

// b.js
const { sum } = require('./a');
