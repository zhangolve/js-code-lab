/*20170721*/
/* 高阶函数实例 */
/* 输入有函数作为参数，输出是这个函数将前面几个参数作为参数的调用 */
/*  结合rest 进行学习 */


/*NO.1  */
/*这种方式，还是要确定好参数的个数*/
// const hof = (a,b,func) =>{
// return func(a,b);
// }

// const add = (...rest)=>{
//     return   [...rest].reduce( (i,j)=>i+j,0);
// }

// const multi = (...rest)=>{
//     return [...rest].reduce((i,j)=>i*j,1);
// }
// const addResult = hof(3,1,add);
// console.log('add',addResult);  //4

// const multiResult = hof(3,1,multi);
// console.log('multi',multiResult);  //3


/*  NO.2 */
/*  参数的个数不是确定的，但是把func放到了第一个参数的位置 */
const hof = (func,...rest) =>{
return func(...rest);
}

const add = (...rest)=>{
    return   [...rest].reduce( (i,j)=>i+j,0);
}

const multi = (...rest)=>{
    return [...rest].reduce((i,j)=>i*j,1);
}
const addResult = hof(add,3,1,2,3);
console.log('add',addResult);  //9

const multiResult = hof(multi,3,1,2,3);
console.log('multi',multiResult); //18
