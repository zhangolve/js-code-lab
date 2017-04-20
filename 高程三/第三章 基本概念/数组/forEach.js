/*最简单的使用forEach 的方式 */

var a=[1,2,3,4];

a.forEach((item,index)=>console.log(item,index));

// 0 1
// 1 2
// 2 3
// 3 4

/*
标准的语法格式

arr.forEach(function callback(currentValue, index, array) {
    //your iterator
}[, thisArg]);

我自己一般常用的是callback function 的前两个参数



*/

a.forEach( (item,index,array)=>console.log(item,index,array) );
//1 0 [ 1, 2, 3, 4 ]
//2 1 [ 1, 2, 3, 4 ]
//3 2 [ 1, 2, 3, 4 ]
// 4 3 [ 1, 2, 3, 4 ]

//这里的第三个参数就是相当于他的执行环境，这个a



/*
至于 forEach 中的thisArg，则是往往用在了继承之中，用于绑定作用域

MDN上面的一个例子
*/

/*这个继承类的的目的是要找到一个数组中所有元素的和
当然，我们也可以使用reduce来实现
*/
function Counter() {
  this.sum = 0;
  this.count = 0;
}
Counter.prototype.add = function(array) {
  array.forEach(function(entry) {
    this.sum += entry;
    ++this.count;
  }, this);
  // ^---- Note
};

var obj = new Counter();
obj.add([2, 5, 9]);
console.log(obj.count);
// 3 
console.log(obj.sum);
// 16