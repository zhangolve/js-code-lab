// 171. Excel Sheet Column Number

// 20181015

/**
 * @param {string} s
 * @return {number}
 */
var titleToNumber = function(s) {
    const t2n = {
        'A': 1,
        'B': 2,
        'C':3,
        'D':4,
        'E':5,
        'F':6,
        'G':7,
        'H':8,
        'I':9,
        'J':10,
        'K':11,
        'L':12,
        'M':13,
        'N':14,
        'O':15,
        'P':16,
        'Q':17,
        'R':18,
        'S':19,
        'T':20,
        'U':21,
        'V':22,
        'W':23,
        'X':24,
        'Y':25,
        'Z':26
    }

    const length = s.length;
    let res = 0;
    for(let i=0;i<length;i++) {
        res += t2n[s[i]] * 26**(length-1-i)
    }
    return res;
};

console.log(titleToNumber('ZY'))