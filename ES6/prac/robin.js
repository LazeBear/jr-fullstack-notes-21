/**
 * 设计一个简单的秒表 Stopwatch
 * 1. 创建一个对象 stopwatch，该对象需至少包含两个方法 start 和 stop。
 *      start应该启动计时器，stop停止计时器并打印经过的时间
 * 2. 增加一个reset方法，该方法可以重置秒表的计时器
 * 3. 增加一个getElapsedTime方法，获取经过的时间
 * 4. 增加一个recordTime方法，调用时记录当前经过时间，但是计时器继续。stopwatch 对象需要能够记录多次时间。
 * 5. 增加一个getRecordTimes，获取所有记录的时间
 * 6. 把记录的时间输出成 分钟：秒: 毫秒 的格式
 **/
const stopwatch = {
  startTime: 0,
  isRunning: false,
  currentTime: [],
  start() {
    if (!this.isRunning) {
      this.startTime = Date.now();
      this.isRunning = true;
      console.log('stopwatch started');
    } else {
      console.log('stopwatch already running');
    }
  },
  stop() {
    if (this.isRunning) {
      this.isRunning = false;
      console.log(
        `stopwatch stopped. Elapsed time: ${Date.now() - this.startTime}`
      );
    } else {
      console.log('stopwatch is not running');
    }
  },
  reset() {
    if (this.isRunning) {
      this.startTime = 0;
      this.isRunning = false;
      console.log('stopwatch has been reset');
    } else {
      console.log('stopwatch has already been reset');
    }
  },
  getElapsedTime() {
    if (this.isRunning) {
      console.log(`The elapsed time is : ${Date.now() - this.startTime}`);
    } else {
      console.log('stopwatch is not running');
    }
  },
  recordTime() {
    if (this.isRunning) {
      console.log(`The elapsed time is : ${Date.now()}`);
    } else {
      console.log('stopwatch is not running');
    }
  },
};
