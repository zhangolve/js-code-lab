console.log(1,a);
var a=3;

var b={
    a: 2,
    b: this.a,
    c: ()=>{
        return this.a;
    },
    d: function() {
        return this.a;
    }

}




function a() {
    
}
a=666;


console.log(2,b.b);
console.log(3,b.c());
console.log(4,b.d());

var c=b.c;

var d=b.d;

console.log(5,c());

console.log(6,d());

// var a={a:this} 直接在浏览器console里面写，会看到这里的a.a是window对象。还是那句话，你需要知道到底this是啥。


// chrome:


// 1 ƒ a() {
    
// }
// VM139:26 2 3  这里的3要要注意。当用this的时候，这里的this是window，所以this.a 为3.
// VM139:27 3 666
// VM139:28 4 2
// VM139:35 5 666
// VM139:37 6 666