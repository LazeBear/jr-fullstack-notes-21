const filterEvens = (numbers) => numbers.filter((num) => num % 2 === 0);

function createBook(title, author, price) {
  let obj = {};
  obj.title = title;
  obj.author = author;
  obj.price = price;
  return obj;
}
//merge

function mergeArrays(...arrays) {
  const merged = arrays.reduce(
    (accumulator, currentValue) => accumulator.concat(currentValue),
    []
  );
  const uniqueValues = new Set(merged);

  return Array.from(uniqueValues);
}

//API request
function mockAPIRequest() {
  return new Promise((resolve, reject) => {
    setTimeOut(() => {
      const randomNum = Math.random();
      if (randomNum > 0.5) {
        resolve('数据获取成功');
      } else {
        reject('数据获取失败');
      }
    }, 2000);
  });
}
/**
 * 创建一个函数calculateGST，用来计算商品和服务税（Goods and Services Tax，GST
 * 该函数接收三个参数，分别是 price， category， isImported
 * 根据产品类别的不同，你需要应用不同的税率：
 * 电子产品类别（Electronics Category）：GST 10%，附加税 8%，进口税 15%
 * 服装类别（Clothing Category）：GST 10%，附加税 5%，进口税 10%
 * 图书类别（ BooksCategory）：GST 10%，附加税 2%，进口税 5%
 * 其他类别（Others Category）：仅 GST 10%
 * 最终返回GST
 */

// isImported 是boolean类型
function calculateGST(price, category, isImported) {
  if (category === 'Electronics') {
    if (isImported == false) {
      return price * 0.18;
    } else {
    }
  } else if (category === 'Clothing') {
    if (isImported == false) {
    } else {
    }
  } else if (category === 'Books') {
    if (isImported == false) {
    } else {
    }
  } else {
    return price * 0.1;
  }
}
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

// 创建一个对象 stopwatch, 不需要建一个新的function
const stopWatch = {
  startTime: 0,
  isRunning: false,
  reset() {
    if (this.isRunning === true) {
      this.startTime = Date.now();
    } else {
      this.startTime = 0;
      console.log();
    }
  },
  getElapsedTime() {
    console.log(`Pass time+ ${Date.now() - this.startTime}`);
  },
};
