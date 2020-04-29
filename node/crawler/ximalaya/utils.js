function numberFormat(num) {
    const nonZeroNum = num.toString();
    const maxLength = 4;
    return  '0'.repeat(maxLength- nonZeroNum.length) + nonZeroNum;
}

// console.log(numberFormat(1))
// console.log(numberFormat(11))
// console.log(numberFormat(111))
// console.log(numberFormat(1111))

module.exports = numberFormat;
