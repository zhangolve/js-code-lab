var longestCommonPrefix = function(strs) {
    var count = 0 ;
    var maxCount =0;
    if(strs[0].length >0  ){
        maxCount = strs[0].length;
    } else {
        return ''
    }
    loop1:
    for (var i=0;i<maxCount;i++){
    loop2:   
        for(var j=0;j<strs.length;j++){
            if(strs[j].substr(i,1)!==strs[0].substr(i,1)){
                break loop1;
            }
        }
        count +=1;
    }
    return strs[0].substr(0,count)
};


/*
使用JS 操作字符串的substr 方法遍历是关键。

*/

/*
在leetcode题目当中，大量的题目，其实并不需要for循环，可能while也能够达到同样的效果。

同时，pop和shift这两个数组操作方法也很好。

由于你不知道究竟有多少个str，这可能会成为一个问题。

*/
/**
 * @param {string[]} strs
 * @return {string}
我希望能够尽量少的直接使用for循环。
forEach 不能return or break。
 */
var longestCommonPrefix2 = function(strs) {
    if(!strs.length){
        return ''
    }
    const arr = strs.map(str=>str.split(''));
    let count= 0;
    const ori =strs[0];
    while(arr[0].length>0) {
        let v  = arr[0].shift();
        for(var index=0;index<arr.length;index++) {
            const value=arr[index]
            if(index>0) {
                let cv= value.shift();
                if(cv!==v) {
                    // break;
                    // console.log(count, ori,'count')
                    return ori.substr(0,count);
                } 
            }

            if(index===arr.length-1) {
                count++;
            }
        }
    }
    return ori.substr(0,count);
};

console.log(longestCommonPrefix2(
    ["flower","flow","flight"]))

    
// console.log(longestCommonPrefix2(["aaa","aa","aaa"]))
// 还有一点就是array与数组的转化。
// 这个方案在时间复杂度上击败了5%，可能pop比较耗性能



// 用一种比较朴素的方式呢。

function longestCommonPrefix3(strs) {
    if(strs.length<1) {
        return '';
    }

    const str1=strs[0];
    let count=0;
        for(index=0;index<str1.length;index++) {
            for(let strIndex=0;strIndex<strs.length;strIndex++) {
                if(strs[strIndex][index]!==str1[index]) {
                    console.log(str1[index], strIndex[index], str1.substr(0, count), count)
                    return str1.substr(0, count);
                }
                console.log(strIndex)

                if(strIndex===(strs.length-1)) {
                    count++;
                }
        }
    }
    return str1.substr(0, count);
}

console.log(longestCommonPrefix3(["aaa","aa","aaa"]))


// var longestCommonPrefix = function(strs) {
//     const len = strs.length;
//     if (len === 0) return "";
//     let prefix = strs[0];
//     for (let i = 1; i < len; i++) {
//       while (strs[i].indexOf(prefix) !== 0) {
//         prefix = prefix.substring(0, prefix.length - 1);
//         if (prefix === "") return "";
//       }
//     }
//     return prefix;
//   };

// 这个思路是按最大长度，截取匹配字符串。





var longestCommonPrefix = function(strs) {
    var maxStr=strs[0];

    if(!maxStr) {
        return '';
    }
    var maxCount= maxStr.length;
    while(maxCount>0) {
        for(var i=0;i<strs.length;i++) {
            const str=maxStr.substr(0, maxCount);
            if(strs[i].indexOf(str) !==0) {
                //need break
                maxCount--;
                break;
            }
            if(i==strs.length-1) {
                return maxStr.substr(0,maxCount);
            }
        }
    }
    return ''
}

/*

maxStr    10, 9 ,8,7

以上这个方案，就是我自己手写的一个，按照上面这种思想。


*/