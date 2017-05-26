/* 20170526  
实际的业务场景是要对通过ajax获取到的一个数组数据，进行降序排序，尽管直接对后台数据进行操作可能更加简单
但是这样的降序排序只使用一次，其他的很多情况，都是使用传统的升序排序。
因此这个时候，我们的目的是不改变原数组的具体值。
但是由于数组，也就是这个对象，是按照地址传值的，因此当我们直接给定新的变量，即便是对新变量进行操作，也会改变原数组。
*/
let foo=[1,2,3,4,5];
foo.reverse();
console.log('foo',foo);

let bar=[1,2,3,4,5];

console.log(foo==bar);  //两个数组并非是一样的

let foobar=bar.slice(0); // 进行复制

foobar.reverse();

console.log('foobar',foobar);
console.log('bar',bar);

/*
foo [ 5, 4, 3, 2, 1 ]
false 
foobar [ 5, 4, 3, 2, 1 ]
bar [ 1, 2, 3, 4, 5 ]


*/