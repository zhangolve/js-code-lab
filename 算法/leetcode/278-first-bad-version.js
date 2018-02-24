/**
 * Definition for isBadVersion()
 * 
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function(isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    return function(n) {
        if(n<=1) return 1;
        if(n<10000) {
            for(var j=0;j<=n;j++) {
                if(isBadVersion(j)) {
                    return j;
                }
            }
        }
        var start = parseInt(n/2);
        var end = n;
        while(end-start>=1) {
        if(isBadVersion(start)){
            if(end-start===1) {
                console.log('got 1')
                return start;
            } else {
             end = start;
             start = 1;
            }
            } else {
                if(end-start===1) {
                    console.log('got 2')
                    return end;
                } else {
             start = start + parseInt((end-start)/2);   
           
                }
            }
        };
    };
};

/*

特别注意：

如果想找除后取整的值，应当使用parseInt,直接使用3/4 这样会得到0.75.
这个其实还是那个槽点，我们好不容易习惯了C语言的那套除法规则，js又给改回去了。
致使原来觉得正常的，变成了不再正常。

另一个有意思的是把相同的算法经过python 转化后，python代码只需要29ms，而js代码需要56ms。近两倍的差距。

*/