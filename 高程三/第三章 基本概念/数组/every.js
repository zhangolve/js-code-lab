// 20170516 
// every 方法的用法
/*
 之前其实在面试的时候，应该是面试汽车之家，有问道every,map,forEach,some 的用法
 这里可以再次地进行简单地回顾
map方法   强调的是返回的是一个数组
forEach  强调的是在内部完整地执行遍历，他是最像普通的for 循环结构的。
every 和some 又有相似之处，强调的是能够被中断break的遍历
下面来举例来看
这个例子也是在实际工作中遇到的一个问题

 */

var list =[{"price":100},{"price":200},{"price":300}];
    list.every((value,index)=>{
        if(value.price>200)
        {
            console.log("every ",index);
            return false;  //every 方法在返回 false 的时候结束循环 ,因此最终返回的是2
        }
        else{
            return true;
        }
    } )

    list.some((value,index)=>{
        if(value.price>200)
        {
            console.log("some",index);
            return true;  //every 方法在返回 false 的时候结束循环 ,因此最终返回的是2
        }
        else{
            return false;
        }
    })

    // 当然，我们也可以直接使用for循环的方式

    for(let i =0;i<list.length;i++){
        if(list[i].price>200){
            console.log("for",i);
            return true;
        }
    }

