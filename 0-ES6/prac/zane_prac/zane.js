/**
 * 创建一个箭头函数 filterEvens，接受一个数组参数，并返回该数组中所有偶数的新数组。
 */
function filterEvens(array) {
  return array.filter((num) => num % 2 === 0);
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const evenNumbers = filterEvens(numbers);

console.log(evenNumbers);
