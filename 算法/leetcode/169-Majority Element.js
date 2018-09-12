/**
 * @param {number[]} nums
 * @return {number}
 * 
 * 找的是出现次数最多的元素，如果这个元素出现了超过一半次数，甚至都不必再继续看下去了。
 * 集合的方式
 */
var majorityElement = function(nums) {
    const max = nums.length / 2;  // 额可以是小数
    // 先找出所有的元素来，然后看。
    const numsSet = [...new Set(nums)];
    const numsObj = {};
    for(let i=0;i< numsSet.length;i++) {
        numsObj[numsSet[i]] = 0;
    }
    for(let i=0;i<nums.length;i++) {
        numsObj[nums[i]] += 1;
        if(numsObj[nums[i]]>max) {
            return nums[i];
        }
    }
};

// 中位数的方式

var majorityElement = function(nums) {
   const newNums = nums.sort((i,j)=>j-i);
   return newNums[Math.floor(nums.length /2)]
};

console.log(majorityElement([3,2,3]));
