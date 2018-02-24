var longestCommonPrefix = function(strs) {
    var count = 0 ;
    var maxCount =0;
    if(strs[0].length >0  ){
        maxCount = strs[0].length;
    } else {
        return ''
    }
    loop1:
    for (var i=0;i<maxCount;i++){
    loop2:   
        for(var j=0;j<strs.length;j++){
            if(strs[j].substr(i,1)!==strs[0].substr(i,1)){
                break loop1;
            }
        }
        count +=1;
    }
    return strs[0].substr(0,count)
};


/*
使用JS 操作字符串的substr 方法遍历是关键。

*/