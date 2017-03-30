for(var i=0;i<10;i++)
{
console.log(i);
if(i>5)
break;


}
//0,1,2,3,4,5,6

//some way to loop 
/*the very common way */
var a=[1,2,3,4,5];
for(var i=0;i<a.length;i++)
{
  console.log(i*2);  //2,4,6,8,10;
}
//use raw javascript map function  can not break
var a=[1,2,3,4,5];
a.map((i)=>{console.log(i*2);});  //2,4,6,8,10

//use lodash library to loop
import _ from 'lodash';
_.times((i)=>{console.log(i)});

