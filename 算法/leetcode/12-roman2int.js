function roman(roman) {
    var romanToInt = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
    };
    var romanArr = roman.split('').reverse();
    var cursor = 0;
    var total = 0;
    for (var i = 0; i < romanArr.length; i++) {
        var count = 1;
        console.log(total,cursor);
        if (i >= cursor) {
            console.log(i)
            if(cursor+1===romanArr.length) {
                total = total + romanToInt[romanArr[cursor]] ;
                break;
            }
            for (var j = cursor+1; j < romanArr.length; j++) {
                if (romanToInt[romanArr[i]] === romanToInt[romanArr[j]]) {
                    count += 1;
                } else if (romanToInt[romanArr[i]] > romanToInt[romanArr[j]]) {
                    console.log('compare');
                    total = total + romanToInt[romanArr[i]] - romanToInt[romanArr[j]];
                    cursor += 2;
                    break;
                } else {
                    console.log('got here');
                    total = total + romanToInt[romanArr[i]] * count;
                    cursor = cursor + count;
                    break;
                }
                if(j===romanArr.length-1) {
                    total = total + romanToInt[romanArr[i]] * count;
                    cursor = cursor + count;
                    break;
                }
            }
        }
    }
    return total;
}

console.log(roman("MMCCCXCIX"))

/*
从后往前数，设立一个cursor 光标位置，明确知道光标位置在哪里。

*/