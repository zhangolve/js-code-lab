var myAtoi = function(str) {
    str=str.trim();
  
    var arr=str.split('');
    function getResult(arr)
    {
    if(arr.length==1&&(arr[0]=="+"||arr[0]=="-")   )
        {
            return 0;
        }
    if( (arr[1]=="+"||arr[1]=="-")&&(arr[0]=="+"||arr[0]=="-") ) 
    {
        return 0
    }
    for(var i=1;i<arr.length;i++)
    {   
        
        
         if( (arr[0]=="+"||arr[0]=="-") )
            {   
     
                if(isNaN(parseInt(arr[i]))&&i!==1  ){
                    console.log(str.substr(0,i) );
                   return Number(str.substr(0, i)  )
                }
                
                
            }
        if(isNaN(Number(arr[i]))&&( arr[0]!=="+"&&arr[0]!=="-")&&parseInt(arr[0]) ){
       
             return Number(str.substr(0, i)  )
        }
        if(( arr[0]!=="+"&&arr[0]!=="-")&&(!parseInt(arr[0]) )&&(arr[0]!=="0")   ){
           
            return 0;
        }
    }
    
   
    return Number(str);
}

var result=getResult(arr);
    if(result>2147483647)
    {
        return 2147483647
    }
    else if(result<-2147483648){
        return -2147483648
    }
    else{
        return result;
    }
   
};

console.log(myAtoi("-abc"));
