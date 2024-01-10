const hello = 'hello guys';

//创建一个箭头函数 filterEvens，接受一个数组参数，并返回该数组中所有偶数的新数组。

const filterEvens = (num) => {
  return num.filter((x) => x % 2 == 0);
};
//不小心rename出来了一个新的文件，请老师忽略