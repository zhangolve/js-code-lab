/*这是一个最简单的方式来实现一个给window对象上注入一个属性的方法*/

/*
原型继承的方式
    function person(){
	 
	}
	person.prototype.sayName=function(){
		console.log('zhangolve');
	}
	person1=new person(); //这个new的过程在这里又是必不可少的了。
	person1.sayName();

*/
//通过使用构造出object的方式来对$增加一些方法
(function(global,factory){
    window.$=function(){
        return {
            book:function(){
                console.log('this is a book');
            },
            cat:function(){
                console.log('this is a cat');
            },
            copy:function(arr){
                try {
                   return  arr.concat(arr)
                }  
                catch(e){
                    console.log(e);
                }
            }
        }
    }
   
})(window,document)
