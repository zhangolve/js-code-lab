// 347. Top K Frequent Elements

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
    var result = {}; // key num value frequent
    
    function findLargest(arr, k) {
        
        arr.pop()
        var ele = Math.max(...arr);
        arr.pop(ele);
    }
    
    for(var i=0;i<nums.length;i++) {
        var num = nums[i];
        if(!result[num]) {
            result[num] = 1;
        } else {
            result[num] +=1;
        }
    }
    
};

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
  const arr = [11, 9, 6, 8, 1, 3, 5, 1, 1, 0, 100]
  console.log(arr.bucketSort(10))


