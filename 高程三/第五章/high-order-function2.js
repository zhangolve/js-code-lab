
// function foo(para) {
//     return function bar(para) {
//         return para;
//     }
// }


// const a = foo(1);

// console.log(a.toString());

// console.log(a());



function foo(para) {
    return function bar() {
        return para;
    }
}


const a = foo(1);

console.log(a.toString());

console.log(a());

// 上面是错误的写法，上面的高阶函数表达的意思是，返回一个函数，这个函数可以由外部再传入参数。因此，无论我们给foo如何传参，都传不到bar里面去，最终会
//  得到undefined

// 下面的写法是正确的，我们直接可以将高阶函数的参数，放到返回值里面去，总之，没有必要，也不能放到返回的函数里作为参数。

