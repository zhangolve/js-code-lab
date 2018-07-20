//http://blog.sodhanalibrary.com/2015/06/simplify-path-using-javascript.html

function simplifyPath(path) {
    // 创建一个栈
    var stack = [];
    
    //要求里有说规则：如果最后一位是/，则将最后一位／去掉，这里说的就是这件事。但是注意他这里
    //用的是while，则是说如果末尾有////，那么会把这四个／统统去掉
    // 当然也可以使用正则表达式来计算　path.replace(/\/+$/,'')
    while(path.length > 0 && path.charAt(path.length-1) =='/'){
        path = path.substring(0, path.length-1);
    }
    
    var start = 0;
    for(var i=1; i<path.length; i++){
        if(path.charAt(i) == '/'){
            stack.push(path.substring(start, i));
            start = i;
        }else if(i==path.length-1){
            stack.push(path.substring(start));
        }
    }
 
    var result = [];
    var back = 0;
    while(stack.length!=0){
        var top = stack.pop();
 
        if(top == "/." || top == "/"){
            //nothing
        }else if(top == "/.."){
            back++;
        }else{
            if(back > 0){
                back--;
            }else{
                result.push(top);
            }
        }
    }
 
    //if empty, return "/"
    if(result.length == 0){
        return "/";
    }
 
    var sb = '';
    while(result.length!=0){
        var s = result.pop();
        sb += s;
    }
 
    return sb;
}

console.log(simplifyPath('/home//foo/'));