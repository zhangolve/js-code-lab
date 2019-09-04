// 20190904

// type

// # 1
function hello(name: string) {
    console.log(`hello ${name}!`);
}

hello('zhangolve')
// #2
function book() {
    console.log(333)
}

book();

// # 3 interface

interface people {
    firstName: string,
    lastName: string
}

function join(people: people)  {
    console.log(`hello ,welcome join ${people.firstName}.${people.lastName}`)
}

const user = {firstName: 'zhang', lastName: 'olive'};
join(user)


// # 4

let num: number = 6;

num+=1;

num=''+num; // show error ;

interface ob {
    first: string,
    second: string
}

let obj : ob = {
    first: '123',
    second: '456'
}

obj.third= '789'; // not exist third.

// # 5 if any interface prop 

// #6 ? means optional

interface ob2 {
    first: string,
    second: string,
    third?: string
}

let obj2 : ob = {
    first: '123',
    second: '456'
}

// # readonly prop 

interface Ob3 {
    readonly first: string,
    second: string,
    third?: string
}

let obj3 : Ob3 = {
    first: '123',
    second: '456'
}

obj3.first='334' // error show here

obj3 = {
    first: '888',
    second: '444'
}  // 这个相当于重新赋值，first不受约束。

// # Nesting

interface Next {
    first: {
        first1: string,
        first2: string
    }
}

const next1: Next = {
    first: {
        first1: 'hello',
        first2: 'hello2'
    }
}


// # more

interface ClockConstructor {
    new (hour: number, minute: number);
  }
  
  interface ClockInterface {
    tick();
  }
  
  const Clock: ClockConstructor = class Clock implements ClockInterface {
    constructor(h: number, m: number) {}
    tick() {
        console.log("beep beep");
    }
  }

  // extend interface

  interface Shape {
    color: string;
}

interface Square extends Shape {
    sideLength: number;
}

let square = {} as Square; // as key word
square.color = "blue";
square.sideLength = 10;

// as keyword , attention interface name must uppercase first char.
interface Book {
    first: string
}
// let book1 = {} as Book; assert, not forget is ok .
let book1: Book = {}; // show error here .
// book1.first = 'welcome to china';
// array

let a: ReadonlyArray<Number>=[1,2,3,4];

a.push(333) // a is a readonly array. but here why not use const?

// https://www.typescriptlang.org/docs/handbook/interfaces.html

const b=[1,2,3,4,5]
b.push(6); // not error 

b=[2,3,4,5] // error.




// advanced type
function fly(): any{
    console.log('okay')
}
function layEggs() : any{
    console.log('lay eggs')
}
function swim() : any{
    console.log('swim');
}

interface Bird {
    fly();
    layEggs();
}

interface Fish {
    swim();
    layEggs();
}

function getSmallPet(): Fish | Bird {
    // ...
}

let pet = getSmallPet();
pet.layEggs(); // okay
pet.swim();    // errors



class FooBase {
    public x: number;
    private y: number;
    protected z: number;
}

// EFFECT ON INSTANCES
var foo = new FooBase();
foo.x; // okay
foo.y; // ERROR : private
foo.z; // ERROR : protected

// EFFECT ON CHILD CLASSES
class FooChild extends FooBase {
    constructor() {
      super();
        this.x; // okay
        this.y; // ERROR: private
        this.z; // okay
    }
}

// function return string

function sayHello(): string {
    // return 333;
    return 'hello';
}

// namespace



//declare 

// found what I was looking for:

// Declare vs. var

// var creates a new variable. declare is used to tell TypeScript that the variable has been created elsewhere. If you use declare, nothing is added to the JavaScript that is generated - it is simply a hint to the compiler.

// For example, if you use an external script that defines var externalModule, you would use declare var externalModule to hint to the TypeScript compiler that externalModule has already been set up


// Enums

