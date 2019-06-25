var  canvas=document.getElementById("chess");
var context=canvas.getContext('2d');
canvas.width=800;
canvas.height=800;

//这个时候一个棋盘就绘制完成了
context.strokeRect(0,0,500,500);
context.strokeRect(50,50,400,400);

function DightFixed(Dight,How){
	if((Dight-50)/20==0){  
		return Dight;  
	}
	else {
		if( (Dight-50)%20>10) {
			Dight=Dight+20-(Dight-50)%20;
			return Dight;
		}
		else{
			Dight=Dight-(Dight-50)%20;
								return Dight;                 
		}
	}
}


for(var i=0;i<20;i++){
	context.beginPath();
	context.moveTo(50, 400*i/20+50);
	context.lineTo(450, 400*i/20+50);
	context.stroke();
}

for(var j=0;j<20;j++){
	context.beginPath();
	context.moveTo(400*j/20+50,50);
	context.lineTo(400*j/20+50,450);
	context.stroke();
}

canvas.onclick=function(e){
	var x=e.offsetX;
	var y=e.offsetY;
	console.log(x,y);
	x=DightFixed(x,1);
	y=DightFixed(y,1);
	console.log(x,y);
	context.beginPath();
	context.arc(x,y,10,0,2*Math.PI);
	context.fill();
}


/*
每一个小格子占据的都是20×20的方格，我们最后是要在两条线的交点处填充，而不是方格。

我们为了简化，可以先在方格内部进行填充

如果是方格内部填充应该有一个满足的关系式
*/

// 20190625
/** 
 * maybe to do 
 *  两种棋子 ，黑子和白字
 * 	不能让棋子下到了内边框以外的部分
*/