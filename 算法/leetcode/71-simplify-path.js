/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function(path)  {
    // // replace / one more /
    // ./ remove
    // ../ 连同前面一起去掉，如果不是../　否则继续
    path = path.replace(/\/{2,}/, '/').replace(/\.\//,'');
    pathArr = path.split('/');
    console.log(pathArr)
    newArr = [];
    for(var i=0;i<pathArr.length;i++) {
        if(pathArr[i]==='..'){
            newArr.pop();
        } else {
            newArr.push(pathArr[i])
        }
    }
    console.log(newArr)
    var str = newArr.join('/');
    var prefix ;
    if(str.length>1 && str.endsWith('/')){
        prefix = str.slice(0,-1);
    } else {
        prefix = str;
    }  
    if(prefix.match(/(\.||\..)$/) && !prefix.match(/(\...)$/)){
        return prefix.replace(/(\.||\..)$/,'')
    } else {
        return prefix
    }
};


// 一个失败的尝试
//但是也复习了一些正则表达式的相关知识

//http://blog.sodhanalibrary.com/2015/06/simplify-path-using-javascript.html




