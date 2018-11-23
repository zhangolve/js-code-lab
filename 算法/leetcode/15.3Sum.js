// 15. 3Sum

// Given array nums = [-1, 0, 1, 2, -1, -4],

// A solution set is:
// [
//   [-1, 0, 1],
//   [-1, -1, 2]
// ]

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    const result = [];
    const middle = [];
    for(var i=0;i<nums.length-1;i++) {
        // i<j<=nums.length-1 z>j
        for(var j=i+1; j<nums.length; j++) {
            var zValue = -(nums[i] + nums[j]);
            // 这里为什么要用lastIndexOf 而不是indexOf呢，也是希望取到的z数值尽量大一些。因为z本身就要求能够大于j
            //另外，也会出现重复项的问题，比如nums[i]=1 ,而 zValue也等于1，这个时候就取不到想要的结果。
            var z = nums.lastIndexOf(zValue)
            if( z > j ) {
                // -1 , 2 
                const sortedArr =  [nums[i],nums[j], nums[z]].sort((i,j)=>i-j);
                // 这里在写的时候又犯错了，应该是i-j而不是i>j
                // 这里是通过
                if(!middle.includes(sortedArr.toString())) {
                    result.push(sortedArr);
                    middle.push(sortedArr.toString());
                }
                // 去重
            }
        }
    }
    return result;
};



console.log(threeSum([-1,0,1,2,-1,-4]));
/*
三个数之和为0


// Status: Time Limit Exceeded

上述方法对简单的可行，但是由于时间复杂度为o(n^2),当原始的数据比较大的时候，会造成Time Limit Exceeded。


**/

/*
以下为推荐解法
https://github.com/chihungyu1116/leetcode-javascript/blob/master/15%203Sum.js
*/


/**
 * @param {number[]} nums
 * @return {number[][]}
 */

var threeSum = function(nums) {
    var result = [];
    
    if(nums.length < 3){
        // 显然，如果入参数组都没有3个数，则也不可能满足条件了。
        return result;
    }
    // 这里是1 : -1而不是1: 0 
    // 因为a>b ?1:-1与a-b等效。5>4?1:-1 与5-4
    // 1: -1
    // sort https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    // 方法的定义里面已经指出了，这个方法1 0 -1代表的含义分别为大于，等于，小于。因此我们直接使用a>b这样的写法，
    //　结果是不准确的。
    // [1,2,3,6,5,4].sort((i,j)=>i>j)  [1,2,3,6,5,4]
    //  显然，认为6,5,4跟３是相当了

    nums.sort(function(a,b){return a>b ? 1 : -1;});
    
    var len = nums.length;
    //我写的-1这里是-2    
    for(var i = 0; i < len-2; i++){
        
        if(i === 0 || nums[i] > nums[i-1]){ // very important, same as line 40, remove duplicate as 111 will only run once 1-> rather tan 1 1 1
            target = 0 - nums[i];
            
            j = i + 1;
            k = len - 1;
            
            while(j < k){
                if(nums[j] + nums[k] === target){
                    result.push([nums[i],nums[j],nums[k]]);
                    j++;
                    k--;
                    while(j < k && nums[j] === nums[j-1]){j++;}
                    while(j < k && nums[k] === nums[k+1]){k--;}
                } else if(nums[j] + nums[k] < target){
                    j++;
                } else {
                    k--;
                }
            }
        }
        // very important, same as line 19
        // if(i < len - 1){ 
        //     while(nums[i] === nums[i+1]){i++;}
        // }
    }
    
    return result;
};