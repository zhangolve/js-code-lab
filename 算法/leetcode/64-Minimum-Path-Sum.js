// Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right which minimizes the sum of all numbers along its path.

// Note: You can only move either down or right at any point in time.

// Example:

// Input:
// [
//   [1,3,1],
//   [1,5,1],
//   [4,2,1]
// ]
// Output: 7
// Explanation: Because the path 1→3→1→1→1 minimizes the sum.

// 20181015


/*
dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1]) + grid[i][j]


http://www.cnblogs.com/thoupin/p/4777960.html

分清楚i和j所代表的含义。
*/
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
  const dp = new Array(grid.length);
  for(let i=0;i<grid.length;i++) {
    dp[i] = new Array(grid[0].length);
  }
  dp[0][0] = grid[0][0];
  for(let i=1;i<grid[0].length;i++) {
      dp[0][i]=dp[0][i-1] + grid[0][i]
   }
   for(let j=1;j<grid.length;j++) {
       dp[j][0]=dp[j-1][0]+grid[j][0];
   }

   console.log(dp);
   //先找到边上的部分，再遍历找到剩下的
   // i是横向，j 是纵向
   for(let j=1;j<grid.length;j++) {
       for(let i=1;i<grid[0].length;i++) {
           console.log(i);
           console.log(dp[j][i-1],dp[j-1][i])
           dp[j][i] = Math.min(dp[j][i-1],dp[j-1][i]) + grid[j][i]
       }
   }
   return dp[grid.length-1][grid[0].length-1]
};


console.log(minPathSum([[1,2,5],[3,2,1]]));