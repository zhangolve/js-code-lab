// 190. Reverse Bits
/*
2020-08-20

*/
// 16/2=1

//16/2 ==8

// 1 => 00000000000000000000000000000000000001

// 使用这两个方法进行转化。这两个方法也是写起来最难的了。


const converTo32 = (x) => {
    // 123
    let arr=(new Array(32)).fill(0)
    while(x>1) {
        let i=0;
        let temp=x;
        while(temp>1) {
            temp = parseInt(temp/2);
            i=i+1;
        } 
        if(i>0){
            arr[i]=1;
            x=x-(2**i);
        }
    }
    if(x===1) {
        arr[0]=1;
    }
    return arr;
}


const ToInt = (x) => {
    const len=x.length-1;
    return x.reduce((i,j, index)=>{
        if(j>0){
            i= i + 2**(len-index);
        }
        return i;
    },0)
}

console.log(ToInt([1,0,1,0]));
converTo32(43261596)

/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
var reverseBits = function(n) {
    return ToInt(converTo32(n))
};