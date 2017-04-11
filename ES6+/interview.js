console.time('map');
const obj={a:1,b:2,c:3};
function foo(o,arr){
	var obj={};
	arr.map(  (i)=>obj[i]=o[i]);
	return obj;
}

var result=foo(obj,["a","c"]);
console.log(result);
console.timeEnd('map');

//输出 {a:1,c:3}
//map: 9.057ms

/*

forEach() executes the callback function once for each array element;
unlike map() or reduce() it always returns the value undefined and is not chainable.
 The typical use case is to execute side effects at the end of a chain.
 */
// console.time('forEach')
// const obj={a:1,b:2,c:3};
// function foo(o,arr){
// 	var obj={};
// 	arr.forEach(  (i)=>obj[i]=o[i]);
// 	return obj;
// }

// var result=foo(obj,["a","c"]);
// console.log(result);
// console.timeEnd('forEach')
//forEach: 12.613ms



/*
Given an array of 2k integers (for some integer k), perform the following operations until the array contains only one element:

On the 1st, 3rd, 5th, etc. 
iterations (1-based) replace each pair of consecutive elements with their sum;
On the 2nd, 4th, 6th, etc. 
iterations replace each pair of consecutive elements with their product.
After the algorithm has finished, there will be a single element left in the array. Return that element.
Example

给定一个数组，这个数组有2的k次方个元素，然后开始对数组进行操作遍历。奇数次遍历的时候，每两个数都家在一起构成一个新的元素，
偶数次遍历的时候，则是两个数相乘，最后得出一个数来

For inputArray = [1, 2, 3, 4, 5, 6, 7, 8], the output should be 186.

We have [1, 2, 3, 4, 5, 6, 7, 8] -> [3, 7, 11, 15] -> [21, 165] -> [186], so the answer is 186.

*/

function arrayConversion(arr) {
  //coding and coding..
  let length=arr.length;
  copyedArr=arr;
 
  for(let i=1;i<length+1;i++)
  {
  	if(i%2!==0){
  	copyedArr=arrayAddTwo(copyedArr);
  	
  	}
  	else{
  		copyedArr=arrayMultiTwo(copyedArr);
  
  	}
  }
  return copyedArr
  
}
//var result=arrayConversion([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
//console.log(result);

/*合并相邻的两个数，*/
function arrayAddTwo(arr){
var newArr=[];	
for(var i=0;i<arr.length;i+2)
{	

var ele=arr.splice(i,2).reduce((i,j)=> i+j);
newArr.push(ele);

}
return newArr;
}



function arrayMultiTwo(arr){
var newArr=[];	
for(var i=0;i<arr.length;i+2)
{	

var ele=arr.splice(i,2).reduce((i,j)=> i*j);
newArr.push(ele);

}
return newArr;
}

