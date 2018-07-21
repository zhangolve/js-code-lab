function simplifyPath(path) {
    // 创建一个栈
    var stack = [];
    path = path.replace(/\/+$/g,'');
    path = path.replace(/\/{2,}/g,'/'); //将原来多个//变成只有一个
    stack = path.split('/')
    var result = [];
    var back = 0;
    while(stack.length!=0){
        var top = stack.pop();
        if(top == ".") {
            //nothing
        }　else if(top == "..")　{
            back++;
        }　else　{
            // 最开头的因为退无可退一定存在。这个知识点当初没有意识到
            if (stack.length==0) {
                result.push(top)
            }
            else if(back > 0){
                back--;
            }　else{
                result.push(top);
                
            }
        }
    }
 
    //if empty, return "/"
    if(result.length == 0){
        return "/";
    }

    // "/" 不加这个判断，这个测试通不过
    if(result.length==1 && result[0]=='') {
        return '/'
    }
    return result.reverse().join('/');
}
