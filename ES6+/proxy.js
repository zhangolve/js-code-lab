//20170516 proxy 代理学习
//用于修改原来的默认行为，属于元编程（meta programming）
//纸上得来终觉浅，得知此事要躬行
//http://es6.ruanyifeng.com/#docs/proxy  阮一峰教程手敲
var obj=new Proxy({},{
get:function(target,key,reciever){  //设置的时候三个参数
    console.log(`getting ${key}`);
    return Reflect.get(target,key,reciever);

},
set:function(target,key,value,reciever){  //取值的时候四个参数
    console.log( `setting ${key}`);
   return Reflect.set(target, key, value, reciever);

}
});

obj.count=1;
//将原来的行为进行了拦截
obj.count++;
// 有一个get 和set的过程

//always return 0
var always=new Proxy({},{
    get:function(target,property){
        return 0;
    }//,
    // set:function(target,key,value,reciever){
    //     return 0;
    // }
});

// console.log(always.count);
// console.log(always.count)

// 注意在上面这段代码之中，并不是使用set来进行设置的，而是使用get。
//配置对象有一个get方法，用来拦截对目标对象属性的访问请求。get方法的两个参数分别是目标对象和所要访问的属性。可以看到，由于拦截函数总是返回35，所以访问任何属性都得到35。

var test={
    book:'are you ok'
};
var alwaysTest=new Proxy(test,{
    get:function(target,property){
        return 0;
    }//,
    // set:function(target,key,value,reciever){
    //     return 0;
    // }
});


console.log(alwaysTest.test);
// 在上面这个例子之中，针对的特定的target是test这个对象


