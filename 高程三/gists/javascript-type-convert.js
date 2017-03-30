
/*javascript 各种类型数据相互转化*/
/*string to number*/
let foo='123';  //foo is string
let bar=foo*1;  //bar is number 

/*number to string*/
let foo=123 ; //foo is number
let bar=foo+''; //bar is string

/*string to json */

let foo='{"name":"zhangolve"}'  //foo is string 
let bar=JSON.parse(foo);  //Object {name: "zhangolve"}

/*json to string */

let foo={"name":"zhangolve"};
let bar=JSON.stringfy(foo);  //   "{"name":"zhangolve"}"  

/*string to array*/

let foo='[1,2,3,4,5]';
let bar=JSON.parse(foo);  //  [1, 2, 3, 4, 5]


