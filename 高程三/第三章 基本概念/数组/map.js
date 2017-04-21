//2017.04.21

//仍然是最简单的例子

// [1,2,3,4,5].map( (cur,index,array)=>console.log(cur,index,array) );

/*
这一点上还是与forEach 很像的
1 0 [ 1, 2, 3, 4, 5 ]
2 1 [ 1, 2, 3, 4, 5 ]
3 2 [ 1, 2, 3, 4, 5 ]
4 3 [ 1, 2, 3, 4, 5 ]
5 4 [ 1, 2, 3, 4, 5 ]

*/

//例子二  返回值

// var result=[1,2,3,4,5].map( (cur,index,array)=>cur+1);  //最后的返回值也是一个数组
// var forResult=[1,2,3,4,5].forEach( (cur)=>cur )  //最后返回是一个undefined
// console.log(result);
// console.log(forResult); //undefinedd

//例子三 thisArg

// var thisScope={
// 	sum:0
// }

// var result=[1,2,3,4].forEach((cur)=>{
// 	console.log(this.sum);
//   this.sum+=cur;
//   return this.sum;
// });


//这种是错误的
//console.log(thisScope.sum);


function Counter() {
  this.sum = 0;
  this.count = 0;
}


Counter.prototype.add = function(array) {
  array.map(function(entry) {
    this.sum += entry;
    ++this.count;
  },this);
  // ^---- Note
 // this.sum=array.reduce((i,j)=>i+j);  //能够得到总数
 // this.count=array.length;  能够得到总的加的次数，效果上是一样的

};


// function test(){
// 	return this.sum+this.count
// }

// console.log("1",test.call(newScope));

//再次回顾一下，call方式的绑定


var obj = new Counter();
obj.add([2, 5, 9]);
console.log(obj.count);
// 3 
console.log(obj.sum);
//16