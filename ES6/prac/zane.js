/**
 * 创建一个箭头函数 filterEvens，接受一个数组参数，并返回该数组中所有偶数的新数组。
 */

function filterEvens(array) {
  return array.filter((num) => num % 2 === 0);
}

const filterEvens2 = (numbers) => numbers.filter((number) => number % 2 === 0);

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const evenNumbers = filterEvens(numbers);

console.log(evenNumbers);

// typo error
// const filterEvens = (numbers) => numbers.filter((number) => number % 2 === 0);
//

/**
 * 创建一个函数 createBook, 接收title、author 和 price作为参数，
 * 该函数需返回一个对象，这个对象需要包含传入的所有参数，并包含一个print属性
 * 该属性可以被调用，调用后返回一个字符串
 * 例如："The price for the book <ABC> written by 'Author ABC' is $100."
 *
 */

const createBook = (title, author, price) => ({
  title,
  author,
  price,
  price: () =>
    `The price for the book <${title}> written by '${author}' is ${price}.`,
});

/**
 * 设计一个函数 mergeArrays，接受任意数量的数组作为参数，将这些数组合并成一个新数组。
 * 考虑到可能有重复元素，确保不会重复合并相同的值。
 */
function mergeArrays(...arrays) {
  const result = new Set();
  for (const array of arrays) {
    for (const num of array) {
      result.add(num);
    }
  }
  return [...result];
}

console.log(mergeArrays([1, 2, 3], [3, 4, 5], [5, 6, 7]));

/**
 function mergeArrays(...arrays){
    const mergedArray = [].concat(...arrays);
    return [...new Set(mergedArray)];
  }

function mergeArrays(...arrays) {
  return [...new Set(arrays.flat())];
}


**/

/**
 * 创建一个函数 mockAPIRequest() ，该函数返回一个 Promise ，模拟API请求的行为。
 * 此 Promise 有50%的概率 resolve 并返回数据（例如："数据获取成功"），
 * 有50%的概率 reject 并返回错误消息（例如："请求出错"）。
 * 使用 .then() 处理成功的请求，使用 .catch() 捕获错误。
 */

function mockAPIRequest() {
  let randomNum = Math.random(); // <-- 变量声明的关键字漏了
  return new Promise((resolve, reject) => {
    if (randomNum < 0.5) {
      resolve('data catched');
    } else {
      reject('error:data catch fail');
    }
  });
}

mockAPIRequest()
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

/**
function mockAPIRequest() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.5 ? resolve('数据获取成功') : reject('请求出错');
    }, 1000);
  });
}
**/

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

function calculateGST(price, category = 'others', isImported) {
  let GST = 0.1;
  let addT = 0;
  let importT = 0;
  switch (category) {
    case 'Electronics':
      addT = 0.08;
      impotT = isImported ? 0.15 : 0;
      break;
    case 'Clothing':
      addT = 0.05;
      impotT = isImported ? 0.1 : 0;
      break;
    case 'Books':
      addT = 0.02;
      impotT = isImported ? 0.05 : 0;
      break;
    default:
      addT = 0.02;
      impotT = isImported ? 0.05 : 0;
      break;
  }

  const totalT = GST + addT + importT;
  return price * totalT;
}

console.log(calculateGST(100));
console.log(calculateGST(200, 'Electronics', true));

/**
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

 */

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
 * 挑战：
 * 1. 增加相应的html代码，html中应该包含
 *    一个显示时间的div，
 *    三个按钮，分别对应start，record，stop
 *    一个显示record time的div
 * 2. 把 stopwatch 和 html 通过js关联起来
 */
const stopWatch = {
  startTime: null,
  endTime: null,
  duration: 0,
  records: [],
  isRunning: false,

  start() {
    if (this.isRunning) throw new Error('Stopwatch already started.');

    this.running = true;
    this.startTime = new Date();
  },
  stop() {
    if (!this.isRunning) throw new Error('Stopwatch is not started.');

    this.running = false;
    this.endTime = new Date();

    const seconds = (this.endTime.getTime() - this.startTime.gettime()) / 1000;
    this.duration = seconds;
    console.log(`duration time: ${seconds}.`);
  },

  reset() {
    this.startTime = null;
    this.endTime = null;
    this.running = false;
    this.duration = 0;
    this.record = [];
  },

  getElapseTime() {
    return this.formaTime(this.duration);
  },
};

stopWatch.start();
stopWatch.stop();
