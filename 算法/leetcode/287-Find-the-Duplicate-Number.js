// 287. Find the Duplicate Number

/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function(nums) {
    var arr = [];
    for(var i=0;i<nums.length;i++) {
        if(!arr.includes(nums[i])) {
            arr.push(nums[i]);
        } else {
            return nums[i];
        }
    }
};

console.log(findDuplicate([1,3,4,2,2]))
/*
Example 1:

Input: [1,3,4,2,2]
Output: 2
Example 2:

Input: [3,1,3,4,2]
Output: 3

var new arr = [];



*/