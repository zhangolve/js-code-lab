/*最简单的reduce，求加*/

/*注意 reduce的第二个参数，表示的是初始值 ，如果没有的话，默认为空 了 */



/*总结来说，reduce往往是可以用来替代遍历，for循环，map循环，push推入堆栈等*/

// var foo=[1,2,3,4,5];
// var result=foo.reduce((a,b)=>{return a+b},1);
// console.log(result);


	 console.time('reduce');
	 (function(){
   var foo=[1,2,3,4,5];
   var result=foo.reduce((a,b)=>{return a+b},"0");
   console.log(result);  //这个时候就能够起到拼接字符串的目的了。
   })();
   console.timeEnd('reduce');
/*如果不用reduce，传统我的做法可能是*/
/*这种方法把result放到了外层的作用域上，显然没有上一种方法好*/
//reduce: 5.876ms
console.time('map');
(function(){

var foo=[1,2,3,4,5];
var result="0";
foo.map((i)=>result+=i  );
console.log(result);
})();


console.timeEnd('map');
//map: 25.099ms






