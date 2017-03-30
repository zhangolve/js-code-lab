/*@zhangolve 2017/03/12*/
/* const 的值得注意，不是说Array里面的值保持不变，而是说Array这个对象保持不变，引用类型啊。 */
const a=new Array;
a[0]=3;
//3
//a
a[1]=4;
//[3,4];


/*我们可以修改Object单个元素的内容，进而修改Object的内容，而不能直接修改Object的内容，*/


const a={"a":1,"b":2}
a={"a":2,"b":2}
// Uncaught TypeError: Assignment to constant variable.
a.a=2
//2
//Object {a: 2, b: 2}
