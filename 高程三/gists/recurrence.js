/*@zhangolve  2017/03/12 */
/*手写一个最简单的递归*/
/*费内巴切数列算法*/
function fac(n){
  if(n<=2)
  {
    return 1;
  }
  else {
    return fac(n-1)+fac(n-2)
  }
    
}

var a=fac(7);
console.log(a); //13

/*得到整个包含整个数列的数组 */

function fac(n){
  if(n<=2)
  {
    return 1;
  }
  else {
    return fac(n-1)+fac(n-2)
  }
    
}
function facArr(n){
  var finalArr=[]; //最终生成的array
  for(var i=1;i<n+1;i++)
    {
      finalArr.push(fac(i));
    }
  return finalArr;
}
var a=facArr(7);
console.log(a); //[1,1,2,3,5,8,13]