/**
 * 设计一个简单的秒表 Stopwatch
 * 1. 创建一个对象 stopwatch，该对象需至少包含两个方法 start 和 stop。
 *      start应该启动计时器，stop停止计时器并打印经过的时间
 * 2. 增加一个reset方法，该方法可以重置秒表的计时器
 * 3. 增加一个getElapsedTime方法，获取经过的时间
 * 4. 增加一个recordTime方法，调用时记录当前经过时间，但是计时器继续。stopwatch 对象需要能够记录多次时间。
 * 5. 增加一个getRecordTimes，获取所有记录的时间
 * 6. 把记录的时间输出成 分钟：秒: 毫秒 的格式
 *
 */

const stopwatch = {
  counter: 0,
  counting: false,
  elapsedTime: 0,
  timeRecorder: [],
  n: 0,
  start() {
    if (!counting) {
      counter = Date.now();
      counting = true;
      console.log('counting');
    }
  },
  stop() {
    if (counting) {
      elapsedTime = Date.now() - counter;
      counting = false;
      console.log('counting stop', elapsedTime);
    }
  },
  reset() {
    counter = 0;
    n = 0;
  },
  getElapsedTime() {
    console.log(elapsedTime);
  },
  recordTime() {
    if (counting) {
      timeRecorder[n] = Date.now() - counter; // timeRecorder(n)? timeRecorder 是一个array
      console.log('counting', `recorder${n + 1}`, timeRecorder);
      n++;
    }
  },
  getRecordTimes() {
    if (counting) {
      console.log(timeRecorder);
    }
  },
  timeFormater(time) {
    console.log(time.toLocalTimeString);
  },
};

stopwatch.start();
stopwatch.start();
setTimeout(() => {
  stopwatch.stop();
}, 1000);

/**
 * 创建一个函数calculateGST，用来计算商品和服务税（Goods and Services Tax，GST
 * 该函数接收三个参数，分别是 price， category， isImported
 * 根据产品类别的不同，你需要应用不同的税率：
 * 电子产品类别（Electronics Category）：GST 10%，附加税 8%，进口税 15%
 * 服装类别（Clothing Category）：GST 10%，附加税 5%，进口税 10%
 * 图书类别（Books Category）：GST 10%，附加税 2%，进口税 5%
 * 其他类别（Others Category）：仅 GST 10%
 * 最终返回GST
 */

const DATA = {
  Electronics: { GST: 0.1, addition: 0.08, isImported: 0.15 },
  Clothing: { GST: 0.1, addition: 0.05, isImported: 0.1 },
  Books: { GST: 0.1, addition: 0.02, isImported: 0.5 },
  Others: { GST: 0.1, addition: 0, isImported: 0 },
};

const calculateGST = (price, category, isImported) => {
  return (
    (1 + category.addition) * (1 + category.GST) * (1 + category.isImported)
  );
};

/**
 * 创建一个箭头函数 filterEvens，接受一个数组参数，并返回该数组中所有偶数的新数组。
 */

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const filterEvens = (numbers) => numbers.filter((number) => number % 2 === 0);
const evenNumbers = filterEvens(numbers);
console.log(evenNumbers);

/**
 * 创建一个函数 createBook, 接收title、author 和 price作为参数，
 * 该函数需返回一个对象，这个对象需要包含传入的所有参数，并包含一个print属性
 * 该属性可以被调用，调用后返回一个字符串
 * 例如："The price for the book <ABC> written by 'Author ABC' is $100."
 *
 *  */

const createBook = (title, author, price) => {
  let obj = {};
  obj.title = title;
  obj.author = author;
  obj.price = price;
  obj.print = () => {
    return `this is ${title}, written by ${author}, cost ${price}`;
  };

  return obj;
};
/*
 * 设计一个函数 mergeArrays，接受任意数量的数组作为参数，将这些数组合并成一个新数组。
 * 考虑到可能有重复元素，确保不会重复合并相同的值。
 */

const mergeArray = (...rest) => {
  const mergedArray = rest.flat();
  return [...new Set(mergedArray)];
};

console.log(mergeArrays([1, 2, 3], [3, 4, 5], [5, 6, 7]));

/**
 * 创建一个函数 mockAPIRequest() ，该函数返回一个 Promise ，模拟API请求的行为。
 * 此 Promise 有50%的概率 resolve 并返回数据（例如："数据获取成功"），
 * 有50%的概率 reject 并返回错误消息（例如："请求出错"）。
 * 使用 .then() 处理成功的请求，使用 .catch() 捕获错误。
 */

const mockAPIRequest = () => {
  return new Promise((resolve, reject) => {
    const rate = Math.random();
    if (rate >= 0.5) {
      resolve('数据获取成功');
    } else {
      reject('请求出错');
    }
  });
};

mockAPIRequest()
  .then((result) => {
    console.log('Success', result);
  })
  .catch((error) => {
    console.log('Fail', error);
  });

async function request() {
  try {
    const result = await mockAPIRequest();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}
