/*

A message containing letters from A-Z is being encoded to numbers using the following mapping:

'A' -> 1
'B' -> 2
...
'Z' -> 26
Given a non-empty string containing only digits, determine the total number of ways to decode it.

Example 1:

Input: "12"
Output: 2
Explanation: It could be decoded as "AB" (1 2) or "L" (12).
Example 2:

Input: "226"
Output: 3
Explanation: It could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).


拆分字符串，

10-26 可以有两种拆分

1126 

11 2  888
1 12 
1 1 2

计算总数

1  1
 2 2 
3 3

1 1 16 
1 1 1 6
1 11 6
11 16


1 1 16 
1 1 1 6
1 11 6
11 16



16

1 16
1 

1 6

1 2

2


12070

1 2

1 2 6

1 10

1 F
1  1 1 0 

110  3  1

1 110
*/

/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function(s) {
    var arr= s.split('');
    var temp='';
    var end=''
    var base = 1;
    while(arr.length>0) {
        var c= arr.shift();
        if(temp.length===0&& c==='0') {
            return 0;
        }
        if(c==='1' || c==='2' ) {
            temp+=c;
            end=c;
        } else if ( (end==='1' ||end==='2') && parseInt(c)=== 0) {
            temp+=c;
            end=c;
        } else if (end==='2' && parseInt(c)< 7) {
            temp+=c;
            end=c;
        }  else if (end==='1') {
            temp+=c;
            end=c;
        } 
        
        if(parseInt(end)===0) {
            base*=temp.length -2 || 1;
            temp='';
            end='';  
        } else if(parseInt(end)>2 || arr.length===0) {
            console.log(end, temp)
            base*=temp.length || 1;
            temp='';
            end='';
        }
    }
    return base;
};

console.log(numDecodings("2839"));
// 这个场景还是有问题。

/*

0这种情况要特殊处理

由于有0 这个问题，这个方案看上去就有点问题了

*/
// "10"



var numDecodings = function (s) {
    if (s.length <= 0) {
        return 0;
    }
    count = 0;
    const backtrack = (str, i) => {
        if (i > str.length - 1) {
            count++;
            return;
        }
        if (s[i] === '0') {
            return;
        }
        if (i + 1 <= str.length - 1 && s[i] + s[i + 1] <= '26') {
            backtrack(str, i + 2);
        }
        backtrack(str, i + 1);
    }
    backtrack(s, 0);
    return count;
};