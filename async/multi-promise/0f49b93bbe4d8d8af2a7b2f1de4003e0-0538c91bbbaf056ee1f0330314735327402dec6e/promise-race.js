var fetch1=()=>{
 fetch("https://jsonplaceholder.typicode.com/posts");
};
var fetch2=()=>{
 return fetch("https://jsonplaceholder.typicode.com/comments");
};




Promise.race([fetch1(),fetch("https://jsonplaceholder.typicode.com/comments")]).then( (msg)=>{console.log(msg )} )
//使用.race能够像竞赛一样优先输出最先得到返回的结果。是与promise.all很不相同的


//Promise.race([fetch1(),fetch2()]).then( (msg)=>{console.log("msg",msg )} )  //这是一种错误的写法，不能得到正确的返回值

//再看下面这个设置setTimeout的例子

var time1=function(){
  return new Promise((resolve,reject)=>{
    setTimeout(resolve,1000,1);
  })
};
//返回一个Promise，resolve是对应的then里面的代码，可以这样认为.
var time2=function(){
  return new Promise((resolve,reject)=>{
    setTimeout(resolve,5000,2);
  })
};
Promise.race([time2(),time1()]).then((i)=>{console.log(i)})

//这里要注意的是,给then后面代码的参数，应该放到setTimeout的第三个参数的位置，而不能够写成

var time1=function(){
  return new Promise((resolve,reject)=>{
    setTimeout(resolve(1),1000);
  })
};
//返回一个Promise，resolve是对应的then里面的代码，可以这样认为.
var time2=function(){
  return new Promise((resolve,reject)=>{
    setTimeout(resolve(2),5000);
  })
};
Promise.race([time2(),time1()]).then((i)=>{console.log(i)})

//至于为什么，可以看MDDN对它的解释

/*
The Promise.resolve(value) method returns a Promise object that 
is resolved with the given value. If the value is a thenable (i.e.
 has a "then" method), the returned promise will "follow" that thenable,
 adopting its eventual state; otherwise the returned promise will be fulfilled with the value.
 
Promise.resolve(value);
Promise.resolve(promise);
Promise.resolve(thenable);

*/