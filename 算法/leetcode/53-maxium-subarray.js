// 2018
/*
这个方案显然是错误的，因为就没有一个reurn，有些时候。
*/
var maxSubArray = function(nums) {
    if(nums.length===1) {
        return nums[0];
    } else {
        var max = nums[0];
        var temp=0;
        for(var i=0;i<nums.length;i++) {
            temp = 0;
            for(var j=i;j<nums.length;j++) {
                temp= temp+nums[j];
                if(max<temp) {
                    max=temp;
                }
            }
        }
    }
};


// 2020-08-25


/*
Input: [-2,1,-3,4,-1,2,1,-5,4],

Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.

Input: [-2,1,-3,4,-1,2,1,-5,4,3],

动态规划

状态转移

这道题让求最大子数组之和，并且要用两种方法来解，分别是 O(n) 的解法，还有用分治法 Divide and Conquer Approach，这个解法的时间复杂度是 O(nlgn)，那就先来看 O(n) 的解法，
定义两个变量 res 和 curSum，其中 res 保存最终要返回的结果，即最大的子数组之和，curSum 初始值为0，每遍历一个数字 num，比较 curSum + num 和 num 中的较大值存入 curSum，然后再把 res 和 curSum 中的较大值存入 res，以此类推直到遍历完整个数组，可得到最大子数组的值存在 res 中，代码如下：


只用一个for循环，如果

例如-2， 1，如果-2+1的结果比-2大，则使用-2+1的结果，反之，则不必了。

-2+1+-3
*/

var maxSubArray = function(nums) {
    const max= function(a,b) {
        if(a-b>0) {
            return a;
        } else {
            return b;
        }
    }
    // 注意这里一定要是safe interger，不然比较大小的时候是有问题的。
    let res = Number.MIN_SAFE_INTEGER, curSum = 0;  
    for (var num of  nums) {
        curSum = max(curSum + num, num);
        res = max(res, curSum);
    }
    return res;
}

/*

拿例子走一遍

 [-2,1,-3,4,-1,2,1,-5,4]

 res=-safe-interger

 curSum=0;

 -2 进来

 curSum = -2
 res= -2

 1 进来

 curSum = 1
 res = 1

 这个时候，数组中相当于是只有[1] 的。

 -3进来

 curSum=-2

 res=-2

 4进来

 curSum=2
 res = 2

 ...

 curSum = 6
 res=6

 -5进来

 curSum = max(1,-5)  1 (这里相当于不把这个新的值加进来)
 res = max(6,1) 



 

*/


console.log(maxSubArray([-1]))