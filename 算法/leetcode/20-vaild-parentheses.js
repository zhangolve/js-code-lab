// Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

// An input string is valid if:

// Open brackets must be closed by the same type of brackets.
// Open brackets must be closed in the correct order.
// Note that an empty string is also considered valid.

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
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
console.log(isValid('[(    { ( ( ) ) }   [ ( ) ]        )]'));



