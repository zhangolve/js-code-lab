//var $= require("jquery");

var content=document.getElementById('content');

$.ajax({
	url:'https://jsonplaceholder.typicode.com/posts?userId=1',
	type:"GET",
	dataType:'json',
	success:function(res){
		var ul=document.createElement('ul');
		res.map( function(item){
			var title=item.title;
			var li=document.createElement('li');
			li.innerHTML=title;
			ul.appendChild(li);
		})
		content.appendChild(ul);
	}
});