/*  异步迭代生成器 */
var request=require('request');
var options = {
  url: 'https://jsonplaceholder.typicode.com/todos',
  headers: {
    'User-Agent': 'request'
  }
};

function call(){

request(options,(err,res,body)=>{
	var info=JSON.parse(body)[0];
	it.next(info);
})
}

function *main(){
var result=yield call();  //这里进行等待，调用call()占位，等到调用结束之后，it.next()又执行
console.log(result);   //最后我们把结果进行输出
}

var it=main();

it.next();

