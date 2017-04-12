/*
Reverse digits of an integer.

Example1: x = 123, return 321
Example2: x = -123, return -321

click to show spoilers.

Note:
The input is assumed to be a 32-bit signed integer. Your function should return 0 when the reversed integer overflows.

Subscribe to see which companies asked this question.
the int32 range: -2^31 ~ 2^31-1
this problem is a little puzzling, you should take overflow into consideration
although it's really nothing to JavaScript
you should also notice that 1 << 31 will overflow in JavaScript

我本来以为是限制输入为32位整数，以为我没有计算好正确的最大最小值，但实际上要判断输出不能超过一个范围。所以一定要审题啊。

*/

var reverse = function(x) {
		function reverseIt(x){
				var str=x+"";
        var arr=str.split('');
        arr=arr.reverse();
        str=arr.join("");
        console.log("33");
        return Number(str);
		}
		 // var max=Math.pow(2, 31)-1;
		 // var min=-Math.pow(2,31);
		  var minn = - (1 << 30) * 2;
  		var maxn = (1 << 30) * 2 - 1;

		var result;
		 
    if(x>0||x==0)
    {
      result=reverseIt(x)
        
    }
    else {
    	x=Math.abs(x);
    	result=-reverseIt(x);
    
    }
    if(result>maxn||result<minn)
		 {
		 
		 	return 0
		 }
		 else{
		 return result;
		 }

};

var result=reverse(1534236469);
console.log(result);