var cuble = document.querySelector('.cuble');

function delay(t, pixels) {
  
    setTimeout(go(pixels), t);

};

function go(pixels){
	cuble.style.marginLeft=pixels;
}
cuble.onmouseover = function(e) {
for(var i=0;i<100;i++)
{
	var pixels = 5 * i + "px";
	delay(100*i,pixels);

}
}

//这种没有promise的方法，还是失败了，
//但是他的总体思路是
//http://stackoverflow.com/questions/43095118/moving-div-box-just-using-pure-javascript-at-certain-time