/*比较一下各种遍历的方法，哪种更有效率一些，得出的结论是map更有效率一些*/

let arr=new Array(1000);
arr.fill(1);
/*
console.time('for');
for(let i=0;i<arr.length;i++)
{
	console.log(i)
}
console.timeEnd('for');
*/
//for: 925.991ms

/*
console.time('map');
arr.map((i,j)=>console.log(j));
console.timeEnd('map');
*/
//map: 839.953ms

console.time('forEach');
arr.forEach((i,j)=>console.log(j));
console.timeEnd('forEach');

//forEach: 964.900ms