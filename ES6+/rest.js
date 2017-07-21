//20170612
function test(...a){
return a[0]+a[1]
}
//undefined
test(1,2,3,4)
//3


function a(...args){
console.log(args.reduce((i,j)=>i*j,1))
}
undefined
function a(...args){
console.log(args.reduce((i,j)=>i*j,1))
}
undefined
a(1,2,3,4)
VM966:2 24
undefined
a(1,2,3,4,5,6)
VM966:2 720
undefined
a(1,[1,2,3],3,4,5,6)


console.time('abc')
for(var i=0;i<100000;i++){
var a=[0,1,2,3,4,5];
a.push(6);
a=null;

}
console.timeEnd('abc')
VM554:8 abc: 33.0ms
undefined
console.time('rest')
for(var i=0;i<100000;i++){
var a=[0,1,2,3,4,5];
a=[...a,6];
a=null;

}
console.timeEnd('rest')
VM611:8 rest: 54.7ms
