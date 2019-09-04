function hoc(x,...rest) {
    // console.log(x)
    // if(typeof x!=='function') {
        
    // } else {
    //     return x + hoc(y)
    //     console.log(x)
    // }
    console.log(x);
    console.log(rest)
    return function(y) {
        if(y) {
            return x+y;
        } else {
            return x;
        }
    }
}

// 递归。 \\\


// something happen 

// hoc(1)(2)(3) =6

// hoc(1)(2)(3)(4) =10

console.log(hoc(1,2,3,4));