/*
20170516
之前的测试数据是在我的dell笔记本（i3双核）上进行的，
这次我们也可以对比一下，在i7四核的神州战神笔记本电脑上的实际结果
我们简单做一个标记，A为dell，B为神州
 */

/*比较一下各种遍历的方法，哪种更有效率一些，得出的结论是map更有效率一些*/

let arr=new Array(1000);
arr.fill(1);

// console.time('for');
// for(let i=0;i<arr.length;i++)
// {
// 	console.log(i)
// }
// console.timeEnd('for');

//A for: 925.991ms
//B for : 17.093ms 值得注意的是，经过多次测试，这里其实还是在一个范围波动的，最大甚至达到了27ms，但是总体而言，在速度上还是完全超过了A的。
// 如果是100000，也就是一个10万条数据的数组，测试执行完毕大概在1000ms左右。


console.time('map');
arr.map((i,j)=>console.log(j));
console.timeEnd('map');

//A map: 839.953ms
// B map: 22.738ms


// console.time('forEach');
// arr.forEach((i,j)=>console.log(j));
// console.timeEnd('forEach');

//A  forEach: 964.900ms 
// // B forEach ： 24.028ms  ，但是也会达到12ms左右


console.time("every");
arr.every((value,index)=>{
	if(index>1000){
		
		return false;
	}
	else{
	console.log("every",index);
	return true;
	}
})
console.timeEnd("every");
// 执行到1000，只用了5ms左右


/**
 我们经过这个测试，也大概有了一个了解,cpu,核数，乃至于当前执行任务的电脑系统的状态都有可能影响到最终的结果。
 我们很难给出一个到底哪一个方法更加高效的说法。 

 */