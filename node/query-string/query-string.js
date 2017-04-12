const querystring=require('querystring');

// querystring.parse(str[, sep[, eq[, options]]])

//为什么会有这个接口

//有了这个接口，我们可以将字符串转化成JSON对象，而这个字符串往往来自于url，我们在后端进行处理起来也会很方便

var result=querystring.parse("foo=bar&abc=xyz&&abc=cde");
console.log( result);

//querystring.parse的逆过程是querystring.stringify()


var str=querystring.stringify({a:1,b:2});
console.log(str);//a=1&b=2

//中文的问题，是否对中文够友好呢？

str=querystring.stringify({a:"中国",b:2});
console.log(str);//a=%E4%B8%AD%E5%9B%BD&b=2



