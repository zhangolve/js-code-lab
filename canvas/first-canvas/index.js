/*
var c= document.getElementById('first-canvas');
var ctx=c.getContext('2d');
		cw=c.width=400;
		ch=c.height=400;
		ctx.fillStyle="#FF0000";
    ctx.fillRect(0,0,400,400);

*/
/*
 ctx.fillRect(0,0,400,400);

 前两个参数表示的是这个图形的左上角坐标
 后两个参数表示的是他的宽和高

 设置fillStyle属性可以是CSS颜色，渐变，或图案。fillStyle 默认设置是#000000（黑色）。
fillRect(x,y,width,height) 方法定义了矩形当前的填充方式。

*/


/*
绘制圆形 

记住一些常用的API
arc(x, y, radius, startAngle, endAngle, anticlockwise)
画一个以（x,y）为圆心的以radius为半径的圆弧（圆），
从startAngle开始到endAngle结束，按照anticlockwise给定的方向（默认为顺时针）来生成。

注意区别 ，strokeText 是绘制虚心文本
strokeText(text,x,y) - 在 canvas 上绘制空心的文本

最简单的 canvas 时钟 

*/


function newTime(){
var date=new Date();
var hours=date.getHours();
hours=(hours>10?hours:"0"+hours);
var min=date.getMinutes();
min=(min>10?min:"0"+min);
var sec=date.getSeconds();
sec=(sec>10?sec:"0"+sec);
var time=hours+":"+min+":"+sec;
return time;
}

var c=document.getElementById("first-canvas");
var ctx=c.getContext("2d");
var cw= c.width=400;
var ch= c.height=400;

function draw()
{
ctx.clearRect(0, 0, 400, 400);
ctx.beginPath();
ctx.arc(200,200,200,0,2*Math.PI);
ctx.stroke();
ctx.fillStyle="red";
ctx.font="30px Arial";

ctx.fillText(newTime(),150,200);
ctx.textAlign = "start";  //居中 

}

setInterval(draw,1000);

/*

注意这里是draw而不是draw()

*/

/*
setInterval(()=>{console.log(1)},1000);

setInterval与 setTimeout的区别是，setInterval是指的中断，这个之前我在学习单片机，汇编语言的时候，也有
涉及，每隔一秒执行前面的函数动作。


*/