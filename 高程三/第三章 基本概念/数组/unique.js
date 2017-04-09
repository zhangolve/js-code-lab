/*查看数组去重，哪种更有效率*/

/*事实验证结果是，push的方法更有效率*/

/*猜想可能是由于set的实现和Array.from的实现上，时间复杂度大于O(n)*/

/*我们没有看到有遍历，但是却并不代表底层实现没有*/

/* 就好像我们说一般来说C语言的的效率是很高的，相较于其他的java，javascript等高级语言来说    */

/* 也是因为我们看到js等高级语言语法上更加简单了，但其背后可能就是效率上的牺牲*/



/*
console.time("set");
for(let i=0;i<1000;i++)
{
let a=[1,2,1,1,2,3,4,3,3];
let  b=new Set(a);
let c=Array.from(b);
}

console.timeEnd('set');
*/
//set: 2.014ms  单次
//set: 31.610ms 一千次

/*
console.time('push');

for(let j=0;j<1000;j++)
{
let a=[1,2,1,1,2,3,4,3,3];
let b=[];
for(let i=0;i<a.length;i++)
{
	if(b.indexOf(a[i])==-1)
	{
		b.push(a[i]);
	}
}
}
console.timeEnd('push');
*/

//push: 0.265ms   1次 
//push: 15.856ms  1000次
//使用push的方法更快啊。




let a = [1, 2, 1, 1, 2, 3, 4, 3, 3];

Array.prototype.unique = function() {
    let b = [];
    for (let i = 0; i < a.length; i++) {
        if (b.indexOf(a[i]) == -1) {
            b.push(a[i]);
        }
    }
    return b;
}

let uniqueArr=a.unique();
console.log(uniqueArr);