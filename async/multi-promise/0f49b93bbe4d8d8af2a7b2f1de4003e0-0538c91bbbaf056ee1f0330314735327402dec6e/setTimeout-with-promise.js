function delay(t) {
   return new Promise(function(resolve) { 
       setTimeout(resolve, t)
   });
}
console.log('2')
delay(10000)
.then(()=>{
  console.log('1');
})

function delayAll(delay1,delay2){
  return  Promise.all([delay1,delay2])
  .then(()=>{
  return 'success';    
  })
}

delayAll(delay(1000),delay(10000))
.then((data)=>{
  console.log(data)
})

/*
console

2
十秒后
1
success
*/