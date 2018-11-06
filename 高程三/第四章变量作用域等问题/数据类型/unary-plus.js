// 20181106

// Unary plus does not treat all falsy values the same, but they all come out falsy.
// Unary plus sends true to 1, but "true" to NaN.
// On the other hand, parseInt is more liberal for strings that are not pure digits. parseInt('123abc') === 123, whereas + reports NaN.
// Number will accept valid decimal numbers, whereas parseInt merely drops everything past the decimal. Thus parseInt mimics C behavior, but is perhaps not ideal for evaluating user input.
// Both trim whitespace in strings.
// parseInt, being a badly designed parser, accepts octal and hexadecimal input. Unary plus only takes hexademical.

// 区别１
console.log(+true,'+true') //　１ 我可能只是想把内容为数字，表现为字符串的数据转化为数字，结果这个是不是我期待的呢？
console.log(+false,'+true') // 0 这个呢？
console.log(+'false') //终于NAN了
console.log(+'0') //0
console.log(+'"0"')//NAN
console.log(+(false||true)) //1


console.log(parseFloat('true')) //NAN


// 区别２

console.log(+"","+blank"); //0
console.log(parseFloat("")); // NAN

//区别３ parseFloat不止接受十进制，而unary plus默认为十进制，且不能修改

console.log(+"10") //10
console.log(parseInt("10",16)) //16

// 速度呢？


console.time('parsefloat')
for(let i=0;i<10000;i++) {
    const str = ""+i;
    const num = +str;
}
console.timeEnd('parsefloat')

console.time('unary plus')
for(let i=0;i<10000;i++) {
    const str = ""+i;
    const num = +str;
}
console.timeEnd('unary plus')

// unary plus: 1.492ms
// parsefloat: 1.366ms

