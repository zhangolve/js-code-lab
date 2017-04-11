function repeatStringNumTimes(str, num) {
  // repeat after me
  newArray=[str];   //将字符串放置到数组当中
  for(var i=1;i<num;i++)
    {
     newArray=newArray.concat([str]); //
                   
    }
    var str=newArray.join('');
   
    console.log(str);
}

repeatStringNumTimes("this",3);

/*
2017/04/11
http://hktkdy.com/2016/05/07/201605/Repeat-a-string-repeat-a-string/

*/

