/*
# what
buffer是二进制流文件，是一个arraytype，

# why
有了buffer之后，可以让javascript来操作二进制文件

# how

见下面example






*/

//example 1

/*

Buffer 是一个类，因此需要new出来。


var buf= new Buffer("hello world");
console.log(buf);
*/
//<Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64>

//example 2
/*
var buf=new Buffer('hello world');

console.log(typeof buf);
*/
//object

// example 3

/*
var buf=new Buffer('hello world');
var str=buf.toString();
console.log(str);
*/

//使用toString进行转换


/*

var buf=new Buffer('hello world');

console.log(buf[0]);
*/
//buf[0]输出104，104代表的正是h的ascii码。



// alloc

/* alloc方法类似于操作array的fill，在这里默认填入的全都是0 */
var buf=new Buffer.alloc(5);

console.log(buf);

console.log('0',buf.toString());
//这时候调用toString()方法不能够获得值。


buf=new Buffer.alloc(5,"h");
console.log(buf);//<Buffer 68 68 68 68 68>
console.log(buf.toString());   //hhhhh



