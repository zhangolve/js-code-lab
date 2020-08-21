/**
 * @param {number} x
 * @return {boolean}
 */

 /*
 回文数 ,非常简单的一个问题。通过从左右两边拿数计算相等不相等来看，就是个套路。

 */
var isPalindrome = function(x) {
    const arr = x.toString().split('');
    if(arr.length<2) {
        return true;
    }

    while(arr.length>1) {
        let left = arr.shift();
        let right = arr.length>0 ? arr.pop(): left;
        if(left!==right) {
            return false;
        }
    }
    return true;
};