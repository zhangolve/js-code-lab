/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    var length = nums.length;
    if(length===0){
        return [];
    }
    var dp = new Array(length).fill([]); // 初始化二维数组
    dp[0].push(nums[0]);
    console.log(dp[1]);
    for(var i=1;i<length;i++) {

        var value = nums[i];
        const preLength = dp[i-1].length;
        for(var j=0;j<preLength;j++) {
            var arr = dp[i-1][j];
            for(var z=0;z<=arr.length;z++) {
               var ele = [].concat(arr.slice(0,z).concat(value).concat(arr.slice(z)));
               dp[i].push(ele)
            }
        }
    }
    return dp[length-1];
};


console.log(permute([1,2]))
/*
// dp[1]

dp[1] foreach 插入到其中

连续的整数

*/