/*  2017/04/08*/
/*通过调用一个函数，返回一个含有多个函数的json串数据，起到实现对一个函数继承多个方法的作用*/

var foo=function(x){
	return {
		add:function(y){
		
			return x+y;
		},
		dec:function(y){
			return x-y;
		},
		mul:function(y){
			return x*y;
		},
		dev:function(y){
			return x/y;
		}

	}
}

//console.log(foo(4));
/*{ add: [Function: add],
  dec: [Function: dec],
  mul: [Function: mul],
  dev: [Function: dev] }

  */

var result=foo(4).add(3);
console.log(result); //7

 result=foo(7).dec(3);
console.log(result); //4

