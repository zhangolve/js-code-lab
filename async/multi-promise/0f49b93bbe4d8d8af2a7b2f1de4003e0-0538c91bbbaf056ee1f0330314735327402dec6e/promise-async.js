
fetch('http://api.github.com', {mode: 'cors'})  
  .then(function(response) {
    return response.text();  
  }) 
 .then(
  
  function(text){
    
  console.log('1',text);
});

fetch('https://jsonplaceholder.typicode.com/posts', {mode: 'no-cors'})  
  .then(function(response) {
   
    return response.text();  
  }) 
 .then(
  
  function(content){
    
  console.log('2',content);
})


console.log('3');

/*
3
2
1

or
3
1
2
这里还是js的异步造成的，两个api哪个响应快就先打印哪一个。
*/