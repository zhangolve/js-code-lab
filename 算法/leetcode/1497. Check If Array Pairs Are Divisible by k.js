// Example 1:

// Input: arr = [1,2,3,4,5,10,6,7,8,9], k = 5
// Output: true
// Explanation: Pairs are (1,9),(2,8),(3,7),(4,6) and (5,10).
// Example 2:

// Input: arr = [1,2,3,4,5,6], k = 7
// Output: true
// Explanation: Pairs are (1,6),(2,5) and(3,4).

/*
这个看问题似乎并不涉及到递归这块

统计arr中每个元素除k后的余数出现的次数，接下来只要判断余数i出现的次数是否和余数k-i出现的次数相等即可。对于余数为0的情况，只要满足出现的次数为偶数即可。
例如例子2中所示，arr[0]/7 余数为1，做出一个频次表来即可

https://www.cnblogs.com/seyjs/p/13217870.html
*/

/**
 * @param {number[]} arr
 * @param {number} k
 * @return {boolean}
 */
var canArrange = function(arr, k) {
    var fre={};
    for(var i=0;i<arr.length;i++) {
       const yushu = arr[i]%k;

       fre[yushu]=fre[yushu] ? fre[yushu]+1  : 1;
    }
    console.log(fre)
    const keys = Object.keys(fre).sort((i,j)=>i-j)
    for(var j of keys) {
        // j=parseInt(j);
        if(j==0 && fre[j]%2===0) {
            delete fre[j];
        }
        // 要么相加等于k，要么相加等于0
        // 所以是个数学问题，j大于0的时候，相加等于k， j小于0的时候，相加等于0
        // 先要做排序
        if(j<0) {
            if(fre[j]==fre[-k-j]) {
                delete fre[j];
                delete fre[-j];
            }
            if(fre[j]==fre[-j]) {
                delete fre[j];
                delete fre[-j];
            }
        }
        if(j>0&&fre[j]==fre[k-j]) {
            delete fre[j];
            delete fre[k-j];
        }
    }
    console.log(fre)
    return Object.keys(fre).length<1;
};

// -3 3
// console.log(canArrange([1,2,3,4,5,10,6,7,8,9], 5))

console.log(canArrange([-4,-7,5,2,9,1,10,4,-8,-3],3))

// { '0': 2, '1': 3, '2': 2, '-1': 2, '-2': 1 }

// 像这种情况必须要进行分拆组合，这个是之前没有考虑到的。
// 所以我们必须要对分拆这种情况做处理
// 因为本身就有两个数余数相加为k或者为0两种情况。
