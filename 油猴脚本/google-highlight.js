// ==UserScript==
// @name         google-find
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.google.com/*
// @grant        none
// ==/UserScript==

(function() {
 
    var search= document.getElementById("lst-ib");
     var btn=document.querySelector(' input[name=btnK] ');
    window.onclick=function(){
   var value=search.value;
        console.log(value);
        for(var i=0;i<10;i++)
        {
    window.find(value);  //这个方法是异步的,所以还是会出现setTimeout那样类似的情况
            }
    };
     window.onkeypress=function(e){
     if(e.keyCode==13)
     {
         console.log('eee');
     }
     };
    // Your code here...
})();