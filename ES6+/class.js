// 盲写class
// 20190623


class Animal {
    constructor() {
        this.mouse=1;
        this.legs=4;
        this.canFly=false;
    }
    sayLegs() {
        console.log('there is '+this.legs+'legs');
    }
}


let dog = new Animal();

console.log(dog.sayLegs());

class Cat extends Animal {
    // 这里要注意加super
    constructor(props) {
        super() ;
        this.fun=true;
    };
    sayName() {
        console.log('this is a cat');
    }
}

let cat = new Cat();

cat.sayName();

console.log(cat.legs);

// 继承 && 使用

