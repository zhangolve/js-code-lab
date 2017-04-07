/**
 * @param {string} s
 * @return {number}
https://leetcode.com/problems/decode-ways/#/description


 110   1
 12045  1
111 3 为什么是3呢？   

1 1 1  AAA
1 11    AK
11 1		KA 
算作三种 

一开始没有领会题目意思

这个时候，情况就更加复杂了，可以考虑使用递推。动态规划。
 */

 /*
划分为不带0和带0两种情况
   
 */


Array.prototype.combine=function()
{
var newArr=[];
for(let i=0;i<this.length;i++)
{
	 let combinedArr = this[i] + "" + this[i + 1];
	 let comNum = Number(combinedArr);
	 if(comNum!==10&&comNum!==20)
	 {
	 		newArr.push(this[i]);
	 }
	 else{
	 	newArr.push(comNum);
	 	i+=1;
	 }

}

return newArr;
}


var numDecodings = function(s) {
    if(s.length){
    var arr = s.split('');
    var ways = 1;
    /*含有0的情况 ，优先凑出来10和20 两个数字 */

    /*带0的情况用到了高中时候学的排列组合，*/
    /*把10，20看成一个数字，与其他的再放到一起*/
   	arr=arr.combine();
    for (let i = 0; i < arr.length; i++) {
    	
        let combinedArr = arr[i] + "" + arr[i + 1];

        let comNum = Number(combinedArr);
        if (comNum < 27) {

            ways *= 2;
            i += 1;
        }
       
    }
return ways;
}
return 0;
};


console.log(numDecodings('10'));





/*
function loop(){
	for(var i=0;i<10;i++)
	{
		if(i=4)
		{
			return i;
		}
	}
	return i
}

console.log(loop());  //最后返回的是4 ，而不是10.



*/


/*从数组中删除掉一个元素*/




