/* 2017/04/01*/

// a.set('name','zhangolve');
// //Map(1) {"name" => "zhangolve"}
// a.set('age',23);
// //Map(2) {"name" => "zhangolve", "age" => 23}
// a.get('name');

// //"zhangolve"

// a.size
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



// 20171026

// 实际工作中终于用到了set 的案例，来看一下是如何使用的。

    const choices = [{promotion_id:2,a:1},{promotion_id:3,a:2},{promotion_id:4,a:1}]
    const promotionId2choices = new Map();
    for (const choice of choices) {
        if (promotionId2choices.has(choice.promotion_id)) {
            console.log('go here');
            console.log(promotionId2choices);
            promotionId2choices.get(choice.promotion_id).push(choice)
            // console.log(promotionId2choices.get(choice.promotion_id).push(choice))            
            // promotionId2choices.set(choice.promotion_id, promotionId2choices.get(choice.promotion_id).push(choice));
        } else {
            console.log('no ')
            console.log(promotionId2choices)
            promotionId2choices.set(choice.promotion_id, [choice]);
        }
    }
    console.log(promotionId2choices);
    for (const [promotionId, choices] of promotionId2choices) {
        console.log(promotionId,choices);
    }

// 数组中的第一个元素代表的是key ，第二个元素代表的是值。
// http://www.cnblogs.com/diligenceday/p/5484130.html
// 只有map 可以这样用，object 压根就不能遍历，数组当然也可以遍历，但是他只有index 没有key。所以这个时候就看出来map 的优势了，他的key 能够是数字（跟object一样），同时还能够遍历。
"use strict";
let map = new Map();
map.set(undefined, "0");
map.set(NaN, {});
for(let [key, value] of map) {
    console.log(key, value);
}
for(let arr of map) {
    console.log(arr);
}

const a = [{a:1},{b:2}];
for (const value of a){
console.log(value)
}