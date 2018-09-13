/**
 * @param {number[]} nums
 * @return {number[]}
 * Note: Please solve it without division and in O(n).

Follow up:
Could you solve it with constant space complexity? 
(The output array does not count as extra space for the purpose of space complexity analysis.)
 */
var productExceptSelf = function(nums) {
    const res = (new Array(nums.length)).fill(1);

    // left 得到一个结果左边的乘积
    // 从1 开始
    // [1,2,3,4] 为例
    for(let i=1;i<nums.length;i++) {
        res[i]=res[i-1]*nums[i-1];
    }

    // right
    // 再乘以右边的，最右边的没有可以乘的
    console.log(res);
    let acc = 1;
    for(let i=nums.length-1;i>=0;i--) {
        res[i]=res[i]*acc;
        acc = acc * nums[i];
        console.log(acc);
    }
    return res;
};


console.log(productExceptSelf([1,2,3,4]));