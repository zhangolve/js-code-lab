//20170612
function test(...a){
return a[0]+a[1]
}
//undefined
test(1,2,3,4)
//3

/*20170720 rest */
function a(...args){
console.log(args.reduce((i,j)=>i*j,1))
}
undefined
function a(...args){
console.log(args.reduce((i,j)=>i*j,1))
}
//undefined
a(1,2,3,4)
//VM966:2 24
//undefined
a(1,2,3,4,5,6)
//VM966:2 720
//undefined
a(1,[1,2,3],3,4,5,6)


console.time('abc')
for(var i=0;i<100000;i++){
var a=[0,1,2,3,4,5];
a.push(6);
a=null;

}
console.timeEnd('abc')
//VM554:8 abc: 33.0ms  //node 8.264ms
//undefined
console.time('rest')
for(var i=0;i<100000;i++){
var a=[0,1,2,3,4,5];
a=[...a,6];
a=null;

}
console.timeEnd('rest')
//VM611:8 rest: 54.7ms


/*  20170721  */
/*  继续学习 */

/* NO.1*/
// const foo=(...rest)=>{
//     return rest
// }

// const result = foo(1,2,3,4);
// console.log('result',result); // [1,2,3,4] 这里需要注意的是返回的是一个数组 

/*  NO.2 */

// const foo=(...rest)=>{
//     return add(rest)
// }

// const add = (...rest)=>{
//     return rest.reduce((i,j)=>i+j,0)
// }
// const result = foo(1,2,3,4);
// console.log('result',result); // 由于传进来的参数是[1,2,3,4]，导致当reduce的时候，也是如此reduce，造成了返回结果是01,2,3,4


/*   NO.3 */
// const foo=(...rest)=>{
//     return add(...rest)
// }

// const add = (...rest)=>{
//     return rest.reduce((i,j)=>i+j,0)
// }
// const result = foo(1,2,3,4);
// console.log('result',result); // 由于传进来的参数是[1,2,3,4]的解构 ，也就又还原回了1,2,3,4，返回结果为10.
/* 这是我们最终想要的效果 */

/*  NO.4 */
/*  让前面的作为rest，最后一个参数显示出来 */
/*下面函数作用：将第一个参数与最后一个参数相加*/
const foo = (...rest,a)=>{
    return [rest][0]+a
}

const result = foo(1,2,3,4,5,6);
console.log('add',result);  //Rest parameter must be last formal parameter 所以还是不能这样做