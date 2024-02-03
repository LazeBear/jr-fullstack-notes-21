const object = {
  who: 'mason',
  cb() {
    console.log(`Hello, ${this.who}!`);
  },
};

function foo(cb) {
  cb();
}

foo(object.cb); // ??
object.cb(); // ??

// bar = object.cb
const bar = function () {};

foo(bar);

// promise chain

function createCounter() {
  const countSymbol = Symbol('count');
  return {
    [countSymbol]: 0,
    getPrivateCount() {
      return this[countSymbol];
    },
  };
}

const counter = createCounter();

counter.getPrivateCount();

// tree shaking
