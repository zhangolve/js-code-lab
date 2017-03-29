//http://stackoverflow.com/questions/43095118/moving-div-box-just-using-pure-javascript-at-certain-time/43096842#43096842

var cuble = document.querySelector('.cuble');

cuble.onmouseover = function(e) {
  for (var i = 0; i < 100; i++) {
    var pixels = 5 * i + "px";

    delay(20*i, pixels)
      .then((p) => {console.time('a'); cuble.style.marginLeft = p;console.timeEnd('a') } )
  }
}

//从delay()这个function 传递参数pixels，一直传递到内层。
//之前的误解是一个promise function里面只能有一个参数，
//但是实际上，真正重要的是，return 之后new出来的Promise ,
//这个Promise出来两个参数，resolve和reject。
//只有他外层有function有多少个参数根本不重要。
//该运动就是匀速运动
//上面的20*i是不能替换成为2000的，否则也是达不到效果的。
//这里的整个思路是这样的
//第一次delay的时候是20ms，这个时候走了5个像素点
//第二次delay的时候是40ms，但是因为有时间的累积，这一次delay虽然是40ms，但是却是在第一次delay之后的20ms
//而第二次移动的位置，由于前一次已经移动了5个像素点，这一次只需要再移动5个像素点，以此类推。


function delay(t, pixels) {
  return new Promise(function(resolve) {
    setTimeout(function() { resolve(pixels); }, t)
  });
};
