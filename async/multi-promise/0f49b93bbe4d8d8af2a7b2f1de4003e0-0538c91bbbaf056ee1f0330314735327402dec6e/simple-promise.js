function test(){
return new Promise((resolve)=>{
resolve(4);   //将sesolve的入参作为then里面的出参
})
}

test()
.then((data)=>{
console.log(data);  //4
})


/*another simple promise that have a para*/

function test(num){
return new Promise((resolve)=>{
num+=1;
resolve(num );   //将sesolve的入参作为then里面的出参
})
}

test(4)
.then((data)=>{
console.log(data);  //4
})
