// 20180518

// 实例1
// function foo(para) {
//     return function bar(para) {
//         return para;
//     }
// }


// const a = foo(1);

// console.log(a.toString());

// console.log(a());

//　实例2

// function foo(para) {
//     return function bar() {
//         return para;
//     }
// }


// const a = foo(1);

// console.log(a.toString());

// console.log(a());

// 上面是错误的写法，上面的高阶函数表达的意思是，返回一个函数，这个函数可以由外部再传入参数。因此，无论我们给foo如何传参，都传不到bar里面去，最终会
//  得到undefined

// 下面的写法是正确的，我们直接可以将高阶函数的参数，放到返回值里面去，总之，没有必要，也不能放到返回的函数里作为参数。

//实例3

function foo(para) {
    return function bar() {
        return para;
    }
}

var arr = [];

for(var i=0;i<2;i++) {
    const a = foo(0);
    arr.push(a);        
}
console.log(arr[0]==arr[1]);  // false 

//　实例4

function foo(para) {
    return function bar() {
        return para;
    }
}

var arr = [];

const a = foo(0);
arr.push(a);
arr.push(a);

console.log(arr[0]===arr[1]); //true;




