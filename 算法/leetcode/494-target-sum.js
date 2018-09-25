/*
Input: nums is [1, 1, 1, 1, 1], S is 3. 
Output: 5
Explanation: 

-1+1+1+1+1 = 3
+1-1+1+1+1 = 3
+1+1-1+1+1 = 3
+1+1+1-1+1 = 3
+1+1+1+1-1 = 3

There are 5 ways to assign symbols to make the sum of nums be target 3.
Note:
The length of the given array is positive and will not exceed 20.
The sum of elements in the given array will not exceed 1000.
Your output answer is guaranteed to be fitted in a 32-bit integer.

有点像是数学题

如果都是正数，会怎样？

先都是正数

然后减掉target，剩余的数／２的组合。

但是并不知道剩下的数的组合的个数。这就增大了时间复杂度，而这应该不是这道题的本意。

最后当然是要用动态规划了。

*/


/**
 * @param {number[]} nums
 * @param {number} S
 * @return {number}
 */
var findTargetSumWays = function(nums, S) {
    var sum = nums.reduce((i,j)=>i+j,0);
    var need = (sum-S)/2;
    if(need===0) {
        return 1;
    } else if(!Number.isInteger(need)) {
        return 0;
    } else {

    }
};