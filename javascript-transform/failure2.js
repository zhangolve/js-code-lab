//我们的最终目的，还是想使用javascript来实现动画效果，让从0到500px的过程是可控的。
var cuble = document.querySelector('.cuble');
var time = "";
cuble.onmouseover = function(e) {
    cuble.style.marginLeft = "500px";
    console.log('1');
    for(var j=0;j<100;j++)
 	{
 	//经过二重遍历后，整个过程大约在5s左右
 	var pixels=5*j+'px';	
    //大约在45ms左右的时间
    console.time('a')
    for(var i=0;i<1e5;i++)
    {
    	time+=i;
    }  
    console.timeEnd('a');
    console.log(pixels);
    cuble.style.marginTop =pixels;
}
}

function delay(t) {
    return new Promise(function(resolve) {
        setTimeout(resolve, t)
    });
};
  // delay(100)
  //           .then(() => cuble.style.marginTop ="10px")

  //但是这仍然是一次失败的尝试，虽然是使用了for循环的延时方法。
  //但是注意上面这个方法，甚至连从左到右的过程也延时了。这又是为什么呢？
