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
    // 这里是在说分割数组，仔细看是不是也可以用split方法，区别在于split的key不会放到生成的数组当中
    var start = 0;
    for(var i=1; i<path.length; i++){
        if(path.charAt(i) == '/'){
            // 注意　substring　是根据index来指定截取范围的，substr是第二位是根据长度来指定截取范围的。
            //　这里将不包括index =i　的值
            stack.push(path.substring(start, i));
            start = i;
        }　else if(i==path.length-1){
            stack.push(path.substring(start));
        }
    }
    //　这个时候，假设原path为 'a/b/../c'  则stack为 [[a],[/b],[/..],[/c]]
    var result = [];
    var back = 0;

    while(stack.length!=0){
        var top = stack.pop();
        //　从堆栈中pop出来元素，按照前面的示例，第一个应该为[/c]
        //　因为split效果之后，都是以/开头，因此就这么做判断了。
        //　注意有一条规则是开头的/.. 和末尾的/..都可以理解为/,开头的/是根目录他已经退无可退了。
        if(top == "/." || top == "/"){
            //nothing
        }　else if(top == "/..")　{
            // 在我的代码里也有对/. /.. /...　的判断
            back++;
        }　else　{
            if(back > 0){
                // back指的是需要后退的次数，/.是不需要后退的，/..是需要后退两次的。这里还是比较巧妙
                back--;
            }　else{
                //只有当不需要后退的时候，才能够
                result.push(top);
            }
        }
    }
 
    //if empty, return "/"
    if(result.length == 0){
        return "/";
    }
    // 最终join在一起
    var sb = '';
    while(result.length!=0){
        var s = result.pop();
        sb += s;
    }
 
    return sb;
}

console.log(simplifyPath('/home//foo/'));




//尝试改写
function simplifyPath(path) {
    // 创建一个栈
    var stack = [];

    // while(path.length > 0 && path.charAt(path.length-1) =='/'){
    //     path = path.substring(0, path.length-1);
    // }

    path = path.replace(/\/+$/g,'');
    path = path.replace(/\/{2,}/g,'/'); //将原来多个//变成只有一个
    // 这里是在说分割数组，仔细看是不是也可以用split方法，区别在于split的key不会放到生成的数组当中
    // var start = 0;
    // for(var i=1; i<path.length; i++){
    //     if(path.charAt(i) == '/'){
    //         stack.push(path.substring(start, i));
    //         start = i;
    //     }　else if(i==path.length-1){
    //         stack.push(path.substring(start));
    //     }
    // }
    stack = path.split('/')
    console.log(stack)
    var result = [];
    var back = 0;

    while(stack.length!=0){
        var top = stack.pop();
        
        if(top == ".") {
            //nothing
        }　else if(top == "..")　{
            back++;
        }　else　{
            console.log(back);
            if(back > 0){
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
    if(result.length==1 && result[0]=='') {
        return '/'
    }
    console.log(result)
    return result.reverse().join('/');
}


//　一个失败的尝试

//　主要还是错在哪里呢？判断‘’的时候，无论donothing 还是push都会有问题

