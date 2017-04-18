2017/04/17

- 使用$.ajax()调用api的方法
	

		$({
		url:'http://api.github.com/users',
		type:'GET',
		dataType:'json',
		success:function(res){
		}
		})


注意不是

	$({
	url:'http://api.github.com/users',
	type:'GET',
	dataType:'json',
	
	},function(res){
	})

这样的形式，区别于node的异步写法。


- webpack 的配置

如果只有一个入口文件 则entry:"./index.js"不必再写上大括号

- 调用一次api已经实现，接下来就是当鼠标滚轮滚动最底下的时候，来实现继续调用。

- http://www.cnblogs.com/ArthurPatten/p/3405352.html 滚动到页面底部的监听

- 我们对一个元素里面添加多个div元素，并不需要频繁执行createElement()，只需要在innerHTML里面构造出一个模板字符串即可


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


