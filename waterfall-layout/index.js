//var $= require("jquery");

//  似乎可以使用generator来实现
// 这里就用到了闭包的知识。
//通过闭包来将局部作用域中的某个值固定住。

;
var content=document.getElementById('content');
var waterfall=(function(){
var id=1;
return function(){
	var animate=document.createElement('div');
	animate.classList.add('animate');
	
	var trans='<div class="tran-1">'+
	'<div class=" tran"></div>'+
	'</div>'+
	'<div class="tran-2">'+
	'<div class="tran"></div>'+
	'</div>'+
	'<div class="tran-3">'+
	'<div class="tran"></div>'+
	'</div>';
	animate.innerHTML=trans;
	content.appendChild(animate);


$.ajax({
	url:'https://jsonplaceholder.typicode.com/posts?userId='+id,
	type:"GET",
	dataType:'json',
	success:function(res){
		console.log(res);
		var ul=document.createElement('ul');
		res.map( function(item){
			var id=item.id;
			var title=item.title;
			var body=item.body;
			var li=document.createElement('li');
			var h1=document.createElement('h1');
			var div=document.createElement('div');
			h1.innerHTML= id+title;
			div.innerHTML=  body;
			li.appendChild(h1);
			li.appendChild(div);
			ul.appendChild(li);
		});
		animate.style.display="none";
		content.appendChild(ul);
	}
});
return id++;
}
})();


waterfall();

$(window).scroll(function(){
var scrollTop = $(this).scrollTop();
var scrollHeight = $(document).height();
var windowHeight = $(this).height();
if(scrollTop + windowHeight == scrollHeight){
waterfall();
}
});


// var lastScrollTop = 0;
// if (document.addEventListener) {
//     document.addEventListener("scroll", scroll, false);
// } else {
//     document.onscroll = scroll();
// }

// function scroll() { // or window.addEventListener("scroll"....
//     var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
//     var main = document.querySelector('body'); //中间部分
//     var viewportOffset = main.getBoundingClientRect();
//     var top = viewportOffset.top;
//     if (st > lastScrollTop) {
//         if (top < 0) {
//             //隐藏顶栏
//            console.log(top);
//         }
//     } else {
//        console.log(top);
//     }
//     lastScrollTop = st;
// }