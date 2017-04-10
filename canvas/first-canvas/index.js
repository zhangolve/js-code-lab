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
var cw= c.width=500;
var ch= c.height=500;

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

//setInterval(draw,1000);

function circle(){
	ctx.clearRect(0,0,400,400);
	ctx.beginPath();
	ctx.arc(200,200,200,0,2*Math.PI);
	ctx.stroke();

}



/*

注意这里是draw而不是draw()

*/

/*
setInterval(()=>{console.log(1)},1000);

setInterval与 setTimeout的区别是，setInterval是指的中断，这个之前我在学习单片机，汇编语言的时候，也有
涉及，每隔一秒执行前面的函数动作。


*/


//绘制一个三角形，使用的是moveto，lineto这种画线的方式
function triangle(){

	ctx.beginPath(); //开始绘制路径
	ctx.moveTo(200,0);
	ctx.lineTo(400,400);
	ctx.lineTo(0,400);
	ctx.fill(); //激活这个图形 ;
	ctx.fillStyle="red";
}

//triangle();



//绘制一个菱形

function rhombus(){

	ctx.beginPath(); //开始绘制路径
	ctx.moveTo(200,0);
	ctx.lineTo(400,200);
	ctx.lineTo(200,400);
	ctx.lineTo(0,200);
	ctx.lineTo(200,0);  //如果是空心的话，就还需要加上这一行
	ctx.stroke();
	//ctx.fill(); //激活这个图形 ,fill是实心的，stroke是空心的
	ctx.fillText("hello",200,200);

}
//rhombus();

function heart(){
	ctx.beginPath();
	ctx.arc(50,50,50,Math.PI,2*Math.PI);  //上半个圆是PI到2pi
	ctx.arc(100,50,100,0,Math.PI);        //下半个圆是0到pi
	ctx.arc(150,50,50,Math.PI,2*Math.PI); 
	
	ctx.fillStyle = 'red'; //注意先后顺序，只有在ctx.fill 之前才有效
	ctx.fill();
}

//heart();


//国旗

// canvas 图形的嵌套
// 要想实现canvas 图形的嵌套，我们应该把外层的元素stroke虚化处理
function flag(){
	ctx.fillStyle="red"; 
	//ctx.strokeStyle="red" ; //内部为空时的样式,也就是外面的线的颜色
	//这一行又要在下面两行前面，顺序不能错，
	//这一行的style同时作用于外层的方形和内层的三角形

	ctx.fillRect(0,0,400,400);

	ctx.fill();
	ctx.strokeStyle="red";
	ctx.moveTo(0,400);
	ctx.lineTo(0,500); 
	ctx.stroke();
	ctx.fillStyle="yellow"; //我们通过再加一个颜色，让新的ctx颜色覆盖掉原来的。
	ctx.moveTo(200,200);
	ctx.beginPath();
	ctx.moveTo(200,0);
	ctx.lineTo(400,400);
	ctx.lineTo(0,400);
	ctx.fill();

}

/*也是一个面试题了，要求做出五分之一圆来*/
function fifthCircle(){

		ctx.beginPath();
		ctx.arc(200,200,200,Math.PI,1.4*Math.PI,false);
		ctx.lineTo(200,200);
		ctx.fillStyle="red";
		ctx.fill();
}



flag();




