/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    var length = nums.length;
    var dp = new Array(length).fill([]);
    dp[0] = [[nums[0]]]; // [[1]]
    for(var i=1;i<length;i++) {
        dp[i]=[].concat(dp[i-1]);
        dp[i].push([nums[i]]);
        console.log(dp[i],1);
        for(var j=0;j<dp[i-1].length;j++) {
            var current = dp[i-1][j].concat(nums[i]);
            dp[i].push(current);
        } 
    }
    return dp[length-1];
};

console.log(subsets([1,2,3]));
// 特征，连续性

// 递归。

// []  => [[]] 0 dp(0)

// [1] => [[],[1]] 1 dp(0) + current_1(i) + concat

// [1,2] => [[0],[1]] dp(1) + current_1(i) [2] + current(all) [[],[1],[2],[1,2]]

// [1,2,3] => dp(2) [],[1],[2],[1,2] + current_1(i) [3] + current(all) [1,2,3] + 

// 

// i=1 