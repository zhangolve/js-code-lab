/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    var length = nums.length;
    if(length===0){
        return [];
    }
    var dp = new Array(length); // 初始化二维数组
    dp[0] = [];
    dp[0].push([nums[0]]);
    for(var i=1;i<length;i++) {
        dp[i] = [];
        var value = nums[i];
        const preLength = dp[i-1].length;
        for(var j=0;j<preLength;j++) {
            var arr = dp[i-1][j];
            const arrLength = arr.length;
            for(var z=0;z<=arrLength;z++) {
               var ele = [].concat(arr.slice(0,z).concat(value).concat(arr.slice(z)));
               dp[i].push(ele)
            }
        }
    }
    return dp[length-1];
};


console.log(permute([1,2,3,4]))
/*
// dp[1]

dp
dp[1] foreach 插入到其中

连续的整数


    var dp = new Array(length).fill([]); // 初始化二维数组
    console.log(dp)
    dp[0].push(nums[0]);

    需要注意
    dp[0]改变了，但是其他元素也相应地发生了改变。
    When the fill method gets passed an object, it will copy the reference and fill the array with references to that object.

    fill的是对象的时候，有这样一个坑。
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill

    理解清楚concat和push的区别和联系。
    
*/