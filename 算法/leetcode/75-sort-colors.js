/**
 * 
 * https://segmentfault.com/a/1190000005763087
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
function swap(nums, i, j){
    var middle=nums[i];
    nums[i]=nums[j];
    nums[j]=middle;
}

var sortColors = function(nums) {
    if(!nums || nums.length ===0) return;
    var b=nums.length-1; // 最后一位
    var r=0;
    for(var i=0;i<nums.length;i++) {
        // while 很重要
        // 由于已经交换过，要对交换过的位置做标记
        while (nums[i] == 0 && i >= r || (nums[i] == 2 && i <= b)) {
            if (nums[i] == 0) {
                swap(nums, i, r++);
            } else {
                swap(nums, i, b--);
            }
        }
    }
};