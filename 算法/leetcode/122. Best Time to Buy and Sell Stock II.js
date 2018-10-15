// 122. Best Time to Buy and Sell Stock II

// 20181015


// a-b = (a-c) + (c-b) important 
// 一个数，可以重复使用。

// 4 7 8 2 8
// 最大利润很明显是 （8 - 4） + （8 - 2） = 10
// 就因为这个式子让我想复杂了：首先要找到一个极小值4，然后找到极大值8；然后找到极小值2，然后找到极大值8；balabala……

// 其实换一种思路，（7 - 4) + (8 - 7) + (8 - 2)
// 区别在于，直接将后一个数减前一个数就好了呀，只不过如果后一个数比前一个数小的话就不考虑而已。
// --------------------- 
// 作者：nomasp 
// 来源：CSDN 
// 原文：https://blog.csdn.net/NoMasp/article/details/50829772?utm_source=copy 
// 版权声明：本文为博主原创文章，转载请附上博文链接！
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
   if(prices.length<=0) {
        return 0;
    }
    let max = 0;
  for(let i=1;i<prices.length;i++) {
    max += prices[i] - prices[i-1] >0 ? prices[i] - prices[i-1] >0 : 0 ;
  }
  return max;
};