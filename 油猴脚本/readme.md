# 纪要

- 当使用onsubmit 无效的时候，可以使用 onclick 和 onkeypress 配合达到onsubmit 的作用

- window.find() 是一个异步的方法，类似于setTimeout

如果我们只是执行 

	for(var i=0;i<10;i++)
	{
		window.find('xxx');
	}

最终的结果也只能是将第十个找到。

