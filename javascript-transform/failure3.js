//我们的最终目的，还是想使用javascript来实现动画效果，让从0到500px的过程是可控的。
var cuble = document.querySelector('.cuble');

cuble.onmouseover = function(e) {
 
    var i=1;
    var pixels=5*i+"px";

    delay(10)
    .then(()=>{ 

    cuble.style.marginLeft=pixels ;
     return false 
      })
    .then((state)=>if(!state) { console.log(state) } else{ delay(10*i) } )
 

}





//

function delay(t) 
{
   return  new Promise(function(resolve){
    setTimeout(resolve,t);
   })
}



//如果达到100才最终返回