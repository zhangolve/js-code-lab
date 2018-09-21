// 347. Top K Frequent Elements

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */

var topKFrequent = function(nums, k) {
    var obj = {};
    // for(var i=0;i<nums.length;i++) {
    //     const value = nums[i];
    //     obj[value] = obj[value]? obj[value]+1:1;
    // }
    // 这个排序的方法用的很巧妙
    // 有些时候，可是不显式地使用for循环
    nums.forEach(value=>obj[value]=obj[value]? obj[value]+1:1);
    return Object.keys(obj).sort( (i,j)=> obj[j]-obj[i]).slice(0,k).map(i=>parseInt(i));
}



// 根本没有必要对原始数组排序，只需要对去重之后的数组进行排序

console.log(topKFrequent([1,1,1,2,2,3],2))

/*
出现最频繁的ｋ个数字

k==1 

*/
// 了解桶排序

Array.prototype.bucketSort = function(num) {
    function swap(arr, i, j) {
      const temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp
    }
    const max = Math.max(...this)
    const min = Math.min(...this)
    const buckets = []
    const bucketsSize = Math.floor((max - min) / num) + 1
    for(let i = 0; i < this.length; i++) {
      const index = ~~(this[i] / bucketsSize)
      !buckets[index] && (buckets[index] = [])
      buckets[index].push(this[i])
      let l = buckets[index].length
      while(l > 0) {
        buckets[index][l] < buckets[index][l - 1] && swap(buckets[index], l, l - 1)
        l--
      }
    }
    let wrapBuckets = []
    for(let i = 0; i < buckets.length; i++) {
      buckets[i] && (wrapBuckets = wrapBuckets.concat(buckets[i]))
    }
    return wrapBuckets
  }
//   const arr = [11, 9, 6, 8, 1, 3, 5, 1, 1, 0, 100]
  const arr = [1,1,2,2,3,3,3]
  console.log(arr.bucketSort(10))

//   Array.prototype.lenSort = function()

// 实现一个排序　



// var topKFrequent = function(nums, k) {
//     var hash={}, res = [];
// 	nums.forEach(function(value){
// 	     hash[value]= ( hash[value]+1)|| 1;
// 	});
// 	Object.keys(hash).sort(function(a,b){return hash[b]-hash[a]})
// 	.slice(0,k)
// 	.forEach(function(x){
// 		res.push(parseInt(x));
// 	});
// 	return res;
// };
