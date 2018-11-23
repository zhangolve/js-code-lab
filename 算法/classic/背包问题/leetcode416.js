function canPartition(nums) {  
    var sum=0;  
    sum = nums.reduce((i,j)=>i+j,0);
    if(sum % 2 == 1) {
     return false;
    } else{  
       sum /=2;
       var n=nums.length;  
       // dp[i][j] 表示 如果我们取前i个数字，且背包容量为j的情况下，最多能放入多少东西
       const dp = [...Array(n)].map(x=>Array(sum+1).fill(0)) 
       // dp[0][0] 为初始状态，表示，没有任何没有东西没有体积，其余部分初始化
       for(let i=nums[0];i<=sum;i++){
            dp[0][i] = nums[0];
       }
       //遍历n个数字，即视为n个产品
       for(let i=1;i<n;i++){  
           //加入了这种物品后更新状态
           for(let j=nums[i]; j<=sum; j++){  
               dp[i][j]=Math.max(dp[i-1][j], dp[i-1][j-nums[i]]+nums[i]);  
           }  
       }  
       //放满了才能表示正好1/2
       if(dp[n-1][sum]==sum) 
           return true;  
       else
           return false;  
    }  

}  