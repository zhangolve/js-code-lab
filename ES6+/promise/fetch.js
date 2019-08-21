const request = require("request");

async function fetchAsync () {
    // await response of fetch call
    let response = await request('https://api.github.com');
    // only proceed once promise is resolved
    let data = await response.json();
    console.log(data);
    // only proceed once second promise is resolved
    return data;
  }
  
  // trigger async function
  // log response or catch error of fetch promise
//   fetchAsync()
//       .then(data => console.log(data))
//       .catch(reason => console.log(reason.message))

const fetch = require("node-fetch");
const url = "https://jsonplaceholder.typicode.com/posts/1";
const getData = async url => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    // console.log(json);
  } catch (error) {
    // console.log(error);
  }
};

    //  var c = ()=> {
    //      console.log('c')
    //     return getData(url);
    //  }
    //  var c = new Promise((resolve, reject)=>{
    //     setTimeout(()=>{
    //         resolve(10);
    //     },3000)
    //  })
    //   var b = async ()=> {
    //       console.log('got here');
    //       return await c()
    //   }
    //   var d= async ()=> {
    //       const a = await b();
    //       return a;
    //   }
    //   var e = async ()=> {
    //     return await c()
    //   }
    //   console.log(e);
// 如果不想用then 怎么处理。
      
    //   console.log(d())//   .then((result)=>{console.log(result)})));
    //   .then((result)=>{console.log(result)}))



// //  promise then ..  

// var func = ()=> {
// new Promise(function(resolve, reject) {
//     setTimeout(function() {
//       resolve('foo');
//     }, 300);
//   });
// }

// // await a promise 
// //   promise1.then((result)=>console.log(result));
//   var c=async ()=>{
//       await func
//   }
//   console.log(c());

  async function f(times) {

    let promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve("done!"), times)
    });
  
    let result = await promise; // wait till the promise resolves (*)
    return result;
  }
  
  // func 成功
//   var ff = async function(times) {
//       return await f(times)
//   }

//   var d= async (times, done)=>{
//     result= await ff(times);
//     done(result);
// }

// d(1000, (result)=>{
// console.log(result,'result');
// })

// 一定要返回，要有返回值
var ff = (times) =>{
    return f(times);
}

var d= async (times, done)=>{
  result= await ff(times);
  done(result);
}

d(1000, (result)=>{
console.log(result,'result');
})