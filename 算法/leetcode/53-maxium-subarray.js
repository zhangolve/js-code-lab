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