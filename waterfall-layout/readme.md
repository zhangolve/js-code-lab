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


