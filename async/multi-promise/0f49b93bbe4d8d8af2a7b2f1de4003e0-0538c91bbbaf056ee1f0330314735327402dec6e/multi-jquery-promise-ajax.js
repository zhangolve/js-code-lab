var firstPromise = $.get("http://api.github.com");
var secondPromise = $.get("https://jsonplaceholder.typicode.com/posts");

$.when(firstPromise, secondPromise).then(function(firstData, secondData) {
  console.log(secondData);
  // do something
});

/*
当两个异步调用都达到相应的时候，才能够执行下面的步骤。
*/

/*我们试图不使用$.when ，而是直接使用与非门来判断，在下面的程序中，我们使用了settimeoout，通过设置eventloop延时，使得在得到相应的时候，i从
undefined 的状态变为有实际值的状态。然而这种情况，我们并没有去发挥javascript异步的特性，只是给定了一个延时时间。一旦这个延时时间设置的小了，
我们的所要的值就又变成了undefined了。
*/
var i,j;
function ajax1(){
$.ajax({
  type:'GET',
  dataType:'jsonp',
  url:'http://api.github.com',
  success:(data)=>{
    i=data;
    console.log('inneri',i);
    console.log(data);
  }
})

}

function ajax2()
{
$.ajax({
  type:'GET',
  dataType:'jsonp',
  url:'https://jsonplaceholder.typicode.com/posts',
  success:(data)=>{
    j=data;
    console.log(data);
  }
})
}


function twoAjax(a,b){
  setTimeout( ()=>{
console.log('time',i);
  } ,1000)
}
twoAjax(ajax1(),ajax2());

/*我们使用settimeout和clearinternal 来处理异步相应，当两个相应都已经得到的时候，我们对之进行处理，下面的程序
 实际上还是上面程序的思路，只是加了一个clear计时器。
*/
var i,j;
function ajax1(){
$.ajax({
  type:'GET',
  dataType:'jsonp',
  url:'http://api.github.com',
  success:(data)=>{
    i=data;
    console.log('inneri',i);
    console.log(data);
  }
})

}

function ajax2()
{
$.ajax({
  type:'GET',
  dataType:'jsonp',
  url:'https://jsonplaceholder.typicode.com/posts',
  success:(data)=>{
    j=data;
    console.log(data);
  }
})
}


function twoAjax(a,b){
  var timer=setTimeout( ()=>{
 
if(i!==undefined&&j!==undefined)
  {
    console.log('k',i,j);
    clearInterval(timer);
   
  }
  } ,10000)
 

}

twoAjax(ajax1(),ajax2());





