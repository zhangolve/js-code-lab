//  2020.08.31
// 746. Min Cost Climbing Stairs

/*

爬梯子的变形问题

cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]

cost = [1,100,1]



*/

/**
 * @param {number[]} cost
 * @return {number}
 */


var obj={};

var min= function(a, b) {
   return a<b?a:b;
}
var minCostClimbingStairs = function(cost) {
   obj[0]=cost[0];
   obj[1]=cost[1];
   if(cost.length===1) {
       return obj[0];
   }
   if(cost.length===2) {
       return min(obj[0], obj[1]);
   }
   cost.push(0)
   const len = cost.length;
   if(cost.length>2) {
       for(var i=2;i<cost.length;i++) {
           obj[i]= min(obj[i-1]+cost[i], obj[i-2]+cost[i]);
       }
   }
   return obj[len-1]
};

/*
Runtime: 76 ms, faster than 88.64% of JavaScript online submissions for Min Cost Climbing Stairs.
Memory Usage: 38.4 MB, less than 22.54% of JavaScript online submissions for Min Cost Climbing Stairs.

其实总结来看，就是状态转移方程，有点绕。

*/