/*20170605*/
/*
这里之所以说是浅复制，是因为仅仅是把对象最表面的各个属性复制了出来，并没有复制对象内部类似hasOwnprioity等方法
*/
let foo = {
    a: 1,
    b: 2
};

/*
这是一个浅复制 
*/
// 第一种方案
// let fooKeys = Object.keys(foo);
// let bar = {};
// fooKeys.forEach((key) => bar[key] = foo[key])

//第二种方案
let bar={};
for(key in foo){
    bar[key]=foo[key]
}
console.log(foo);
foo.c = 3;
console.log('foo', foo);
console.log('bar', bar);