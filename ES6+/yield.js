// 20190625
var a=1;

function * test() {
    console.log(a)
    a++;
    yield a;
    return;
}

console.log(test());  // Object [Generator] {}


console.log(test().next())
console.log(test().next())

// { value: 2, done: false }
// { value: 3, done: false }

// 20190625

function *foo() {
    yield 1;
    yield 2;
    yield 3;
    return;
  }
  for(let v of foo()) {
    console.log(v);
  }

//   for...of在遍历foo()返回的结果时，每遇到一个yield，就把yield后面表达式的结果作为of前面的v的值进行赋值（next()返回值的value字段）。没错，就这么不要脸的解释完了。

//https://imweb.io/topic/5812ab7be2017a3d1878b508


/**
function *main(){
}
 
main() // -> [object Generator]
 
function *learn(){
  yield 1
  yield 2
  return 3
}
 
let learnGe = learn() // ->


Generator函数可以只运行函数的一部分，函数的剩余部分可以有使用者控制继续执行。



learnGe.next() // -> {"done": false, "value": 1}
done 为false表示 learn函数未运行完毕
value 表示 learn函数 yield 1中的 1

再次调用next()会运行到下一个 yield之处

learnGe.next() // -> {"done": false, "value": 2}
learnGe.next() // -> {"done": true, "value": 3}
最后运行之return之处 done为true ,value是return 的返回值


 * 
 *  */