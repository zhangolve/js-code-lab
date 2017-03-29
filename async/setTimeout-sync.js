function test(flag) {

    if(!flag) {

        setTimeout(function() {

           console.log('1');
           test(true);

        }, 5000);

        return;

    }
console.log('2')
    // code that you cannot modify

}

test(false);

//五秒之后，先打印1，后打印2.

//解释，当给定一个参数，false时，这个时候，先返回了return，等到五秒延时之后，再执行1，最后再执行2.
