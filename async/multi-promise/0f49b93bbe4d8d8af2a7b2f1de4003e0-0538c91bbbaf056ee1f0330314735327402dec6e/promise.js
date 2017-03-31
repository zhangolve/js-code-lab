fetch('http://api.github.com', {mode: 'cors'})  
  .then(function(response) {
    var a=3
    return a;  
  }) 
 .then(function(b){
  console.log(b);
})
/*
第一个then里面的返回值，作为第二个then的参数传过去。
*/