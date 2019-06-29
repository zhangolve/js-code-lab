// Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

// An input string is valid if:

// Open brackets must be closed by the same type of brackets.
// Open brackets must be closed in the correct order.
// Note that an empty string is also considered valid.

/**
 * @param {string} s
 * @return {boolean}
 */

 var isValid_false = function(s) {
    var arr = s.split('').reverse();

    var map = {
        ')':'(',
        '}':'{',
        ']':'['
    }
    while(arr.length>0) {
        if(!(arr[0] in map) ) {
            return false;
        }
        if(arr[1]===map[arr[0]]) {
            arr = arr.slice(2);
        } else {
            if(arr.pop()===map[arr[0]] ){
                arr = arr.slice(1);
            } else {
                return false;
            }
        }
    }
    return true;
};

// can not handle this situation 
// "[({(())}[()])]"
// console.log(isValid('[(    { ( ( ) ) }   [ ( ) ]        )]'));


// 20. Valid Parentheses
// 20190629 

// 要用到栈的思想
// 遇到左半边括号推入栈中，遇到右半边括号，如果栈为空，则一定可以返回false。因为已经不对称了。否则pop出来某个元素。


// "[({(())}[()])]"

// [({(( 

// [({(

// 依次类推


var isValid = function(s) {

    const left = ['(','[','{'];
    const right = [')', ']','}'];

    const arr = s.split('');
    const stock = [];
    for(let i=0;i<arr.length;i++) {
        // 如果这个元素为左边括号，则推入栈中。
        if(left.includes(arr[i])) {
            stock.push(arr[i]);
        } else {
            // 这个元素为右边括号
            if(stock.length==0) {
                return false;
            } else {
                // 栈中还有元素 
                // 是否匹配
                const val = stock.pop();
                if(left.indexOf(val)!==right.indexOf(arr[i])) {
                    return false;
                }
            }
        }
    }
    if(stock.length==0) {
        return true;
    } else {
        return false;
    }
}


console.log(isValid("["));