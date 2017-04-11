var bar = function(){
    console.log(this.x);
}
var foo = {
    x:3
}
var sed = {
    x:4
}
var func = bar;
func(); // undefined 这很正常了，因为没有在全局定义变量x的值

//既然全局没有变量x，我们通过bind方法对改变this的指向

func=bar.bind(foo); //bind内的是需要改变到的指向作用域

//func(); //结果是 3

func.bind(sed);

//func();//结果仍然是3 ，并没有进行二次绑定
 
//原因是，在Javascript中，多次 bind() 是无效的。更深层次的原因，
// bind() 的实现，相当于使用函数在内部包了一个 call / apply 
//，第二次 bind() 相当于再包住第一次 bind() ,故第二次以后的 bind 是无法生效的。



var obj = {
    x: 81,
};
 
var foo = {
    getX: function() {
        return this.x;
    }
}
 
console.log(foo.getX.bind(obj)());  //81
console.log(foo.getX.call(obj));    //81
console.log(foo.getX.apply(obj));   //81


//括号。

//也就是说，区别是，当你希望改变上下文环境之后并非立即执行，
//而是回调执行的时候，使用 bind() 方法。而 apply/call 则会立即执行函数。


/*
我们要明白

*/