/*这也就是立即执行函数的好处了*/
let obj1={a:3};
let obj2={a:1,b:2};

let $=(function(){
return {
    book:function(){
        console.log('this is a book');
    },
    extends:function(x,y){
       try {
           let obj1=this.copy(x);
           let obj2=this.copy(y);
            for(key in obj2){
            obj1[key]=obj2[key];
        }
        return obj1;
       }
       catch(e){
           console.log(e);
       }
    },
    copy:function(obj){
        let newObj={};
        for(key in obj){
            newObj[key]=obj[key];
        }
        return newObj;
    }
}
})();

var obj3=$.extends(obj1,obj2);
console.log('obj3',obj3);
console.log('obj1',obj1);