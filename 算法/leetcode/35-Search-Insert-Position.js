var searchInsert = function(nums, target) {
    nums.push(target);
    return nums.sort((i,j)=>{i-j}).indexOf(target);
};

// 重新排序 ，注意是i-j ，而不是i>j这样的写法。
// 找index，indexOf 方法本身能够找到第一个
//对应的还有 Array.prototype.lastIndexOf
/*
var a=[1,2,3,3,5]
a.lastIndexOf(3)
3
*/
