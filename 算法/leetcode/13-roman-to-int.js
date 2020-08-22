const obj = {"I":1,"V":5,"X" :10,"L" :50,"C": 100,"D" :500,"M" :1000}
const spe = ['I','X','C'];
/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
    let int=0;
    const arr= s.split('');
    while(arr.length>0) {
        let roman = arr.shift();
        // 到达这里的，都是已经过滤掉了CM这样的。
        if(spe.includes(roman)) {
            let roman2=   arr.slice(0,1) //arr.shift();
            let int1 = obj[roman];
            let int2 = obj[roman2];

            // IV
            if(int1<int2) {
                arr.shift();
                int+=int2-int1;
            } else {
                int+=int1;
            }
        } else {
            int+= obj[roman];
        }
    }
    return int;
};


console.log(romanToInt("IV"))


// 还真是越来越简单了呢。。

// 似乎两年以前的那次成功的提交，我是看的别人的答案做的，这次是自己做的。