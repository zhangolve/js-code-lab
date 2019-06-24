// 20181123
// 自己写一个小方法，生成随机数，只有当大于０.9的时候输出。
// await 的是一个promise 的resolve

// 
// function waitYou() {
//     return new Promise((resolve,reject)=>{
//         var timer = setInterval(function(){
//             const random = Math.random();
//             if(random>0.9) {
//                 resolve(random);
//                 clearInterval(timer);
//             }
//         },1000)
//     })
// }
// const go = async function() {
//     const value =  await waitYou();
//     console.log(value);
//     return value;
// }

// go();

// 如果是传统的方式呢？
//　你很难把它放到一个function 里面去。


// 20190623

function sleep(time) {
    
    return new Promise((resolve,reject)=>{
        console.log('111')
        setTimeout(function(){
            resolve(3);
        }, time)
    })
}


setTimeout(()=>{
console.log('timeout')
},0)
const doIt = async function() {
    const result=await sleep(10000);
    console.log(result, 'await');
    console.log('dododo--sleep')
}

doIt();

sleep(10000).then((resolve)=>{
    console.log(resolve);
    console.log('gogogo')
});


sleep(10000).then((resolve)=>{
    console.log(resolve);
    console.log('abc')
});
// 注意这里面的顺序。

