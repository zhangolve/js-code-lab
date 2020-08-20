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

// var result=reverse(1534236469);
// console.log(result);

// 20200820

/*
Runtime: 136 ms, faster than 11.79% of JavaScript online submissions for Reverse Integer.
Memory Usage: 40.1 MB, less than 5.03% of JavaScript online submissions for Reverse Integer.
*/
/**
 * @param {number} x
 * @return {number}
 */
var reverse2 = function(x) {
	function deal(x) {
	if(x> ((2**31)-1) || x< (-(2**31))){
		return 0;
	} else {
		return x;
	}
	}
	str = x.toString();
	if(str.length===0) {
		return x;
	}
	let minus = str[0]==='-'?'-':'';
	let zhengStr = minus ? str.substr(1): str;
	reverStr = zhengStr.split('').reverse().join('');
	// reverse 是新添加的，如果没有reverse呢。
	return deal(parseInt(minus+reverStr));
};

console.log(reverse2(1534236469))


/* 

以上两种解决方案相差无几。我们来看看更优解。

public int reverse(int x) {
    int rev = 0;
    while (x != 0) {
        int pop = x % 10;
        x /= 10;
        rev = rev * 10 + pop;
    }
    return rev;
}
*/
var reverse3 = function(x) {	
	let rev=0;
 
	 while(x!==0) {
		 let pop = x%10; //取余
		 x=parseInt(x/10);
		 rev=rev*10+pop;
		 if(rev> ((2**31)-1) || rev< (-(2**31))) return 0;
	 }
	 return rev;
 };
/**
 * 123
 * 余数为3
 * x变为12
 * rev变为3
 * 
 * 继续循环
 * 
 * 余数变为2
 * x变为1
 * rev变为3*10+2 ==32
 * 
 * 最后一轮循环
 * 
 * 余数变为1
 * x变为0
 * rev
 * 变为32*10+1=321
 * 
 * 循环结束 
 * 
 */
