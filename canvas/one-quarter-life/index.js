var c=document.getElementById("first-canvas");
var ctx=c.getContext("2d");
var cw= c.width=500;
var ch= c.height=500;
function forthCircle(){

		ctx.beginPath();
		ctx.arc(200,200,200,1.5*Math.PI,2*Math.PI,false);
		ctx.lineTo(200,200);
		ctx.fillStyle="gray";
		ctx.fill();
}

function restCircle(){
		ctx.beginPath();
		ctx.arc(200,200,200,0,1.5*Math.PI,false);
		ctx.lineTo(200,200);
		ctx.fillStyle="red";
		ctx.fill();
}

forthCircle();
restCircle();




