/* 2017/04/01*/

a.set('name','zhangolve');
//Map(1) {"name" => "zhangolve"}
a.set('age',23);
//Map(2) {"name" => "zhangolve", "age" => 23}
a.get('name');

//"zhangolve"

a.size
// 2

//其实当你理解了Localstorage之后这个Map也就不难理解了。

//http://stackoverflow.com/questions/32600157/maps-vs-objects-in-es6-when-to-use

//why and how to use Map
/*
You don't want to iterate 
over the properties of an object type at all
or you do but the property order doesn't matter
 and you can distinguish the program from the data level when iterating

当你不需要遍历这个对象的时候 ，恩Map本质上也是对象这个时候，你可以使用Map来让操作更加简单
当你 的操作对属性的顺序要求不高的时候，也是可以使用Map的
 */

