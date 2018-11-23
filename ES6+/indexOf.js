/*20170728 */
/* indexOf  还是再看一下js的基本类型和object类型的区别 */
var a=[{'a':'b'}]
//undefined
a.indexOf({'a':'b'})
// -1
var b={'b':'c'}
// undefined
a.push(b)
// 2
// a
// [Object, Object]0: Object1: Objectlength: 2__proto__: Array(0)
a.indexOf(b)
// 1


/* 
lodash find && result
*/

var a=[{a:1,b:2},{a:2,b:3},{a:3,b:4}]
// undefined
// sw.js:1 Service Worker termination by a timeout timer was canceled because DevTools is attached.
_.result(_.find(a,{a:1}),'b')
//2



var a = [1,2,3,4,5,6,7];
var max=(arr)=>{
if(!arr){
return '不能为空'
}
var max = arr[0];
for(var i=0;i<arr.length;i++){
if(arr[i]>max){

max=arr[i]
}

}
return max;
}

// 7

Math.min(1,2,34,5)
// 1
Math.min(3,2,34,5)
// 2
Math.min([3,2,34,5])
// NaN
var a=[3,2,34,5]
// undefined
Math.min(...a)
// 2


_.uniq()
var a=[1,2,3,2,3,2,3]
// undefined
var b=[...new set(a)]
// VM2242:1 Uncaught TypeError: set is not a constructor
    // at <anonymous>:1:11
// (anonymous) @ VM2242:1
var b=[...new Set(a)]
// undefined
b
// [1, 2, 3]

a=[{a:1,b:2},{a:2,b:3},{a:3,b:4}]
// [Object, Object, Object]
a.find((item)=>item.a==1)
// Object {1, b: 2}
_.find(a,(item)=>item.a==1)
// Object {a: 1, b: 2}