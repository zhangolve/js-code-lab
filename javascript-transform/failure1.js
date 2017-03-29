//使用promise的错误方法，本质上还是和setTimeout的方法是一样的。
//我们的最终目的，还是想使用javascript来实现动画效果，让从0到500px的过程是可控的。
var cuble = document.querySelector('.cuble');
cuble.onmouseover = function(e) {
   
    for (var i = 0; i < 100; i++) {
        var pixels = 5 * i + "px";
        delay(100)
            .then(() => cuble.style.marginLeft = pixels)
    }

}

function delay(t) {
    return new Promise(function(resolve) {
        setTimeout(resolve, t)
    });
};
